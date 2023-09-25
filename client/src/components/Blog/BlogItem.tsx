import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogActions, DialogContent, MenuItem, Popover, TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useUser } from '../Contexts/UserContext';
import ReactQuill from 'react-quill';
import blogApi from '../../apis/blogApi';
import { HTTP_URL_SERVER_NEST } from '../../constant/constant';
const BlogItem = ({blog, setBlogs}: any) => {
    const { user } = useUser();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const formattedDate = format(new Date(blog?.updatedAt), "MMM d, yyyy");
    const [openFormUpdateBlog, setFormOpenUpdateBlog] = React.useState(false);
    const open = Boolean(anchorEl);
    const [blogId, setBlogId] = useState(0)
    const [data, setData] = React.useState({
      title: '',
      content: ''
    });
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClickOpenFormBlog = () => {
      setFormOpenUpdateBlog(true);
    };
    const handleCloseFormBlog = () => {
      setFormOpenUpdateBlog(false);
    };
    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleQuillChange = (value: String) => {
      setData((prevData: any) => ({
        ...prevData,
        content: value,
      }));
    };
    const handleMore = (event: any, title: any,content : string) => {
      const createrId = event.currentTarget.id;
      setBlogId(event.currentTarget.tabIndex);
      setData({title, content})
      if (user) {
        if (Number(createrId) === user.userId) {
          setAnchorEl(event.currentTarget);
        }
      }
    };
    const fetchBlogs = async () =>{
      try {
        const response = await blogApi.getAllBlogs()
        setBlogs(response)
      } catch (error) {
        console.error('Error fetching blog', error)
      }
    }
    const updateBlog = async () => {
      try {
        if(blogId > 0 && data.title && data.content){
          await blogApi.updateBlog(blogId, data)
          fetchBlogs()
          handleCloseFormBlog()
          handleClose()
        }
      } catch (error) {
        console.error("Error creating comment", error);
      }
    };

    const handleDeleteBlog = async () => {
      try {
        if(blogId > 0){
          await blogApi.deleteBlog(blogId)
          fetchBlogs()
        }
      } catch (error) {
        console.error("Error creating comment", error);
      }
    };
  
  return (
    <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-100 my-5">
        <div className="flex items-center justify-between">
          <span className="text-sm ">{formattedDate}</span>
          <div rel="noopener noreferrer" className="px-2 py-1 font-bold rounded flex gap-4">
          <div><FavoriteBorderIcon fontSize='medium' color='action'/> <span>{blog.likes.length}</span></div>
          <div><ChatBubbleOutlineIcon fontSize='medium' color='action'/> <span>{blog.comments.length}</span></div>
          <div >
            <MoreHorizIcon 
            onClick={(event) => handleMore(event, blog.title ,blog.content)} 
            fontSize='medium' color='action'
            id={blog?.user.id}
            tabIndex={blog.id}
            />
          </div>
          <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
          >
            <MenuItem onClick={handleClickOpenFormBlog}>Sửa</MenuItem>
            <MenuItem onClick={handleDeleteBlog}>Xóa</MenuItem>
          </Popover>
          <Dialog open={openFormUpdateBlog} onClose={handleCloseFormBlog}>
            <DialogContent>
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
            </DialogContent>
            <DialogContent>
              <ReactQuill
                  className="h-96"
                  theme="snow"
                  value={data.content}
                  onChange={handleQuillChange}
                  modules={BlogItem.modules}
                  formats={BlogItem.formats}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseFormBlog}>Cancel</Button>
              <Button onClick={updateBlog}>Update Comment</Button>
            </DialogActions>
          </Dialog>
          </div>
        </div>
        <div className="mt-3 text-start">
            <Link className='flex items-center hover:underline' to={`/blog/${blog?.id}/details`}>
                <p  className="text-2xl font-bold hover:underline truncate w-full overflow-hidden">{blog.title}</p>
            </Link>
            <p className="mt-2 line-clamp-3"><span className='text-start font-light text-base' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} /></p>
        </div>

        <div className="flex items-center justify-between mt-4">
            <Link className='flex items-center text-[#1976d2] hover:underline' to={`/blog/${blog?.id}/details`}>Read more</Link>
            <Link className='flex items-center' to={`/user/${blog?.user?.email?.split('@')[0]}`}>
                <Avatar  sx={{ width: 32, height: 32 }} src={`${HTTP_URL_SERVER_NEST}${blog.user.avatar}` || `/static/images/avatar/1.jpg`} alt={blog.user.fullname} className="object-cover w-10 h-10 mx-4 rounded-full" />
                <span className="hover:underline ml-[-5px]">{blog.user.fullname}</span>
            </Link>
        </div>
    </div>
  )
}

BlogItem.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

BlogItem.formats = [
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

export default BlogItem