import axiosClient from "./axiosClient";

const commentApi = {

  async createCommentForBlog(blogId: number, data: any){ 
    const url = `comment/blog/${blogId}/create`; 
    return axiosClient.post(url, data);  
  },

  async createCommentForLesson(lessonId: number, data: any){ 
    const url = `comment/lesson/${lessonId}/create`; 
    return axiosClient.post(url, data);  
  },

  async updateComment(commentId: number, data: any){ 
    const url = `comment/${commentId}/update`; 
    return axiosClient.put(url, data);  
  },


  async deleteComment(commentId: number){ 
    const url = `comment/${commentId}/delete`; 
    return axiosClient.delete(url);  
  },

  async likeComment(commentId: number){ 
    const url = `comment/${commentId}/like`; 
    return axiosClient.post(url);  
  },

  async unLikeComment(commentId: number){ 
    const url = `comment/${commentId}/unlike`; 
    return axiosClient.delete(url);  
  },

};

export default commentApi;
