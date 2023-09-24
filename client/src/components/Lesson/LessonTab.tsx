import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DOMPurify from 'dompurify';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Popover, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import { useUser } from '../Contexts/UserContext';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import commentApi from '../../apis/commentApi';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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



export default function LessonTab({lessonDetail, setLessonDetail }: any) {
  const { user } = useUser();
  const [commentId, setCommentId] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [commentContent, setCommentContent] = React.useState('');
  const cleanHtml = DOMPurify.sanitize(lessonDetail.content);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [openFormUpdateComment, setFormOpenUpdateComment] = React.useState(false);

  const handleClickOpenFormComment = () => {
    setFormOpenUpdateComment(true);
  };

  const handleCloseFormComment = () => {
    setFormOpenUpdateComment(false);
  };

  // hanlde create comment
  const createComment = async () => {
    try {
      if(lessonDetail && comment){
        const response = await commentApi.createCommentForLesson(lessonDetail.id, { content: comment });
        if (response) {
          setLessonDetail(response);
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
          ...lessonDetail,
          comments: lessonDetail.comments.map((comment: any) =>
            comment.id === commentId ? { ...comment, content: commentContent } : comment
          ),
        };
        handleCloseFormComment()
        handleClose()
        setLessonDetail(updatedLessonDetail);
        
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
          ...lessonDetail,
          comments: lessonDetail.comments.filter((comment: any) => comment.id !== commentId)
        };
        setAnchorEl(null);
        setLessonDetail(updatedLessonDetail);
      }
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
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

  const [liked, setLiked] = React.useState(false);

  const handleLikeComment = async (index: number, commentId: number) => {
    try {
      const comment = lessonDetail.comments[index];
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
  
      // Cập nhật comment cụ thể trong danh sách lessonDetail.comments
      lessonDetail.comments[index] = updatedComment;
  
      // Cập nhật state với phiên bản mới của lessonDetail
      setLessonDetail((prevData: any) => ({
        ...prevData,
        comments: [...prevData.comments], // Tạo một bản sao mới của danh sách comments
      }));
    } catch (error) {
      console.error("Error liking/unliking comment", error);
    }
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="lesson contents" {...a11yProps(0)} />
          <Tab label="Take notes" {...a11yProps(1)} disabled />
          <Tab label="Q&A" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography className='text-start' dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        <br />
        <br />
        <br />
        <br />
        <br />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Take notes
        <br />
        <br />
        <br />
        <br />
        <br />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {lessonDetail.comments.map((comment: any, index: number) => (
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
        <div className='my-10'>
          <div className="mb-4 flex items-center gap-2">
            {user && (
              <Avatar sx={{ width: 32, height: 32 }} alt={user?.fullname} src="/static/images/avatar/1.jpg" />
            )}
            <input name="comment" value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="w-full rounded-lg border border-gray-400 p-2" placeholder="Write a comment ..." />
            <button onClick={createComment} className="ml-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">Send</button>
          </div>
        </div>
        <div>
            <br />
            <br />
            <br />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
