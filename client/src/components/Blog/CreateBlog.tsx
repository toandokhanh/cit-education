import React from 'react'
import Navbar from '../Layouts/Navbar'
import ReactQuill from 'react-quill';
import { TextField } from '@mui/material';
import blogApi from '../../apis/blogApi';
import {Link, useNavigate} from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateBlog = () => {
    const navigate = useNavigate()
    const [data, setData] = React.useState({
        title: '',
        content: ''
    });
    const handleQuillChange = (value: String) => {
        setData((prevData: any) => ({
          ...prevData,
          content: value,
        }));
      };
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        try {
            if (data.title || data.content){
                const response:any = await blogApi.createBlog(data)
                navigate(`/blog/${response.id}/details`)
                console.log(response);
            }
        } catch (error) {
            console.error("Error sending blog informations", error)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='container mx-auto mt-10'>
        <Link to='/blog' className='text-lg font-semibold uppercase flex items-center mb-8 text-[#1976d2]'><ArrowBackIosIcon color='primary' fontSize='small'/>Come back</Link>
            <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title *"
            name="title"
            type="text"
            autoComplete="title"
            fullWidth
            variant="standard"
            value={data.title}
            onChange={handleInputChange}
        />
            <ReactQuill
            className="h-96"
            theme="snow"
            value={data.content}
            onChange={handleQuillChange}
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
        />
        <div className='flex mt-16 float-right'>
        <button onClick={handleSubmit} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Publish
        </button>
        </div>
        </div>
        
    </div>
  )
}

CreateBlog.modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  
  CreateBlog.formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];
  
export default CreateBlog