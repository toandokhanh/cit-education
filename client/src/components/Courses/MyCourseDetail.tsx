import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Slide, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Category } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import { TransitionProps } from '@mui/material/transitions';
import coursesApi from '../../apis/coursesApi';
import categoryApi from '../../apis/catetoryApi';
import Navbar from '../Layouts/Navbar';
import Progress from '../Layouts/Progress';
import Footer from '../Layouts/Footer';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const MyCourseDetail = () => {
    const [loading, setloading] = useState(false)
    const { user } = useUser();
    const [courseDetail, setcourseDetail] = useState<any>([]);
    const params : any = useParams();
    const [valudeDefaultCategory, setValudeDefaultCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [action, setAction] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setcourseDetail((prevData: any) => ({
          ...prevData,
          [name]: value
        }));
      };

      
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

      
      React.useEffect(() => {
        const fetchUpdateCourse = async () => {
          try {
            const data = {
              title: courseDetail?.title,
              description: courseDetail?.description,
              category:courseDetail?.category?.id || courseDetail?.category
            }
            console.log(data)
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
        <br />
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
        <Footer/>
    </>
  )
}

export default MyCourseDetail