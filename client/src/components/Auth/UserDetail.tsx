import React, { useEffect , useState} from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { Link, useParams } from 'react-router-dom'
import userApi from '../../apis/userApi'
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, Grid, TextField } from '@mui/material'
import blogApi from '../../apis/blogApi'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useUser } from '../Contexts/UserContext'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled'
import { HTTP_URL_SERVER_NEST } from '../../constant/constant'
import axios from 'axios'

const UserDetail = () => {
  const [openFormUpdateUser, setFormOpenUpdateComment] = React.useState(false);
  const userCurrent = useUser()
  const email: any = useParams().email
  const [videoFile, setvideoFile] = React.useState<any>();
  const [callUserApi,setCallUserApi] = React.useState<boolean>();
  const [data, setData] = useState<any>({ 
    user: {},
    courses: [],
    blogs: []
  })
  const [infoUser, setInfoUser] = useState({
    bio: '',
    fullname: '',
    avatar: ''
  })
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
    const handleImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setvideoFile(event.target.files[0])
      }
    }
  const handleClickOpenFormComment = () => {
    setFormOpenUpdateComment(true);
  };

  const handleCloseFormUser = () => {
    setFormOpenUpdateComment(false);
  };
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInfoUser((prevData: any) => ({
          ...prevData,
          [name]: value,
      }));
  };
  const fetchUser = async () => {
    try {
      const response = await userApi.getUserDetail(email)
      console.log(response);
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleUpdateUser = async () => {
    const formData = new FormData();
      formData.append('file', videoFile);
      try {
        const response = await axios.post(`${HTTP_URL_SERVER_NEST}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setInfoUser((prevData) => ({
          ...prevData,
          avatar: response?.data
        }));
        setCallUserApi(true)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  }
  const updateUser = async () => {
    console.log(infoUser);
    if(infoUser.avatar || infoUser.bio || infoUser.fullname){
      try {
        const response = await userApi.updateUser(infoUser)
        setData((prevData: any) => ({
          ...prevData,
          user: response
        }));
        handleCloseFormUser()
        
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }
  useEffect(() => {
    fetchUser()
    if(callUserApi){
      updateUser()
      setCallUserApi(false)
    }
  },[email, callUserApi])
  return (
    <>
      <Navbar/>
      {userCurrent && (
        <Container>
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <br />
            <br />
              <Avatar sx={{ width: '7rem', height: '7rem', borderRadius: '99999px', margin: '0 auto' }} alt={data?.user?.fullname} src={`${HTTP_URL_SERVER_NEST}${data.user.avatar}` || `/static/images/avatar/1.jpg`} />
              {userCurrent?.user?.userId === Number(data.user.id) ? (
                  <span onClick={handleClickOpenFormComment}><BorderColorIcon sx={{ fontSize: 12, marginTop: '-60px', marginLeft: '90px' }}/></span>
                ): null}
              <Dialog open={openFormUpdateUser} onClose={handleCloseFormUser}>
                <DialogContent>
                  <TextField
                    label="Full Name"
                    // value={infoUser.fullname}
                    defaultValue={data.user.fullname}
                    margin="dense"
                    id="name"
                    type="text"
                    name="fullname"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Bio"
                    // value={infoUser.bio}
                    defaultValue={data.user.bio}
                    margin="dense"
                    id="name"
                    type="text"
                    name="bio"
                    fullWidth
                    variant="standard"
                    onChange={handleInputChange}
                  />
                  <Button
                    className='w-full'
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    href="#file-upload"
                  >
                    Upload a new avatar
                    <VisuallyHiddenInput type="file" onChange={handleImageFile} name='thumbnail' />
                  </Button>
                </DialogContent>
                
                <DialogActions>
                  <Button onClick={handleCloseFormUser}>Cancel</Button>
                  <Button onClick={handleUpdateUser}>Update</Button>
                </DialogActions>
              </Dialog>
              <h2 className="text-center text-2xl font-semibold mt-3 capitalize">
                {data.user?.fullname} 
                {userCurrent?.user?.userId === Number(data.user.id) ? (
                  <span onClick={handleClickOpenFormComment}><BorderColorIcon sx={{ fontSize: 12 }}/></span>
                ): null}
              </h2>
              <p className="text-center text-gray-600 mt-1 capitalize">{data.user?.role}</p>
              <div className="flex justify-center mt-5">
                <p className="text-blue-500 hover:text-blue-700 mx-3">Twitter</p>
                <p className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</p>
                <p className="text-blue-500 hover:text-blue-700 mx-3">GitHub</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">
                  {data.user.bio|| '"In code we trust"'}
                  {userCurrent?.user?.userId === Number(data.user.id) ? (
                  <span onClick={handleClickOpenFormComment}><BorderColorIcon sx={{ fontSize: 12 }}/></span>
                ): null}
                </p>
              </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="max-w-lg mx-auto my-5 bg-white rounded-lg shadow-lg border p-5">
              <h5 className="text-start text-xl font-semibold capitalize">Introduce</h5>
              <p className="text-start text-gray-600 mt-1 capitalize">Member of <span className='font-semibold'>CIT Education</span> from {data.user?.createdAt && new Date(data.user.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border p-5">
              <h5 className="text-start text-xl font-semibold capitalize">Blogs</h5>
              {data.blogs.length > 0 ? (
                data.blogs.map((blog: any) => 
                    <Link key={blog.id} to={`/blog/${blog.id}/details`}>
                      <p className="text-start text-[#1976d2] mt-1 capitalize">- {blog.title}</p>
                    </Link>
                  )
              ): (<p className="text-start text-gray-600 mt-1 capitalize">No blogs</p>)}
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            {/* map courses */}
            {/* viết api call mycourse dựa trên email hoặc id user */}
              <div className="max-w-lg mx-auto my-5 bg-white rounded-lg shadow-lg border p-5">
                <h5 className="text-start text-xl font-semibold capitalize">Courses</h5>
                {data.courses.length > 0 ? (
                data.courses.map((course: any) => 
                  <Grid key={course.id} container spacing={2} my={1}>
                    <Grid item md={5} xs={5}>
                      <img className='w-full rounded-md' src={`${HTTP_URL_SERVER_NEST}${course.thumbnail}`} alt="" />
                    </Grid>
                    <Grid item md={7} xs={7}>
                      <p className='text-sm font-medium text-start w-full'>{course.title}</p>
                      <p className='text-xs text-start'>{course.description}</p>
                    </Grid>
                  </Grid>
                  )
              ): (<p className="text-start text-gray-600 mt-1 capitalize">No courses have been attended yet</p>)}
              </div>
          </Grid>
        </Grid>
      </Container>
      )}
      <Footer/>
    </>
  )
}

export default UserDetail
