import React from 'react'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import { useParams } from 'react-router-dom';
import coursesApi from '../../apis/coursesApi';
import { Grid, Container, Paper, Divider, Chip, Avatar, AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccessTimeIcon from '@mui/icons-material/AccessTime';  
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LessonsLists from '../Lesson/AllLessons';
const CourseDetail = () => {
    const [courseDetail, setcourseDetail] = React.useState<any>([]);
    const params = useParams();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    React.useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await coursesApi.courseDetails(params.idCourse);
            console.log(response)
            setcourseDetail(response)
          } catch (error) {
            console.error('Error fetching course details:', error);
          }
        };
        
        fetchCategories();
      }, []);
      return (
        <>
          <Navbar />
          <br />
          <br />
          <br />
          <Container >
            <Grid container spacing={{ xs: 2, md: 3 }} px={5}>
              <Grid xs={12} sm={9}>
                <p className='text-start font-semibold text-2xl uppercase'>{courseDetail?.title}</p>
                <p className='text-start'>{courseDetail?.description}</p>
                <p className='text-start font-semibold text-1xl uppercase my-5'>nội dung bài học</p>
                  {courseDetail?.lessons?.map((lesson: any, index: number) => 
                    <>
                    
                    <LessonsLists lessons={lesson} index={index}/>
                    </>
                  )}
              </Grid>
              <Grid xs={12} sm={3} px={5}>
                <div style={{ width: '100%', paddingBottom: '60%', position: 'relative' }}>
                  <img style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '0.75rem'}} src={'http://localhost:3003/' + courseDetail?.thumbnail} alt={courseDetail?.title} />
                </div>
                <p className=' font-semibold text-2xl text-[#feb800] uppercase my-5 '>free of charge</p>
                <button className="bg-[#1976d2] hover:bg-blue-700 text-white font-medium py-2 px-11 rounded-full mb-5">
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
                    <Chip
                      avatar={<Avatar alt={courseDetail?.creator?.fullname} src={courseDetail?.creator?.avatar} />}
                      label={courseDetail?.creator?.fullname}
                      variant="outlined"
                    />
                  </div>
                </div>
                <Divider variant="fullWidth" />
                <div className=''>
                  <p className='text-start font-semibold text-1xl my-3'>Learner</p>
                  <div className=' float-left ml-3'>
                  <AvatarGroup max={4}>
                    {/* map students */}
                    <Avatar sx={{ width: 34, height: 34 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar sx={{ width: 34, height: 34 }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar sx={{ width: 34, height: 34 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar sx={{ width: 34, height: 34 }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar sx={{ width: 34, height: 34 }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </>
      )
      
}

export default CourseDetail

