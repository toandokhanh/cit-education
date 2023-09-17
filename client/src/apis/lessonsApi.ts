import { Language, Lesson } from "../types/types";
import axiosClient from "./axiosClient";

const lessonsApi = {
  async createLesson(courseId: number,data: Lesson): Promise<any[]> { 
    const url = `${courseId}/lesson`; 
    return axiosClient.post(url, data); 
  },

  async updateSubtitle(data: any): Promise<any[]> { 
    const url = `1/lesson/updatesrtfile`; 
    return axiosClient.post(url, data); 
  },

  async lessonDetail(lessonId: number): Promise<any[]> {
    const url = `${lessonId}/lesson/${lessonId}`
    return axiosClient.get(url)
  }
};

export default lessonsApi;



// http://localhost:3003/:name/updatesrtfile