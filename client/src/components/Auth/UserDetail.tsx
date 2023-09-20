import React, { useEffect , useState} from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { useParams } from 'react-router-dom'
import userApi from '../../apis/userApi'
import { Avatar, Container, Grid } from '@mui/material'

const UserDetail = () => {
  const email: any = useParams().email
  const [user, setUser] = useState<any>()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getUserDetail(email)
        setUser(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  },[email])

  return (
    <>
      <Navbar/>
      <Container>
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <br />
            <br />
              <Avatar sx={{ width: '7rem', height: '7rem', borderRadius: '99999px', margin: '0 auto' }} alt={user?.fullname} src="/static/images/avatar/1.jpg" />
              <h2 className="text-center text-2xl font-semibold mt-3 capitalize">{user?.fullname}</h2>
              <p className="text-center text-gray-600 mt-1 capitalize">{user?.role}</p>
              <div className="flex justify-center mt-5">
                <p className="text-blue-500 hover:text-blue-700 mx-3">Twitter</p>
                <p className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</p>
                <p className="text-blue-500 hover:text-blue-700 mx-3">GitHub</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">"In code we trust"</p>
              </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="max-w-lg mx-auto my-5 bg-white rounded-lg shadow-lg border p-5">
              <h5 className="text-start text-xl font-semibold capitalize">Introduce</h5>
              <p className="text-start text-gray-600 mt-1 capitalize">Member of <span className='font-semibold'>CIT Education</span> from {user?.createdAt && new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border p-5">
              <h5 className="text-start text-xl font-semibold capitalize">Recent activity</h5>
              <p className="text-start text-gray-600 mt-1 capitalize">No recent activity</p>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            {/* map courses */}
            {/* viết api call mycourse dựa trên email hoặc id user */}
              <div className="max-w-lg mx-auto my-5 bg-white rounded-lg shadow-lg border p-5">
                <h5 className="text-start text-xl font-semibold capitalize">My Courses</h5>
                <p className="text-start text-gray-600 mt-1 capitalize">No courses have been attended yet</p>
              </div>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  )
}

export default UserDetail
