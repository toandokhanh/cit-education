import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardHeader, CardContent, Grid } from '@mui/material';
import ReactPlayer from 'react-player';

import Navbar from '../Layouts/Navbar';
import Footer from '../Layouts/Footer';
import Progress from '../Layouts/Progress';
import DOMPurify from 'dompurify';
import lessonsApi from '../../apis/lessonsApi';

interface Lesson {
  title: string;
  video: {
    outputPathMP4: string;
  };
  content: string;
}

const LessonDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [lessonDetail, setLessonDetail] = useState<any>();
  const idLesson: any = useParams().idLesson;

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        setLoading(true);
        const response = await lessonsApi.lessonDetail(idLesson);
        setLessonDetail(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [idLesson]);

  const cleanHtml = DOMPurify.sanitize(lessonDetail?.content);

  return (
    <>
      <Navbar />
      <Container>
        {loading && <Progress />}
        {lessonDetail && (
          <>
          <br />
          <br />
          <br />
            {/* <Typography variant="h5">{lessonDetail.title}</Typography> */}
            <Grid container spacing={1}>
              <Grid item xs={12} md={8}>
                <ReactPlayer
                  url={`http://localhost:3003${lessonDetail.video.outputPathMP4}`}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default LessonDetail;
