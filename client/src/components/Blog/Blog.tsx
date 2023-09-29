import React, { useEffect, useState } from 'react'
import Footer from '../Layouts/Footer'
import Navbar from '../Layouts/Navbar'
import blogApi from '../../apis/blogApi'
import { Container } from '@mui/material'
import BlogItem from './BlogItem'
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Link } from 'react-router-dom'
const Blog = () => {
  const [blogs, setBlogs] = useState<any>([])
  const [searchTerm, setSearchTerm] = React.useState(undefined)
  const fetchBlogs = async () =>{
    try {
      if(searchTerm){
        console.log(searchTerm);
        const response = await blogApi.searchBlogs(searchTerm)
        setBlogs(response)
      }else{
        const response = await blogApi.getAllBlogs()
        setBlogs(response)
      }
    } catch (error) {
      console.error('Error fetching blog', error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [searchTerm])
  
  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Container >
      <br />
      <br />
      <div className='container flex max-w-6xl justify-between py-3 mx-auto'>
        <div>
          <p className="text-3xl text-start font-bold">Featured article</p>
          <p className="text-1xl text-start">Collection of articles sharing experiences of self-learning online programming and web programming techniques.</p>
        </div>
        <Link to='/blog/create' className="group block max-w-[13rem] rounded-lg self-center p-5 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:ring-sky-500">
          <div className="flex items-center space-x-3">
            <NoteAddOutlinedIcon color='primary'/>
            <h3 className="text-slate-900  text-sm font-semibold">New blog</h3>
          </div>
        </Link>
      </div>
      </Container>
      {blogs.map((blog : any) =>
        <BlogItem key={blog.id} blog={blog} setBlogs={setBlogs}/>
      )}
      <Footer/>
    </>
  )
}

export default Blog