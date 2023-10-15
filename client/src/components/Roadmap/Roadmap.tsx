import React, { useEffect, useState } from 'react'
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'
import categoryApi from '../../apis/catetoryApi'
import { Link } from 'react-router-dom'
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt'
const Roadmap = () => {
  const [categorys, setCategorys] = useState<any[]>()
  const fetchCategory = async () => {
    try {
      const response = await categoryApi.getCategories()
      setCategorys(response)

    } catch (error) {
        console.error("Error fetching category", error)
    }
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  
  return (
    <>
      <Navbar/>
      <div className='mx-auto container w-full my-10'>
      {categorys?.map(category =>
        // <div key={category.id}>{category.name}</div>
        <div key={category.id} className="text-start mx-auto my-8 relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="image"
              className="h-full w-full object-cover"/>
          </div>
          <div className="p-6">
            <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-[#1976d2] antialiased">
              startups
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {category.name}
            </h4>
            <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Categorized by CIT Education into distinct topics, here are courses designed to guide you on the path to becoming a {category.name} Developer.
            </p>
            <Link to={`/category/${category.id}`} className="inline-block">
              <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-[#1976d2] transition-all hover:bg-[#386ea413] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Learn More <ArrowRightAlt/>
              </button>
            </Link>
          </div>
        </div>
      )}
      </div>
      <Footer/>
    </>
  )
}

export default Roadmap