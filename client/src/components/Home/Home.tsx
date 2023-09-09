// Home.tsx

// import React, { useEffect, useState } from 'react';
// import categoryApi from '../../apis/catetoryApi';
// import { Category } from '../../types/types';
import Footer from '../Layouts/Footer';
import { useUser } from '../Contexts/UserContext';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Layouts/Navbar';
import { useEffect, useState } from 'react';
import coursesApi from '../../apis/coursesApi';
import Progress from '../Layouts/Progress';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import BasicSpeedDial from '../Layouts/SpeedDial';
import ActionAreaCard from '../Courses/ActionAreaCard';

const Home: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true)
  const [Courses, setCourses] = useState<any[]>([])
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  useEffect(() => {
    const fetchMyCourses = async () => {
      if(user?.isInstructor){
        try {
          const myCourses = await coursesApi.getMyCoursesCreated()
          setCourses(myCourses)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }else{
        try {
            const myCourses = await coursesApi.getMyCoursesRegistered()
            setCourses(myCourses)
            setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    }
    fetchMyCourses()
  }, [user])
  
  return (
    <>
    {accessToken ? (
      <>
      <Navbar setCourses={setCourses} courses={Courses}/>
      {loading && (<Progress/>)}
      {user?.isInstructor ? (
        <>
          <Container className='mt-12'>
            <Grid container spacing={3}>
              {Courses.map((course, index) => 
              // <Link to={'/course/'+ course?.id} >
              //   <div>Title: {course?.title}</div> 
              //   <img className='w-10 h-10 mx-auto' src={'http://localhost:3003'+course?.thumbnail} alt={course?.title} />
              //   <div>Lesson length: {course?.lessons?.length}</div> 
              //   <br/>
              // </Link>
              <Grid xs={4} mb={3} key={index}>
                <ActionAreaCard thumbnail={'http://localhost:3003'+course?.thumbnail} title={course?.title} link={'/course/'+ course?.id} description={course?.description}/>
              </Grid>
              )}
            </Grid>
          </Container>
        </>
      ): (
        <>
        {Courses.map(course => 
        <>
          <div>{course?.title}</div> 
          <img src={course?.thumbnail} alt={course?.title} />
          <div>{course?.lessons.length}</div> 
        </>
        )}
        </>
      )}
      <Footer />
      </>
    ) : (
      <Navigate to="/" />
    )}
      
    </>
  );
};

export default Home;
