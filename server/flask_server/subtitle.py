import argparse
import os,sys
import createsub
from regex import F
from datetime import datetime
import utils.srtToTxt as srt_to_txt #handle_save_log.py
from utils.srtToTxt import srt_to_txt
import noisereduce as nr
import soundfile as sf
import librosa
from noisereduce.generate_noise import band_limited_noise
import time
import utils.handle_save_log as handle_save_log #handle_save_log.py
from utils.handle_save_log import read_video_info

parser = argparse.ArgumentParser()
parser.add_argument('source_path', help="Path to the video or audio file to subtitle", nargs='?')
# parser.add_argument('-i', '--dir', help="---> đường dẫn file cần chạy")
# parser.add_argument('-o', '--dir_op', help='---> đường dẫn lưu trữ file')
parser.add_argument('-s', '--l_in', help='---> truyền ngôn ngữ file đầu vào')
parser.add_argument('-d', '--l_out', help='---> truyền ngôn ngữ file cần xuất',default="vi")
parser.add_argument('-txt', '--file_txt', help='---> chuyển về folder srt thành txt để so sánh độ chính xác')
parser.add_argument('-noise','--algorithm_noise',help="---> Chọn thuật toán giảm nhiễu",default="no")
parser.add_argument('-n','--new_name',help="---> Đặt lại với tên mới")
args = parser.parse_args()

# python3 phude.py 'url' -s ngonnguvao -d ngonngudich -n tenmoi -noise chongiaithuat

def mp4_to_wav(filename,output,name):
    # name = filename[filename.index('/'):filename.[]]
    os.system('ffmpeg -i {} -ar 44100 {}/{}.wav'.format(filename,output,name))

def noise_deepfilternet(file,file_out):
    os.system('deepFilter {} -o {}'.format(file,file_out))
    # print("Đã giảm tiếng ồn DeepFilterNet")
    print('')


def noise_reduce(file,file_out):
    y, sr = librosa.load(file)
    reduced_noise = nr.reduce_noise(y = y, sr=sr, thresh_n_mult_nonstationary=2,stationary=False)
    sf.write(file_out,reduced_noise, sr, subtype='PCM_24')
    # print('Đã giảm tiếng ồn xong!')
    print('')

def rename(filename,newname): 
    os.rename(filename, newname)

try: 
    newname = args.new_name

    noises = args.algorithm_noise

    directory = args.source_path
    # file_output = args.dir_op
    lang_in = args.l_in
    lang_out = args.l_out
    path_txt = args.file_txt
except:
    print('')

def wav_to_flac(filename,output):
    os.system('ffmpeg -y -f wav -i {} -write_xing 0 -f flac {}'.format(filename,output))


def videoOutput(file_in,file_srt,file_out):
        # print(file_in, file_srt, file_out)
        os.system('ffmpeg -y -i {} -filter_complex "subtitles={}" {}'.format(file_in,file_srt,file_out))

def checkfolder (path):
    # path = 'tmp'
    isExist = os.path.exists(path)
    if not isExist:
        # Create a new directory because it does not exist
        os.makedirs(path)
if __name__ == "__main__":
        from time import gmtime, strftime
        time_text = str(strftime("%Y%m%d_%H%M%S", gmtime())) 
        folder = time_text
        # os.mkdir(folder)
        # os.mkdir(folder)
        # checkfolder(folder)
        # start_time = time.time()
        start_time = datetime.now()

        # Lấy ra đường dẫn chứa file
        path = os.path.dirname(directory) + '/' 
        # Lấy ra tên file nhập vào có cả duôi file
        file = os.path.basename(directory)

        # Lấy ra tên file
        name1 = os.path.splitext(file)
        name = name1[0]
        
        
        # if not (os.path.exists(path)):
        #     os.mkdir(path) 
        mp4_to_wav(path+file,path,name)
        if not newname:
            newname = name
        
        if noises:
            # Giảm nhiễu dùng thuật toán deepfilter
            if noises == 'deep':
                noise_deepfilternet(path+name+'.wav',path)
                deep = '_DeepFilterNet2.wav'
                rename(path+name+deep,path+newname+'_output.wav')
                # wav_to_flac(path+newname+'.wav',path+newname+'.flac')

                pass
            # Giải thuật giảm nhiễu Noisereduce (không cố định)
            elif noises == 'noise':
                noise_reduce(path+name+'.wav',path+newname+'_output.wav')
                # wav_to_flac(path+newname+'.wav',path+newname+'.flac')
            else:
            # Không chọn giải thuật
                rename(path+name+'.wav',path+newname+'.wav')
                pass
        source = path+newname+'_output.wav'
        # Tạo phụ đề
        createsub.main(source,lang_in,lang_out)
        # if os.path.exists(path+newname+'.wav'):
        #     os.remove(path+newname+'.wav')
        if path_txt:
            srt_to_txt(path+newname+'_output.srt',path_txt,newname)
        else:
            srt_to_txt(path+newname+'_output.srt',path,newname)
        # Gộp phụ đề với FFmpeg
        srt_output = '';
        if lang_in == lang_out:
            if name != newname:
                videoOutput(path+file,path+newname+'_output.srt',path+newname+'.mp4')
            else:
                videoOutput(path+file,path+newname+'_output.srt',path+newname+'_output.mp4')
                srt_output = path+newname+'_output.srt'
        else:
            if name != newname:
                videoOutput(path+file,path+newname+'_output_translated.srt',path+newname+'.mp4')
            else:
                videoOutput(path+file,path+newname+'_output_translated.srt',path+newname+'_output.mp4')
                srt_output = path+newname+'_translated_output.srt'
        read_video_info = read_video_info(args.source_path)
        end_time = datetime.now()
        wav_input = path+newname+'.wav'
        wav_output = path+newname+'_output.wav'
        video_output = path+newname+'_output.mp4'
        path_txt = path+name+'.txt'
        srt_output = srt_output
        content = ', '+folder+', '+args.source_path+', '+read_video_info+', '+args.l_in+', '+args.l_out+', '+args.algorithm_noise+', '+str(end_time-start_time)+', '+wav_input+', '+wav_output+', '+path_txt+', '+srt_output+', '+video_output
        print(content)
        





