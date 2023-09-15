import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardHeader, CardContent, Grid, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button } from '@mui/material';
import ReactPlayer from 'react-player';
import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import Progress from '../Layouts/Progress';
import DOMPurify from 'dompurify';
import lessonsApi from '../../apis/lessonsApi';
import { useUser } from '../Contexts/UserContext';
import ReactQuill from 'react-quill';

interface Lesson {
  title: string;
  video: {
    outputPathMP4: string;
  };
  content: string;
}

const LessonDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLesson, setUploadLesson] = useState<boolean>(false);
  const [lessonDetail, setLessonDetail] = useState<any>();
  const [infoLesson, setInfoLessson] = useState({
    title: '',
    content: '',
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
      setUploadLesson(true)
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
                      <TextField
                          label="Lesson title"
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
                      <ReactQuill
                        value={infoLesson.content}
                        onChange={handleQuillContentChange}
                      />
                    </div>
                    <Button variant="outlined" onClick={() => setUploadLesson(true)} >Update lesson</Button>
                </Grid>
                {/* grid 2 */}
                <Grid item xs={12} md={12} sx={{ margin: '0 auto', marginTop:'2rem' }}>
                  <Box sx={{ height:'100%', width: '100%' }}>
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
                          <TableRow >
                            <TableCell component="th" scope="row">1</TableCell>
                            <TableCell component="th" scope="row">
                              <TextField
                                label="1"
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                  label="1"
                                  id="filled-hidden-label-small"
                                  variant="filled"
                                  size="small"
                                />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                id="standard-multiline-static"
                                label="1"
                                multiline
                                rows={3}
                                variant="filled"
                              />
                            </TableCell>
                          </TableRow>
                      </TableBody>
                      <TableBody>
                          <TableRow >
                            <TableCell component="th" scope="row">2</TableCell>
                            <TableCell component="th" scope="row">
                              <TextField
                                label="2"
                                id="filled-hidden-label-small"
                                variant="filled"
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                  label="2"
                                  id="filled-hidden-label-small"
                                  variant="filled"
                                  size="small"
                                />
                            </TableCell>
                            <TableCell align="left">
                              <TextField
                                id="standard-multiline-static"
                                label="2"
                                multiline
                                rows={3}
                                variant="filled"
                              />
                            </TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                  <Button variant="outlined" color="error">Delete lesson</Button>
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
