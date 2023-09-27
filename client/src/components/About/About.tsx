import React from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import { Container, Grid } from '@mui/material'

const About = () => {
  return (
    <>
      <Navbar/>
      <Container className='text-start my-10'>
        <p className='text-2xl font-semibold '>About Us</p>
        <br />
        <p>Welcome to our "About Us" page! Here, we want to share our mission and vision for our educational website.</p>
        <br />
        <p>We believe that sharing knowledge and learning is an integral part of everyone's life. Our website is created with the goal of providing you with the best online learning environment, where you can explore and master new knowledge easily and enjoyably.</p>
        <br />
        <p>Our vision is to create a diverse and stylish learning community where everyone can access courses from top experts in various fields. We hope that learning becomes more exciting and convenient than ever before.</p>
        <br />
        <p>Join us on this learning journey and skill development. If you have any suggestions or questions, please don't hesitate to contact us. We look forward to connecting with you and supporting you in your learning journey.</p>
        <br />
        <p>Thank you for being a part of our community, and we're excited to be a part of your growth.</p>
        <br />
        <p>Sincerely,</p>
        <p>CIT Education</p>
      </Container>

      <Footer/>
    </>
  )
}

export default About