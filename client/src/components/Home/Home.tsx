// Home.tsx

import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/Instructor/Navbar';
import categoryApi from '../../apis/catetoryApi';
import { Category } from '../../types/types';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getCategories();
        setCategories(response);
        console.log(response)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
