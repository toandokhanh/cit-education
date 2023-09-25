import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import coursesApi from '../../apis/coursesApi'
import { Grid, Container } from '@mui/material'
import ActionAreaCard from './ActionAreaCard'
import Progress from '../Layouts/Progress'
import { HTTP_URL_SERVER_NEST } from '../../constant/constant'

const AllCourses = () => {
  const [loading, setLoading] = useState(true)
  const [courses, getCourses] = useState<any[]>([])
  useEffect(() => {
    const fetchCourses = async () =>{
      try {
        const response = await coursesApi.getAllCourses();
        getCourses(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])
  return (
    <>
      <Navbar/>
      {loading && (<Progress/>)}
      <Container className='mt-12'>
        <h4 className='text-start text-3xl font-semibold mb-9'>Courses</h4>
        <Grid container spacing={4}>
          {courses?.map((course) => 
            <Grid item xs={3} mb={3} key={course.id}>
              <ActionAreaCard thumbnail={HTTP_URL_SERVER_NEST + course.thumbnail} title={course.title} link={'/course/' + course.id} description={course.description} lengthStudent={course?.students?.length}/>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer/>
    </>
  )
  
}

export default AllCourses