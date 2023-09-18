import { Course } from "../types/types";
import axiosClient from "./axiosClient";

const coursesApi = {
  // lấy ra các khóa học do instructor tạo ra
  async createCourse(data: Course): Promise<[]> { 
    const url = 'course'; 
    return axiosClient.post(url, data); 
  },
  // lấy ra các khóa học do instructor tạo ra
  async getMyCoursesCreated(): Promise<[]> { 
    const url = 'course/v1/me'; 
    return axiosClient.get(url); 
  },

  // lấy ra các khóa học được sinh viên đăng ký
  async getMyCoursesRegistered(): Promise<[]> { 
    const url = 'course/v1/registered'; 
    return axiosClient.get(url); 
  },

  // lấy ra chi tiết khóa học
  async courseDetails(id: any): Promise<any>{
    const url = `course/${id}`
    return axiosClient.get(url); 
  },

  // lấy ra tất cả các khóa học trên hệ thống
  async getAllCourses(): Promise<any[]> {
    const url = 'course'
    return axiosClient.get(url); 
  },

  // update khóa học
  async updateCouse(idCourse: number, data: any) : Promise<any> {
    const url = `course/${idCourse}/update`
    return axiosClient.put(url, data)
  },


  async deleteCouse(idCourse: number) : Promise<any> {
    const url = `course/${idCourse}/delete`
    return axiosClient.delete(url)
  }
};

export default coursesApi;
