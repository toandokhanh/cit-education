import React, { useState } from 'react'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import {Link, useParams, useNavigate } from 'react-router-dom';
import coursesApi from '../../apis/coursesApi';
import { Grid, Container, Divider, Chip, Avatar, AvatarGroup, Tooltip} from '@mui/material';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccessTimeIcon from '@mui/icons-material/AccessTime';  
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LessonsLists from '../Lesson/LessonsItems';
import Progress from '../Layouts/Progress';
import { useUser } from '../Contexts/UserContext';
import { HTTP_URL_SERVER_NEST } from '../../constant/constant';


const CourseDetail = () => {
    const [loading, setloading] = useState(false)
    const [registerCourse, setRegisterCourse] = useState(false)
    const { user } = useUser();
    const [courseDetail, setcourseDetail] = useState<any>([]);
    const idCourse : any = useParams().idCourse;
    const navigation = useNavigate()
    const fetchCourseDetails = async () => {
      try {
        setloading(true);
        const response = await coursesApi.courseDetails(idCourse);
        console.log(response);
        setcourseDetail(response)
        setloading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setloading(false);
      }
    };
    
    const HandleregisterCourse = async () => {
      try {
        const response = await coursesApi.registerCourse(idCourse)
        if(response?.course?.lessons?.length > 0){
          const lessonFirst = response?.course?.lessons[0].id
          navigation(`/course/${idCourse}/lesson/${lessonFirst}/detail`)
        }
        else {
          navigation('/home')
        }
      } catch (error) {
        console.error('Error registering course', error);
      }
    }
    React.useEffect(() => {
      fetchCourseDetails();
    }, []);

    React.useEffect(() => {
      if(registerCourse){
        HandleregisterCourse()
        setRegisterCourse(false)
      }
    }, [registerCourse]);


    return (
      <>
        <Navbar />
        {loading && (<Progress/>)}
        <br />
        <br />
        <br />

        <Container >
          {user && (
            <Grid container spacing={{ xs: 2, md: 3 }} px={5}>
              <Grid item xs={12} sm={9}>
                <p className='text-start font-semibold text-2xl uppercase'>{courseDetail?.title}</p>
                <p className='text-start'>{courseDetail?.description}</p>
                <p className='text-start font-semibold text-1xl uppercase my-5'>Lesson contents</p>
                  {courseDetail?.lessons?.map((lesson: any, index: number) => 
                    <div key={index}>
                      <LessonsLists idCourse={idCourse} lessons={lesson} index={index}/>
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={3} px={5}>
                <div style={{ width: '100%', paddingBottom: '60%', position: 'relative' }}>
                  <img style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '0.75rem'}} src={'http://localhost:3003/' + courseDetail?.thumbnail} alt={courseDetail?.title} />
                </div>
                <p className=' font-semibold text-2xl text-[#feb800] uppercase my-5 '>free of charge</p>
                <button 
                  className="bg-[#1976d2] hover:bg-blue-700 text-white font-medium py-2 px-11 rounded-full mb-5"
                  onClick={() => setRegisterCourse(true)}
                  >
                Register 
                </button>
                <Divider variant="fullWidth" />
                <div>
                  <p className='text-start font-semibold text-1xl my-3'>About</p>
                </div>
                <div className='flex justify-start mb-[-5px]'>
                <AssistWalkerIcon fontSize='small' className='m-[10px]'/>
                <p className='ml-5 mt-2 text-gray-700'> Basic qualifications</p> 
                </div>
                <div className='flex justify-start mb-[-5px]'>
                <OndemandVideoIcon fontSize='small' className='m-[10px]'/>
                <p className='ml-5 mt-2 text-gray-700'>Total {courseDetail?.lessons?.length} lessons</p> 
                </div>
                <div className='flex justify-start mb-[-5px]'>
                <AccessTimeIcon fontSize='small' className='m-[10px]'/>
                <p className='ml-5 mt-2 text-gray-700'>Total duration {courseDetail?.lessons?.length}</p> 
                </div>
                <div className='flex justify-start mb-2'>
                <ImportContactsIcon fontSize='small' className='m-[10px]'/>
                <p className='ml-5 mt-2 text-gray-700'>Learn all the time</p> 
                </div>
                <Divider variant="fullWidth" />
                <div className='text-start mb-4'>
                  <p className='text-start font-semibold text-1xl my-3'>Creator</p>
                  <div className='ml-3'>
                  <Link to={`/user/${courseDetail?.creator?.email?.split('@')[0]}`}>
                    <Chip
                      avatar={<Avatar alt={courseDetail?.creator?.fullname} src='' />}
                      label={courseDetail?.creator?.fullname}
                      variant="outlined"
                    />
                  </Link>
                  </div>
                </div>
                <Divider variant="fullWidth" />
                <div className=''>
                  <p className='text-start font-semibold text-1xl my-3'>Learner</p>
                  <div className=' float-left ml-3'>
                  <AvatarGroup max={4}>
                    {/* map students */}
                    {courseDetail?.students?.map((student: any) =>
                    <Tooltip key={student?.email} title={student?.fullname} followCursor>
                      <Link to={`/user/${student?.email.split('@')[0]}`}>
                        <Avatar sx={{ width: 34, height: 34 }} alt={student?.fullname} src="/static/images/avatar/1.jpg" />
                      </Link>
                    </Tooltip>
                    )}
                  </AvatarGroup>
                  </div>
                </div>
              </Grid>
          </Grid>
          )}
          
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </>
    )
}

export default CourseDetail

