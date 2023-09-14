import React, { useState } from 'react'
import Footer from '../../Layouts/Footer'
import Navbar from '../../Layouts/Navbar'
import { Button, Container, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField, styled } from '@mui/material'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const LessonForm = () => {
  const [videoFile, setvideoFile] = React.useState<any>();
  const [value, setValue] = useState<any>('');
  const [data, setData] = React.useState({
    title: '',
    content: '',
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
      const response = await axios.post('http://localhost:3003/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response?.data)
      // setData((prevData) => ({
      //   ...prevData,
      //   thumbnail: response?.data
      // }));
      // setcallCoursesApi(true)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  return (
    <>
    <Navbar/>
    <Container>
    <h6 className='uppercase text-2xl float-left mt-10'>Create a new lesson</h6>
    <br />
    <br />
    <br />
    <form onSubmit={UploadForm} noValidate> 
      <DialogContent>
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
        id="content"
        label="content"
        name="content"
        type="text"
        fullWidth
        variant="standard"
        value={data.content}
        onChange={handleInputChange}
        required 
      />
      <Button
          className='float-left'
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          href="#file-upload"
        >
          Upload a video
          <VisuallyHiddenInput type="file" onChange={handleImageFile} name='thumbnail' />
        </Button>
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
          <MenuItem  value='test'>
              test
            </MenuItem>
        </TextField>
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={LessonForm.modules} formats={LessonForm.formats} />;
        <p>{value}</p>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </form>
    </Container>
    <Footer/>
    </>
    )
}

LessonForm.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

LessonForm.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default LessonForm