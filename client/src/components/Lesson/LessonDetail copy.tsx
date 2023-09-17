import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Card, CardHeader, CardContent, Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, IconButton } from '@mui/material';
import ReactPlayer from 'react-player';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import Progress from '../Layouts/Progress';
import DOMPurify from 'dompurify';
import lessonsApi from '../../apis/lessonsApi';
import { useUser } from '../Contexts/UserContext';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { saveAs } from 'file-saver';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
interface Lesson {
  title: string;
  video: {
    outputPathMP4: string;
  };
  content: string;
}

const LessonDetail: React.FC = () => {
  const [srtData, setSrtData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLesson, setUploadLesson] = useState<boolean>(false);
  const [lessonDetail, setLessonDetail] = useState<any>();
  const [infoLesson, setInfoLessson] = useState({
    title: '',
    content: '',
  });
  const [inputData, setInputData] = useState({
    startTime: '',
    endTime: '',
    text: '',
  });
  const idLesson: any = useParams().idLesson;
  const { user } = useUser();
  useEffect(() => {
    const fetchUpdateLesson = async () => {
      try {
        console.log('call api update lesson với infoLesson', infoLesson)
        // 15/9/2023
      } catch (error) {
        console.error('Error fetching lesson updations:', error);
        setLoading(false);
      }
    };
    
    if(updateLesson){
      fetchUpdateLesson();
      setUploadLesson(false)
    }
  }, [updateLesson]);
  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        setLoading(true);
        const response: any = await lessonsApi.lessonDetail(idLesson);
        setLessonDetail(response);
        setInfoLessson({title: response.title, content: response.content})
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [idLesson]);
  
  const cleanHtml = DOMPurify.sanitize(lessonDetail?.content);
  const handleTitleChange = (event: any) => {
    const { name, value } = event.target;
    setInfoLessson((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillContentChange = (value: String) => {
    setInfoLessson((prevData: any) => ({
      ...prevData,
      content: value,
    }));
  };
  
  useEffect(() => {
    axios.get(`http://localhost:3003${lessonDetail?.video?.pathSRT}`)
      .then(response => {
        const srtContent = response.data;
        const srtLines = srtContent.split('\n');
        const srtDataArray = [];
        let currentIndex = 0;

        for (let i = 0; i < srtLines.length; i++) {
          const line = srtLines[i].trim();
          if (line === '') {
            continue;
          }

          if (!isNaN(line)) {
            currentIndex = parseInt(line);
          } else {
            const timeAndText = line.split('-->');
            if (timeAndText.length === 2) {
              const startTime = timeAndText[0].trim();
              const endTime = timeAndText[1].trim();
              const text = srtLines[i + 1].trim();
              srtDataArray.push({
                index: currentIndex,
                startTime,
                endTime,
                text,
              });
            }
          }
        }

        setSrtData(srtDataArray);
      })
      .catch(error => {
        console.error('Error loading SRT file:', error);
      });
  }, [lessonDetail]); 

  const handleDownloadTxt = () => {
    // Tải tệp TXT từ URL và lưu thành tệp với tên cụ thể
    axios.get(`http://localhost:3003${lessonDetail.video.pathTXT}`)
      .then(response => {
        const blob = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'lesson.txt');
      })
      .catch(error => {
        console.error('Error downloading TXT file:', error);
      });
  };

  // const handleAddRow = (index: number) => {
  //   console.log(index + 1);
  //   console.log(srtData);
  // };
  // const handleAddRow = (index: number) => {
  //   // Tạo mục mới với giá trị mặc định
  //   const newSrtItem = {
  //     endTime: "00:00:00,000",
  //     index: index + 1,
  //     startTime: "00:00:00,000",
  //     text: "",
  //   };
  
  //   // Chèn mục mới vào mảng srtData tại vị trí index
  //   const updatedSrtData = [...srtData.slice(0, index), newSrtItem, ...srtData.slice(index)];
  
  //   // Cập nhật các index cho các mục còn lại
  //   for (let i = index + 1; i < updatedSrtData.length; i++) {
  //     updatedSrtData[i].index = updatedSrtData[i].index + 1;
  //   }
  
  //   // Cập nhật srtData
  //   setSrtData(updatedSrtData);
  // };
  const handleAddRow = () => {
    const newSrtItem = {
      ...inputData,
      index: srtData.length + 1,
    };

    setSrtData([...srtData, newSrtItem]);

    // Xóa dữ liệu trong các ô nhập sau khi thêm hàng
    setInputData({
      startTime: '',
      endTime: '',
      text: '',
    });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleEditRow = (index: any, field : any, newValue: any) => {
    // Tạo một bản sao của mảng srtData
    const updatedSrtData = [...srtData];

    // Tìm mục có chỉ mục index
    const rowIndex = updatedSrtData.findIndex((data) => data.index === index);

    if (rowIndex !== -1) {
      // Cập nhật giá trị của trường field cho mục tương ứng
      updatedSrtData[rowIndex][field] = newValue;

      // Cập nhật srtData
      setSrtData(updatedSrtData);
    }
  };
  
  
  const handleRemoveRow = (indexToRemove: number) => {
    // Tạo một bản sao của mảng srtData
    const updatedSrtData = [...srtData];
  
    // Xóa hàng có chỉ mục indexToRemove
    updatedSrtData.splice(indexToRemove - 1, 1); // Trừ đi 1 vì chỉ mục bắt đầu từ 1
  
    // Cập nhật lại chỉ mục cho các hàng còn lại
    for (let i = indexToRemove - 1; i < updatedSrtData.length; i++) {
      updatedSrtData[i].index = i + 1;
    }
  
    // Cập nhật srtData
    setSrtData(updatedSrtData);
  };
  
  const updateSubtitle = () => {
    console.log(srtData)
  }
  
  return (
    <>
      <Navbar />
      <Container sx={{ marginBottom: '30rem' }}>
        {loading && <Progress />}
        {lessonDetail && (
          <>
          <br />
          <br />
          <br />
            {/* <Typography variant="h5">{lessonDetail.title}</Typography> */}
            {!user?.isInstructor ? (
              <Grid container spacing={1}>
              <Grid item xs={12} md={8}>
                <ReactPlayer
                  url={`http://localhost:3003${lessonDetail.video.outputPathMP4}`}
                  width="100%"
                  height="100%"
                  controls
                  // playing
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
              </Grid>
            </Grid>
            ): (
              <>
              <Grid container spacing={2}>
                {/* grid 1 */}
                <Grid item xs={12} md={7} sx={{ margin: '0 auto' }}>
                  <Box>
                    <ReactPlayer
                      url={`http://localhost:3003${lessonDetail.video.outputPathMP4}`}
                      width="100%"
                      height="100%"
                      controls
                      // playing
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                <div className='text-start my-3 '>
                      <p className='font-semibold'>
                        Lesson title
                      </p>
                      <TextField
                          id="filled-hidden-label-small"
                          variant="filled"
                          size="small"
                          name='title'
                          value={infoLesson.title}
                          onChange={handleTitleChange}
                          fullWidth
                        />
                        <br />
                        <br />
                        <p className='font-semibold'>
                        Lesson content
                        </p>
                      <ReactQuill
                        value={infoLesson.content}
                        onChange={handleQuillContentChange}
                      />
                    </div>
                    <br />
                    <div className='flex justify-center gap-5'>
                      <Button variant="outlined" onClick={() => setUploadLesson(true)} >Update lesson</Button>
                      <Button variant="outlined" color="error">Delete lesson</Button>
                    </div>
                </Grid>
                {/* grid 2 */}
                <Grid item xs={12} md={12} sx={{ margin: '0 auto', marginTop:'2rem' }}>
                  <Box sx={{ height:'100%', width: '100%' }}>
                  <p className='font-semibold text-start'>Subtitle contents</p>
                  <TableContainer component={Paper}>
                    <Table  aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Index</TableCell>
                          <TableCell>Start time</TableCell>
                          <TableCell align="left">End time</TableCell>
                          <TableCell align="left">Text</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {srtData.map((data) => (
                      <TableRow key={data.index}>
                        <TableCell component="th" scope="row">{data.index}</TableCell>
                        <TableCell align="left">
                          <TextField
                            value={data.startTime}
                            id={`startTime${data.index}`}
                            variant="filled"
                            size="small"
                            onChange={(e) =>
                              handleEditRow(data.index, 'startTime', e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            value={data.endTime}
                            id={`endTime${data.index}`}
                            variant="filled"
                            size="small"
                            onChange={(e) =>
                              handleEditRow(data.index, 'endTime', e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <TextField
                            id={`text${data.index}`}
                            value={data.text}
                            multiline
                            rows={3}
                            variant="filled"
                            onChange={(e) =>
                              handleEditRow(data.index, 'text', e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell align="left">
                          <IconButton
                            color='primary'
                            onClick={() => handleAddRow()}
                          >
                            <AddIcon fontSize='small' />
                          </IconButton>
                          <IconButton
                            color='error'
                            onClick={() => handleRemoveRow(data.index)}
                          >
                            <RemoveIcon fontSize='small' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>

                    </Table>
                    <div className='flex justify-center gap-5 my-3'>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }} onClick={updateSubtitle}>Update subtitle</Button>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }} onClick={handleDownloadTxt}>Dowload TXT file</Button>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }}><Link to={`http://localhost:3003${lessonDetail.video.pathSRT}`}>Dowload SRT file</Link></Button>
                    </div>
                  </TableContainer>
                  </Box>
                </Grid>
              </Grid>
              </>
            )}
          </>
        )}
        
      </Container>
      <Footer />
    </>
  );
};

export default LessonDetail;


// {
//   {
//     endTime: "00:00:08,448"
//     index: 1
//     startTime: "00:00:00,256"
//     text: "Track video chính là cái phần là"
//   },
//   {
//     endTime: "00:00:00,000"
//     index: 2
//     startTime: "00:00:00,000"
//     text: "0"
//   },
//   {
//     endTime: "00:00:12,448"
//     index: 3
//     startTime: "00:00:17,256"
//     text: "Track video chính là cái phần là"
//   }
// }
// {
//   {
//     endTime: "00:00:08,448"
//     index: 1
//     startTime: "00:00:00,256"
//     text: "đây là row có index là 1"
//   },
//   {
//     endTime: "00:00:12,448"
//     index: 2
//     startTime: "00:00:17,256"
//     text: "đây là row có index là 2"
//   },
//   {
//     endTime: "00:00:12,448"
//     index: 3
//     startTime: "00:00:17,256"
//     text: "đây là row có index là 3"
//   }
// }


// {
//   {
//     endTime: "00:00:08,448"
//     index: 1
//     startTime: "00:00:00,256"
//     text: "đây là row có index là 1"
//   },
//   {
//     endTime: "00:00:12,448"
//     index: 2
//     startTime: "00:00:17,256"
//     text: "đây là row có index là 3"
//   }
// }