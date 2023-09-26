import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Common from './components/Common/Common';
import { UserProvider } from './components/Contexts/UserContext';
import CourseDetail from './components/Courses/CourseDetail';
import StepsCreateLesson from './components/Lesson/Instructor/StepsCreateLesson';
import LessonDetail from './components/Lesson/LessonDetail';
import About from './components/About/About';
import MyCourseDetail from './components/Courses/MyCourseDetail';
import UserDetail from './components/Auth/UserDetail';
import AllCourses from './components/Courses/AllCourses';
import Blog from './components/Blog/Blog';
import BlogDetails from './components/Blog/BlogDetails';
import CreateBlog from './components/Blog/CreateBlog';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Common />} /> */}
            <Route path='/' element={<Common />} />
            <Route path='/home' element={<Home />} />
            <Route path='/courses' element={<AllCourses />} />
            <Route path='/lesson/create' element={<StepsCreateLesson />} />
            <Route path='/course/:idCourse/lesson/:idLesson/detail' element={<LessonDetail />} />
            <Route path='/course/:idCourse' element={<CourseDetail />} />
            <Route path='/myCourses/:idCourse' element={<MyCourseDetail />} />
            <Route path='/user/:email' element={<UserDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:idBlog/details' element={<BlogDetails />} />
            <Route path='/blog/create' element={<CreateBlog />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
