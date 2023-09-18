import React, { useState } from 'react'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import coursesApi from '../../apis/coursesApi';
import { Grid, Container, Divider, Chip, Avatar, AvatarGroup, TextField, Button, MenuItem, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AssistWalkerIcon from '@mui/icons-material/AssistWalker';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccessTimeIcon from '@mui/icons-material/AccessTime';  
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LessonsLists from '../Lesson/AllLessons';
import Progress from '../Layouts/Progress';
import { useUser } from '../Contexts/UserContext';
import categoryApi from '../../apis/catetoryApi';
import { Category } from '../../types/types';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CourseDetail = () => {
    const [loading, setloading] = useState(false)
    const [categories, setCategories] = useState<Category[]>([]);
    const { user } = useUser();
    const [courseDetail, setcourseDetail] = useState<any>([]);
    const params : any = useParams();
    const [action, setAction] = useState('');
    const [valudeDefaultCategory, setValudeDefaultCategory] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
      React.useEffect(() => {
        const fetchCourseDetails = async () => {
          try {
            setloading(true);
            const response = await coursesApi.courseDetails(params.idCourse);
            setValudeDefaultCategory(response?.category?.id)
            setcourseDetail(response)
            setloading(false);
          } catch (error) {
            console.error('Error fetching course details:', error);
            setloading(false);
          }
        };
        
        fetchCourseDetails();
      }, []);
      React.useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await categoryApi.getCategories();
            setCategories(response);
            
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
        fetchCategories();
      }, [courseDetail]);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setcourseDetail((prevData: any) => ({
          ...prevData,
          [name]: value
        }));
      };

      React.useEffect(() => {
        const fetchUpdateCourse = async () => {
          try {
            const data = {
              title: courseDetail?.title,
              description: courseDetail?.description,
              category:courseDetail?.category
            }
            await coursesApi.updateCouse(params.idCourse, data);
            navigate('/home')
          } catch (error) {
            console.error('Error fetching course update:', error);
          }
        };
        const fetchDeleteCourse = async () => {
          try {
            await coursesApi.deleteCouse(params.idCourse);
            navigate('/home')
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
        if(action === 'delete') {
          fetchDeleteCourse();
          setAction('');
        } 
        if(action === 'update'){
          fetchUpdateCourse();
          setAction('');
        }
      }, [action]);
      // handle update course and delete course

      return (
        <>
          <Navbar />
          {loading && (<Progress/>)}
          <br />
          <br />
          <br />

          <Container >
            {!user?.isInstructor ? (
              <Grid container spacing={{ xs: 2, md: 3 }} px={5}>
                <Grid item xs={12} sm={9}>
                  <p className='text-start font-semibold text-2xl uppercase'>{courseDetail?.title}</p>
                  <p className='text-start'>{courseDetail?.description}</p>
                  <p className='text-start font-semibold text-1xl uppercase my-5'>nội dung bài học</p>
                    {courseDetail?.lessons?.map((lesson: any, index: number) => 
                      <div key={index}>
                        <LessonsLists lessons={lesson} index={index}/>
                      </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={3} px={5}>
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
                        avatar={<Avatar alt={courseDetail?.creator?.fullname} src='' />}
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
            ) : (
              <Grid container spacing={{ xs: 1, md: 2 }} px={5}>
                <Grid item xs={8} sx={{ margin: '0 auto' }}>
                  <p className='text-start'>Title</p>
                  <TextField
                    id="outlined-multiline-flexible"
                    name='title'
                    value={courseDetail?.title}
                    multiline
                    fullWidth
                    maxRows={4}
                    onChange={handleInputChange}
                  />
                  <br />
                  <br />
                  <p className='text-start'>Description</p>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    name='description'
                    value={courseDetail?.description}
                    rows={6}
                    fullWidth
                    onChange={handleInputChange}
                  />
                  <br />
                  <br />
                  {valudeDefaultCategory && (
                    <TextField
                        margin="dense" 
                        fullWidth
                        select
                        label="Select Catetorys"
                        helperText="Please select your currency"
                        name="category"
                        defaultValue={valudeDefaultCategory}
                        onChange={handleInputChange}
                        required 
                      >{categories.map(option => (
                        <MenuItem key={option.name} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  <br />
                  <br />   
                  {/* <img height={200} width={200} className='object-cover mx-auto my-3 rounded-md' src={HTTP_URL_SERVER_NEST+courseDetail?.thumbnail} alt="" /> */}
                  <br />
                  <div className='flex justify-center gap-96'> 
                    <Button
                    component="label"
                    variant="contained"
                    onClick={() => setAction('update')}
                    >
                      Update course
                    </Button>
                    <Button
                    component="label"
                    variant="contained"
                    color='error'
                    onClick={handleClickOpen}
                    >
                      Delete course
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        TransitionComponent={Transition}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Thông báo cực căng"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete the lecture "{courseDetail?.title}"?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => setAction('delete')} autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
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

