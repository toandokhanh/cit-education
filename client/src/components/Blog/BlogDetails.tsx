import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import {Link, useParams} from 'react-router-dom'
import blogApi from '../../apis/blogApi'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { format } from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, MenuItem, Popover, TextField, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import { useUser } from '../Contexts/UserContext'
import commentApi from '../../apis/commentApi'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DOMPurify from 'dompurify'

const BlogDetails = () => {
  const { user } = useUser();
  const [commentId, setCommentId] = React.useState(0);
  const idBlog : any = useParams().idBlog
  const [blogDetails, setBlogDetails] = useState<any>()
  const [openFormUpdateComment, setFormOpenUpdateComment] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [commentContent, setCommentContent] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const fetchBlogDetails = async () => {
    try {
      const respose: any = await blogApi.getBlogDetails(idBlog)
      setBlogDetails(respose)
      console.log(respose);
    } catch (error) {
      console.error("Error fetching blog details", error)
    }
  }
  useEffect(() => {
    fetchBlogDetails()
  }, [idBlog])
  
  const handleClickOpenFormComment = () => {
    setFormOpenUpdateComment(true);
  };

  const handleCloseFormComment = () => {
    setFormOpenUpdateComment(false);
  };

  
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMore = (event: any, content : string) => {
    const userComment = event.currentTarget.id;
    setCommentContent(content)
    setCommentId(event.currentTarget.tabIndex);
    if (user) {
      if (Number(userComment) === user.userId) {
        setAnchorEl(event.currentTarget);
      }
    }
  };

  

  const handleLikeComment = async (index: number, commentId: number) => {
    try {
      const comment = blogDetails.comments[index];
      const isLikedByUser = comment.likes.some((like: any) => like.id === user?.userId);
      let updatedComment;
  
      if (isLikedByUser) {
        // Nếu đã "like", thực hiện "unlike" bằng cách gọi API
        await commentApi.unLikeComment(commentId);
  
        // Cập nhật trạng thái "liked" và danh sách likes của comment
        updatedComment = {
          ...comment,
          likes: comment.likes.filter((like: any) => like.id !== user?.userId),
        };
      } else {
        // Nếu chưa "like", thực hiện "like" bằng cách gọi API
        await commentApi.likeComment(commentId);
  
        // Cập nhật trạng thái "liked" và danh sách likes của comment
        updatedComment = {
          ...comment,
          likes: [...comment.likes, { id: user?.userId }],
        };
      }
  
      // Cập nhật comment cụ thể trong danh sách blogDetails.comments
      blogDetails.comments[index] = updatedComment;
  
      // Cập nhật state với phiên bản mới của blogDetails
      setBlogDetails((prevData: any) => ({
        ...prevData,
        comments: [...prevData.comments], // Tạo một bản sao mới của danh sách comments
      }));
    } catch (error) {
      console.error("Error liking/unliking comment", error);
    }
  };

  const handleLikeBlog = async (commentId: number) => {
      
    try {
      const response = await blogApi.likeBlog(commentId)
      setBlogDetails(response);
    } catch (error) {
      console.error("Error liked blog", error);
    }
            
  }
  
  const handleUnLikeBlog = async (commentId: number) => {
    
    try {
      const response = await blogApi.unLikeBlog(commentId)
      setBlogDetails(response);
    } catch (error) {
      console.error("Error unliking blog", error);
    }
          
}
  // hanlde create comment
  const createComment = async () => {
    try {
      if(blogDetails && comment){
        const response = await commentApi.createCommentForBlog(blogDetails.id, { content: comment });
        if (response) {
          setBlogDetails(response);
          setComment('')
        } else {
          console.error("Invalid response from API");
        }
      }
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };

  const updateComment = async () => {
    try {
      if(commentId > 0 && commentContent){
        await commentApi.updateComment(commentId, {content: commentContent})
        const updatedLessonDetail = {
          ...blogDetails,
          comments: blogDetails.comments.map((comment: any) =>
            comment.id === commentId ? { ...comment, content: commentContent } : comment
          ),
        };
        handleCloseFormComment()
        handleClose()
        setBlogDetails(updatedLessonDetail);
      }
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      if(commentId > 0){
        await commentApi.deleteComment(commentId)
        const updatedLessonDetail = {
          ...blogDetails,
          comments: blogDetails.comments.filter((comment: any) => comment.id !== commentId)
        };
        setAnchorEl(null);
        setBlogDetails(updatedLessonDetail);
      }
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };
  
  return (
    <>
        <Navbar/>
        {blogDetails && (
                    <main className="text-start pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white  antialiased">
                    <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
                      <Link to='/blog' className='text-lg font-semibold uppercase flex items-center mb-8 text-[#1976d2]'><ArrowBackIosIcon color='primary' fontSize='small'/>Come back</Link>
                        <header className="mb-4 lg:mb-6 not-format">
                          <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 w-full">
                              <Avatar  sx={{ width: 64, height: 64 }} className="mr-4 w-16 h-16 rounded-full" src="/static/images/avatar/1.jpg" alt={blogDetails.user.fullname} />
                              <div className='flex justify-between w-full items-center'>
                              <div>
                                <Link to={`/user/${blogDetails?.user?.email?.split('@')[0]}`} rel="author" className="text-xl font-bold text-gray-900 uppercase">{blogDetails.user.fullname}</Link>
                                <p className="text-base text-gray-500">{blogDetails.user.role}</p>
                                <p className="text-base text-gray-500">{format(new Date(blogDetails.updatedAt), "MMM d, yyyy")}</p>
                              </div>
                              <div className='flex gap-5'>
                                <div className='flex content-center'>
                                {blogDetails?.likes?.some((like: any) => like.id === user?.userId) ? (
                                    <FavoriteRounded
                                      onClick={() => handleUnLikeBlog(blogDetails.id)}
                                    />
                                  ) : (
                                    <FavoriteBorderIcon
                                      onClick={() => handleLikeBlog(blogDetails.id)}
                                    />
                                  )}
                                  <span className='ml-1 text-base font-medium'>{blogDetails.likes.length}</span>
                                </div>
                              </div>
                              </div>
                            </div>
                          </address>
                          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{blogDetails.title}</h1>
                        </header>
                        <p className="lead" id='container-content'>
                        <span className='text-start' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails.content) }} />
                        </p>
                        <section className="not-format">
                          <div className="flex justify-between items-center mb-6 mt-5">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Discussion ({blogDetails.comments.length})</h2>
                          </div>

                          {blogDetails.comments.map((comment: any, index: number) => (
                            <div key={comment.id} className='text-start flex my-3 mx-3 gap-2'>
                                <Link to={`/user/${comment?.user?.email?.split('@')[0]}`}>
                                          <Avatar sx={{ width: 32, height: 32 }} alt={comment.user.fullname} src="/static/images/avatar/1.jpg" />
                                </Link>
                                <div>
                                <div className="bg-gray-200 rounded-3xl px-4 pt-2 pb-2.5 ">
                                  <div className="font-semibold text-sm leading-relaxed">{comment.user.fullname} </div>
                                  <div className="text-sm leading-snug md:leading-normal">{comment.content}</div>
                                </div>
                                
                                <div className="text-xs ml-4 mt-0.5 text-gray-500 ">
                                  {comment.user.id === user?.userId ?('You') : comment.isCreator ? (<p>Creator <HowToRegIcon fontSize='small'/></p>) : ('User')} 
                                </div>
                                
                                <div className="bg-white  border border-white  rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
                                  {comment?.likes?.some((like: any) => like.id === user?.userId) ? (
                                    // Nếu đã "like" comment, hiển thị biểu tượng trái tim đỏ
                                    <FavoriteRounded
                                      fontSize='small'
                                      onClick={() => handleLikeComment(index, comment.id)}
                                    />
                                  ) : (
                                    // Nếu chưa "like" comment, hiển thị biểu tượng trái tim trắng
                                    <FavoriteBorderIcon
                                      fontSize='small'
                                      onClick={() => handleLikeComment(index, comment.id)}
                                    />
                                  )}
                                <span className="text-sm ml-1 pr-1.5 text-gray-500 0">{comment?.likes?.length}</span>
                                </div>
                                </div>
                                <span onClick={(event) => handleMore(event, comment.content)} id={comment?.user.id} tabIndex={comment.id} className='mt-5'><MoreHorizIcon  fontSize="small"/></span>
                            </div>
                          ))}
                          <Popover
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                        >
                          <MenuItem onClick={handleClickOpenFormComment}>Sửa</MenuItem>
                          <MenuItem onClick={handleDeleteComment}>Xóa</MenuItem>
                        </Popover>
                        <Dialog open={openFormUpdateComment} onClose={handleCloseFormComment}>
                          <DialogContent>
                            <TextField
                              autoFocus
                              value={commentContent}
                              margin="dense"
                              id="name"
                              type="email"
                              fullWidth
                              variant="standard"
                              onChange={(e) => setCommentContent(e.target.value)}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseFormComment}>Cancel</Button>
                            <Button onClick={updateComment}>Update Comment</Button>
                          </DialogActions>
                        </Dialog>
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
                          <label htmlFor="comment" className="sr-only">Your comment</label>
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)} name='comment' id="comment" rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0  " placeholder="Write a comment..." required />
                        </div>
                        <button onClick={createComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                          Post comment
                        </button>
                        </section>
                      </article>
                    </div>
                  </main>
        )}
    </>
  )
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default BlogDetails