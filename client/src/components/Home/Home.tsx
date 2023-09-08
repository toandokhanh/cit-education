// Home.tsx

// import React, { useEffect, useState } from 'react';
// import categoryApi from '../../apis/catetoryApi';
// import { Category } from '../../types/types';
import Footer from '../Layouts/Footer';
import { useUser } from '../Contexts/UserContext';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import { Navigate } from 'react-router-dom';
import Navbar from '../Layouts/Navbar';
import { useEffect, useState } from 'react';
import coursesApi from '../../apis/coursesApi';
import Progress from '../Layouts/Progress';
const Home: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true)
  const [Courses, setCourses] = useState<any[]>([])
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  useEffect(() => {
    const fetchMyCourses = async () => {
      if(user?.isInstructor){
        try {
          const myCourses = await coursesApi.getMyCoursesCreated()
          setCourses(myCourses)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }else{
        try {
            const myCourses = await coursesApi.getMyCoursesRegistered()
            setCourses(myCourses)
            setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
    }
    fetchMyCourses()
  }, [user])
  
  return (
    <>
    {accessToken ? (
      <>
      <Navbar />
      {loading && (<Progress/>)}
      {user?.isInstructor ? (
        <>
        {Courses.map(course => 
        <>
          <div>{course?.title}</div> 
          <div>{course?.lessons.length}</div> 
        </>
        )}
        </>
      ): (
        <>
        {Courses.map(course => 
        <>
          <div>{course?.title}</div> 
          <div>{course?.lessons.length}</div> 
        </>
        )}
        </>
      )}
      <Footer />
      </>
    ) : (
      <Navigate to="/" />
    )}
      
    </>
  );
};

export default Home;
