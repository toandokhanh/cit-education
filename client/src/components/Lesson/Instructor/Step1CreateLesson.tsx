import React, { useEffect, useState } from 'react'
import coursesApi from '../../../apis/coursesApi'
import { MenuItem, TextField, makeStyles } from '@mui/material'

const Step1CreateLesson = ({courseId, getCourseId} : any) => {
    const [courses, getCourses] = useState<any[]>([]);
    useEffect(() => {
        const fetchCourses = async () =>{
        try {
            const response: any = await coursesApi.getMyCoursesCreated();
            getCourses(response)
            getCourseId(response[0]?.id)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        }
        fetchCourses()
    }, [])

  return (
    <select
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 "
        id="standard-select-currency"
        value={courseId}
        name="course"
        onChange={(e) => getCourseId(e.target.value)}
        required
        >
        {/* <option value="" disabled>
            Please select your course
        </option> */}
        {courses?.map((option) => (
            <option key={option?.id} value={option?.id}>
            {option?.title}
            </option>
        ))}
    </select>

  )
}

export default Step1CreateLesson