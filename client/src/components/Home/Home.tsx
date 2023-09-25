// Home.tsx

// import React, { useEffect, useState } from 'react';
// import categoryApi from '../../apis/catetoryApi';
// import { Category } from '../../types/types';
import Footer from '../Layouts/Footer';
import { useUser } from '../Contexts/UserContext';
import { HTTP_URL_SERVER_NEST, LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../Layouts/Navbar';
import { useEffect, useState } from 'react';
import coursesApi from '../../apis/coursesApi';
import Progress from '../Layouts/Progress';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Container from '@mui/material/Container';
import ActionAreaCard from '../Courses/ActionAreaCard';
import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AllCourses from '../Courses/AllCourses';


const Home: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const [Courses, setCourses] = useState<any[]>([])
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  const fetchMyCoursesBasedInstructor = async () => {
    try {
        const myCourses = await coursesApi.getMyCoursesCreated()
        setCourses(myCourses)
        setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  const fetchMyCoursesBasedStudent = async () => {
    try {
      const myCourses = await coursesApi.getMyCoursesRegistered()
      setCourses(myCourses)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    if(user?.role === 'instructor'){
      fetchMyCoursesBasedInstructor()
    }
    if(user?.role === 'student'){
      fetchMyCoursesBasedStudent()
    }
  }, [user])
  
  return (
    <>
    {accessToken ? (
      <>
      <Navbar setCourses={setCourses} courses={Courses}/>
      {loading && (<Progress/>)}
      {!user?.isInstructor ? (
        <>
          <Container className='mt-12'>
          {Courses.length > 0 ? (
            <div>
              <h4 className='text-start text-3xl font-semibold mb-9'>My course</h4>
              <Grid container spacing={4}>
              {Courses.map((course, index) => (
                <Grid item xs={3} mb={3} key={index}>
                  <ActionAreaCard
                    thumbnail={HTTP_URL_SERVER_NEST+ course?.thumbnail}
                    title={course?.title}
                    link={'/course/' + course?.id}
                    description={course?.description}
                  />
                </Grid>
              ))}
              </Grid>
            </div>
          ): (<h4 className='text-start text-3xl font-semibold mb-[28rem]'>You don't have any courses yet</h4>)}
          </Container>
        </>
      ) : (
          <Container className='mt-12'>
            {Courses.length > 0 ? (
              <>
                <h4 className='text-start text-3xl font-semibold mb-9'>My course</h4>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell align="center">Learners</TableCell>
                      <TableCell align="left">Lessons</TableCell>
                      <TableCell align="left">Created At</TableCell>
                      <TableCell align="left">Thumbnail</TableCell>
                    </TableRow>
                  </TableHead>
                  {Courses.map((course, index) => 
                  <TableBody key={index}>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell  component="th" scope="row">{index+1}</TableCell>
                              <TableCell sx={{ maxWidth: '200px', overflow: 'hidden' }}>{course?.title}</TableCell>
                              <TableCell align="center">{course?.students?.length}</TableCell>
                              <TableCell sx={{ maxWidth: '200px', overflow: 'hidden' }} align="left">
                                {/* map all lessons */}
                                {course?.lessons?.map((lesson: { id: number, title: any; }) =>
                                  <div className='mb-3 max-h-5 overflow-hidden text-[blue]' key={lesson.id}>
                                    <Link to={'/course/'+course?.id+'/lesson/'+ lesson.id+'/detail'}>{lesson.title}</Link>
                                    <br />
                                  </div> 
                                )}
                              </TableCell>
                              <TableCell align="left">{course?.createdAt}</TableCell>
                              <TableCell align="center">
                                <img height='100px' width='100px' src={HTTP_URL_SERVER_NEST+course?.thumbnail}/>
                              </TableCell>
                              <TableCell align="center">
                                <Link to={'/myCourses/'+course?.id} ><EditNoteIcon fontSize='small' color='primary'/></Link>
                              </TableCell>
                        </TableRow>
                  </TableBody>
                  )}
                </Table>
              </TableContainer>
              </>
            ): (<h4 className='text-start text-3xl font-semibold mb-[28rem]'>You don't have any courses yet</h4>)}
            
          </Container>
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
