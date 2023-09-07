// Home.tsx

// import React, { useEffect, useState } from 'react';
// import categoryApi from '../../apis/catetoryApi';
// import { Category } from '../../types/types';
import Footer from '../Layouts/Footer';
import { useUser } from '../Contexts/UserContext';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import { Navigate } from 'react-router-dom';
import Navbar from '../Layouts/Navbar';

const Home: React.FC = () => {
  const { user } = useUser();
  const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  return (
    <>
    {accessToken ? (
      <>
      {user?.isInstructor ? (
        <>
        <Navbar />
        {/* đưa component giảng viên vào */}
        <div>Vai trò giảng viên: {user?.role}</div> 
        <div>Show các khóa học giảng viên đã tạo ra</div> 
        <Footer />
        </>
      ): (
        <>
        <Navbar />
        {/* đưa component sinh viên vào */}
        <div>Vai trò sinh viên: {user?.role}</div>
        <div>Show các khóa học sinh viên đã đăng ký</div> 
        <Footer />
        </>
      )}
        
      </>
    ) : (
      <Navigate to="/" />
    )}
      
    </>
  );
};

export default Home;
