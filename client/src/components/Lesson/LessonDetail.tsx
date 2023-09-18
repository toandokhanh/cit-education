import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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
import { HTTP_URL_SERVER_NEST } from '../../constant/constant';

const LessonDetail: React.FC = () => {
  const navigate = useNavigate();
  const [srtData, setSrtData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] =useState('');
  const [updateLesson, setUploadLesson] = useState<boolean>(false);
  const [deleteLesson, setDeleteLesson] = useState<boolean>(false);
  const [lessonDetail, setLessonDetail] = useState<any>();
  const [callApiUpdateSubtitle, setCallApiUpdateSubtitle] = useState<boolean>(false);
  const [infoLesson, setInfoLessson] = useState({
    title: '',
    content: '',
  });
  const idLesson: number | any = useParams().idLesson;
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchUpdateLesson = async () => {
      try {
        await lessonsApi.updateLessonDetails(idLesson, infoLesson)
        setLessonDetail((prevData: any) => {
          return { ...prevData }; 
        });
      } catch (error) {
        console.error('Error fetching lesson updations:', error);
        setLoading(false);
      }
    };
    
    const fetchDeleteLesson = async () => {
      try {
        await lessonsApi.deleteLessonDetails(idLesson)
        navigate('/home')
      } catch (error) {
        console.error('Error fetching lesson delete:', error);
        setLoading(false);
      }
    };
    if(updateLesson){
      fetchUpdateLesson();
      setUploadLesson(false)
    }

    if(deleteLesson){
      fetchDeleteLesson();
      setUploadLesson(false)
    }
  }, [updateLesson, deleteLesson]);

  useEffect(() => {
    const fetchUpdateSubtitle = async () => {
      try {
        const data = {
          pathMP4: lessonDetail?.video?.pathMP4,
          pathSRT: lessonDetail?.video?.pathSRT,
          data: srtData
        }
        const response: any = await lessonsApi.updateSubtitle(data)
        console.log('response')
        console.log(response)
        setVideoUrl(`${HTTP_URL_SERVER_NEST}${lessonDetail.video.outputPathMP4}?rand=${Math.random()}`);
      } catch (error) {
        console.error('Error fetching subtitle updations:', error);
        setLoading(false);
      }
    };
    
    if(callApiUpdateSubtitle){
      fetchUpdateSubtitle();
      setCallApiUpdateSubtitle(false)
    }
  }, [callApiUpdateSubtitle]);

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        setLoading(true);
        const response: any = await lessonsApi.lessonDetail(idLesson);
        console.log(response);
        setLessonDetail(response);
        setVideoUrl(`${HTTP_URL_SERVER_NEST}${response.video.outputPathMP4}`);
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
    const fetchSrtFile = async () => {
      axios.get(`${HTTP_URL_SERVER_NEST}${lessonDetail?.video?.pathSRT}`)
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
    }
    console.log(lessonDetail?.video?.pathSRT)
    if(lessonDetail?.video?.pathSRT){
      fetchSrtFile()
    }
  }, [lessonDetail]); 

  const handleDownloadTxt = () => {
    // Tải tệp TXT từ URL và lưu thành tệp với tên cụ thể
    axios.get(`${HTTP_URL_SERVER_NEST}${lessonDetail.video.pathTXT}`)
      .then(response => {
        const blob = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'lesson.txt');
      })
      .catch(error => {
        console.error('Error downloading TXT file:', error);
      });
  };

  const handleAddRow = (index: number) => {
    const newSrtItem = {
      endTime: "00:00:00,000",
      index: index + 1,
      startTime: "00:00:00,000",
      text: "",
    };
    const updatedSrtData = [...srtData.slice(0, index), newSrtItem, ...srtData.slice(index)];
    for (let i = index + 1; i < updatedSrtData.length; i++) {
      updatedSrtData[i].index = updatedSrtData[i].index + 1;
    }
    setSrtData(updatedSrtData);
  };
    
  
  const handleRemoveRow = (indexToRemove: number) => {
    const updatedSrtData = [...srtData];
    updatedSrtData.splice(indexToRemove - 1, 1); 
    for (let i = indexToRemove - 1; i < updatedSrtData.length; i++) {
      updatedSrtData[i].index = i + 1;
    }
    setSrtData(updatedSrtData);
  };
  
  const updateSubtitle = () => {
    console.log(srtData)
    setCallApiUpdateSubtitle(true);
  }
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedSrtData = [...srtData];
    updatedSrtData[index][field] = value;
    setSrtData(updatedSrtData);
  };

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
                {lessonDetail && 
                (
                  <ReactPlayer
                  url={`${HTTP_URL_SERVER_NEST}${lessonDetail.video.outputPathMP4}`}
                  width="100%"
                  height="100%"
                  controls
                  // playing
                />
                )}
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
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls 
                      sx={{ color: 'white' , backgoundColor: 'blue'}}
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
                      <Button variant="outlined" color="error"  onClick={handleClickOpen}>Delete lesson</Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Thông báo cực căng"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete the lecture "{lessonDetail?.title}"?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => setDeleteLesson(true)} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                      {srtData?.map((data, index) : any =>
                        <TableRow key={index} >
                          <TableCell component="th" scope="row">{data.index}</TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={data.startTime}
                              id="filled-hidden-label-small"
                              variant="filled"
                              size="small"
                              onChange={(e) => handleInputChange(data.index-1, 'startTime', e.target.value)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                                value={data.endTime}
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                                onChange={(e) => handleInputChange(data.index-1, 'endTime', e.target.value)}
                              />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              id="standard-multiline-static"
                              value={data.text}
                              multiline
                              rows={3}
                              variant="filled"
                              onChange={(e) => handleInputChange(data.index-1, 'text', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className='flex flex-col justify-around gap-20 py-2'>
                              <AddIcon
                                  fontSize='small'
                                  color='primary'
                                  onClick={() => handleAddRow(data.index)}
                                />
                                <RemoveIcon
                                  fontSize='small'
                                  color='error'
                                  onClick={() => handleRemoveRow(data.index)}
                                />
                            </div>
                          </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                    </Table>
                    <div className='flex justify-center gap-5 my-3'>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }} onClick={updateSubtitle}>Update subtitle</Button>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }} onClick={handleDownloadTxt}>Dowload TXT file</Button>
                      <Button variant="outlined" sx={{ margin: '1rem 0' }}><Link to={`${HTTP_URL_SERVER_NEST}${lessonDetail.video.pathSRT}`}>Dowload SRT file</Link></Button>
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