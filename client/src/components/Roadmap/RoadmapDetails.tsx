import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import coursesApi from '../../apis/coursesApi'
import { Container, Grid } from '@mui/material'
import ActionAreaCard from '../Courses/ActionAreaCard'
import { HTTP_URL_SERVER_NEST } from '../../constant/constant'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'

const RoadmapDetails = () => {
    const cateId: any = useParams().idCate
    const [courses, setCourses] = useState([])
    const [cate, setcate] = useState<any>()
    const fetchCourses = async () => {
        try {
            const response = await coursesApi.getCoursesBasedOnCate(cateId)
            setCourses(response.courses)
            setcate(response.catetory)
            console.log(response)
        } catch (error) {
            console.error("Error fetching courses", error)
        }
    }
    useEffect(() => {
        fetchCourses()
    }, [cateId])
    return (
        <>
        
        <Navbar/>
        <Container className='mt-12'>
        {courses.length > 0 ? (
          <div>
            <h4 className='text-start text-3xl font-semibold mb-9'>Course related to {cate.name}</h4>
            <Grid container spacing={4}>
            {courses.map((course: any, index) => (
              <Grid item xs={3} mb={3} key={index}>
                <ActionAreaCard
                  thumbnail={HTTP_URL_SERVER_NEST+ course?.thumbnail}
                  title={course?.title}
                  link={'/course/' + course?.id}
                  description={course?.description}
                />
              </Grid>
            ))}
            </Grid>
          </div>
        ): (<h4 className='text-start text-3xl font-semibold mb-[28rem]'>There are no suitable courses yet</h4>)}
        </Container>
        <Footer/>
        
        </>
  )
}

export default RoadmapDetails