from pathlib import Path
import subprocess
import threading
from flask import Flask, request, jsonify
from security import authorized, load_env, filename, language, choice, media_path, run_script

HERE = Path(__file__).resolve().parent
load_env(HERE.parent / ".env")
app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024
job_lock = threading.Lock()

@app.before_request
def authenticate_worker():
    if not authorized(request.headers.get("X-Service-Token")):
        return jsonify(error="Worker authentication required"), 401

@app.errorhandler(ValueError)
def invalid_input(error):
    return jsonify(error=str(error)), 400

@app.errorhandler(subprocess.SubprocessError)
def processing_failed(error):
    app.logger.warning("Media processing failed (%s)", type(error).__name__)
    return jsonify(error="Media processing failed"), 502

@app.errorhandler(OSError)
def file_error(error):
    return jsonify(error="Media file is unavailable"), 400


def subtitle_result(data, prefix):
    video = filename(data.get("video"))
    media = media_path(HERE.parent / "public/videos", video, ".mp4")
    if not media.is_file():
        raise ValueError("Video not found")
    args = [prefix + video, "-s", language(data.get("sourceLanguage")),
            "-d", language(data.get("targetLanguage")), "-noise",
            choice(data.get("algorithm"), {"no", "noise", "deep"})]
    output = run_script(HERE, "subtitle.py", args)
    keys = ["emty", "dateTime", "videoPath", "kb", "time", "sourceLanguage", "targetLanguage", "algorithm", "processingTime", "wavPath", "outputWavPath", "txtPath", "srtPath", "outputVideoPath"]
    values = output.splitlines()[-1].split(", ")
    if len(values) != len(keys):
        raise ValueError("Unexpected worker result")
    return dict(zip(keys, values))

@app.post("/api/createSubtitle")
def subtitle():
    if not job_lock.acquire(blocking=False):
        return jsonify(error="Worker is busy"), 429
    try:
        return jsonify(subtitle_result(request.get_json() or {}, "../public/videos/"))
    finally:
        job_lock.release()

@app.post("/api/updateSubtitle")
def update_subtitle():
    data = request.get_json() or {}
    root = HERE.parent / "public/videos"
    video = media_path(root, data.get("pathMP4"), ".mp4")
    srt = media_path(root, data.get("pathSRT"), ".srt")
    items = data.get("data")
    if not video.is_file() or not srt.is_file() or not isinstance(items, list) or len(items) > 10000:
        raise ValueError("Invalid subtitle update")
    import re
    chunks = []
    for i, item in enumerate(items, 1):
        start, end = item.get("startTime", ""), item.get("endTime", "")
        text = item.get("text", "")
        if not all(isinstance(t, str) and re.fullmatch(r"\d{2}:\d{2}:\d{2},\d{3}", t) for t in [start, end]):
            raise ValueError("Invalid subtitle time")
        if not isinstance(text, str) or len(text) > 10000:
            raise ValueError("Invalid subtitle text")
        chunks.append(f"{i}\n{start} --> {end}\n{text}\n\n")
    if not job_lock.acquire(blocking=False):
        return jsonify(error="Worker is busy"), 429
    temporary_srt = srt.with_name(srt.stem + "_pending.srt")
    temporary_video = video.with_name(video.stem + "_pending.mp4")
    try:
        temporary_srt.write_text("".join(chunks), encoding="utf-8")
        subprocess.run(["ffmpeg", "-y", "-i", str(video), "-vf", "subtitles=" + temporary_srt.name,
                        str(temporary_video)], cwd=root, check=True, capture_output=True, timeout=1800)
        temporary_video.replace(video.with_name(video.stem + "_output.mp4"))
        temporary_srt.replace(srt)
        return jsonify(message="Subtitle updated successfully")
    finally:
        temporary_srt.unlink(missing_ok=True)
        temporary_video.unlink(missing_ok=True)
        job_lock.release()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6000)
