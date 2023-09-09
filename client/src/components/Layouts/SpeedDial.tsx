import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import categoryApi from '../../apis/catetoryApi';
import { Category } from '../../types/types';
import { Course } from '../../types/types';
import axios from 'axios';
import coursesApi from '../../apis/coursesApi';
import { useUser } from '../Contexts/UserContext';

interface BasicSpeedDialProps {
  setCourses: React.Dispatch<React.SetStateAction<any[]>>; 
  courses: any;
}
export default function BasicSpeedDial({courses,setCourses}: BasicSpeedDialProps) {
    const [open, setOpen] = React.useState(false);
    const [videoFile, setvideoFile] = React.useState<any>();
    const [openForm, setopenForm] = React.useState(false);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [callCoursesApi, setcallCoursesApi] = React.useState(false);
    const [data, setData] = React.useState({
      title: '',
      description: '',
      category: 1,
      thumbnail: '',
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
    const handleImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setvideoFile(event.target.files[0])
      }
    }
    const handleOpen = () => {
        if(open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    };

    const handleClickOpenForm = () => {
      setopenForm(true);
    };

    const handleCloseForm = () => {
      setopenForm(false);
    };
    const VisuallyHiddenInput = styled('input')`
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      white-space: nowrap;
      width: 1px;
      `;

    const UploadForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', videoFile);
      try {
        const response = await axios.post('http://localhost:3003/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setData((prevData) => ({
          ...prevData,
          thumbnail: response?.data
        }));
        setcallCoursesApi(true)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    // lấy ra catetorys lists
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
    }, []);
    
    React.useEffect(() => {
      const createCourse = async () => {
        try {
          console.log(data);
          const response = await coursesApi.createCourse(data);
          setCourses([...courses, response]);
          console.log(response);
          handleCloseForm();
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      if (callCoursesApi) {
        createCourse();
        setcallCoursesApi(false);
      }
    }, [callCoursesApi]);
    
  return (
    <>
      <Box sx={{ height: 0}}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', top: 100, right: 40 }}
          icon={<SpeedDialIcon />}
          direction="down" 
          open={open}
          onClick={handleOpen} 
        >
            <SpeedDialAction icon={
              <CreateNewFolderOutlinedIcon onClick={handleClickOpenForm}/>
            } tooltipTitle='New Course' />
            <SpeedDialAction icon={
              <Link to='/:idCourse/lesson/create'> <FeedOutlinedIcon /> </Link>
            } tooltipTitle='New Lesson' />
        </SpeedDial>
      </Box>
        <Dialog
          disableEscapeKeyDown
          open={openForm}
          onClose={handleCloseForm}
          data-testid="myTestDialog"
          onClick={(event) => event.stopPropagation()}
        >
          <form onSubmit={UploadForm} noValidate> 
            <DialogTitle>Create a new course</DialogTitle>
            <DialogContent>
            <DialogContentText>
            Please enter complete information to create a new course
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              name="title"
              type="text"
              autoComplete="title"
              fullWidth
              variant="standard"
              value={data.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              name="description"
              type="text"
              fullWidth
              variant="standard"
              value={data.description}
              onChange={handleInputChange}
              required 
            />
            <TextField
                margin="dense" 
                fullWidth
                id="standard-select-currency"
                select
                label="Select Catetorys"
                defaultValue="EUR"
                helperText="Please select your currency"
                variant="standard"
                name="catetory"
                value={data.category}
                onChange={handleInputChange}
                required 
              >
                {categories.map((option, index) => (
                  <MenuItem key={option.name} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                className='w-full'
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
              >
                Upload a thumbnail
                <VisuallyHiddenInput type="file" onChange={handleImageFile} name='thumbnail' />
              </Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseForm}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
              </DialogActions>
            </form>
      </Dialog>
      
  </>
  );
}