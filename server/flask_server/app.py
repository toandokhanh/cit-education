import time
import ffmpeg
from flask import Flask, request, jsonify
import subprocess
import json
import re
import os
app = Flask(__name__)

@app.route('/api/updateSubtitle', methods=['POST'])
def update_subtitle():
    data = request.get_json()
    path_mp4 = 'server/public'+data.get('pathMP4')
    path_srt = 'server/public'+data.get('pathSRT')
    content = data.get('data')
    with open(path_srt, 'w') as srt_file:
        for item in content:
            srt_file.write(f"{item['index']}\n")
            srt_file.write(f"{item['startTime']} --> {item['endTime']}\n")
            srt_file.write(f"{item['text']}\n\n")

    try:
        path_save_video_new = path_mp4.replace('.mp4', '_subtitled.mp4')
        path_ouput_video = path_mp4.replace('.mp4', '_output.mp4')
        os.system(f'ffmpeg -y -i {path_mp4} -filter_complex "subtitles={path_srt}" {path_save_video_new}')
        os.remove(path_ouput_video)
        os.rename(path_save_video_new, path_ouput_video)
        return jsonify({'message': 'Subtitle updated successfullyyyyy'})
    except ffmpeg.Error as e:
        return jsonify({'error_message': str(e)}), 500



@app.route('/api/createSubtitle', methods=['POST']) # POST http://localhost:5000/api/createSubtitle
def subtitle():
    data = request.get_json()
    print('data')
    print(data)
    video = data.get('video')
    sourceLanguage = data.get('sourceLanguage')
    targetLanguage = data.get('targetLanguage')
    algorithm = data.get('algorithm')
    
    # Gọi script Python từ Flask
    command = f'python3 server/flask_server/subtitle.py server/public/videos/{video} -s {sourceLanguage} -d {targetLanguage} -noise {algorithm}'
    output = subprocess.check_output(command, shell=True, text=True).strip()
    result_list = output.split(', ')
    keys = ['emty', 'dateTime', 'videoPath', 'kb', 'time', 'sourceLanguage', 'targetLanguage', 'algorithm', 'processingTime', 'wavPath', 'outputWavPath', 'txtPath', 'srtPath', 'outputVideoPath']
    # Tạo danh sách tuples (key, value) bằng cách kết hợp keys và result_list
    # Tạo một từ điển từ hai danh sách
    result_dict = {keys[i]: result_list[i] for i in range(len(keys))}
    # In ra đối tượng kết quả
    print(result_dict)
    return result_dict




if __name__ == '__main__':
    app.run(port=6000, debug=True)

# srt củ
# 1
# 00:00:00,256 --> 00:00:08,448
# Track video chính là cái phần là 

# 2
# 00:00:08,704 --> 00:00:13,312
# Video quay màn hình của mình cách webcam tức là chính là cái Webcam của mình cái webcam này nhưng

# 3
# 00:00:08,704 --> 00:00:13,312
# Video quay màn hình của mình âsaadad

# 4
# 00:00:08,704 --> 00:00:13,312
# Video q4
