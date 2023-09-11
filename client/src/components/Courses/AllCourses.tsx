import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import coursesApi from '../../apis/coursesApi'
import { Grid, Container } from '@mui/material'
import ActionAreaCard from './ActionAreaCard'

const AllCourses = () => {
  const [courses, getCourses] = useState<any[]>([])
  useEffect(() => {
    const fetchCourses = async () =>{
      try {
        const response = await coursesApi.getAllCourses();
        console.log(response)
        getCourses(response)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCourses()
  }, [])
  return (
    <>
      <Navbar/>
      <Container className='mt-12'>
        <h4 className='text-start text-3xl font-semibold mb-9'>Courses</h4>
        <Grid container spacing={4}>
          {courses?.map((course) => 
            <Grid xs={3} mb={3} key={course.id}>
              <ActionAreaCard thumbnail={'http://localhost:3003' + course.thumbnail} title={course.title} link={'/course/' + course.id} description={course.description} lengthStudent={course?.students?.length}/>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer/>
    </>
  )
  
}

export default AllCourses