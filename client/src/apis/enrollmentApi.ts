import axiosClient from "./axiosClient";

const enrollmentApi = {
  async checkUserEnrollment(courseId: number): Promise<any[]> { 
    const url = `enrollment/${courseId}`; 
    return axiosClient.get(url); 
  },


  async updateLessonIdForUser(courseId: number, lessonId: number): Promise<any[]> { 
    const url = `enrollment/${courseId}/${lessonId}`; 
    return axiosClient.put(url); 
  },
};

export default enrollmentApi;
