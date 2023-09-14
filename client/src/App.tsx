import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Common from './components/Common/Common';
import { UserProvider } from './components/Contexts/UserContext';
import CourseForm from './components/Courses/Instructor/CourseForm';
import CourseDetail from './components/Courses/CourseDetail';
import AllCourses from './components/Courses/AllCourses';
import StepsCreateLesson from './components/Lesson/Instructor/StepsCreateLesson';
import LessonDetail from './components/Lesson/LessonDetail';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Common />} />
            <Route path='/home' element={<Home />} />
            <Route path='/courses' element={<AllCourses />} />
            <Route path='/course/create' element={<CourseForm />} />
            <Route path='/lesson/create' element={<StepsCreateLesson />} />
            <Route path='/lesson/:idLesson/detail' element={<LessonDetail />} />
            <Route path='/course/:idCourse' element={<CourseDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
