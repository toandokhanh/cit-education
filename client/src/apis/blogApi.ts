import axiosClient from "./axiosClient";

const blogApi = {

  async getAllBlogs(){ 
    const url = 'blog'; 
    return axiosClient.get(url); 
  },


  async getBlogDetails(blogId: number){ 
    const url = `blog/${blogId}/details`; 
    return axiosClient.get(url); 
  },

  async createBlog(data: any){ 
    const url = `blog/create`; 
    return axiosClient.post(url, data);  
  },

  async updateBlog(blogId: number, data: any){ 
    const url = `blog/${blogId}/update`; 
    return axiosClient.put(url, data);  
  },


  async deleteBlog(blogId: number){ 
    const url = `blog/${blogId}/delete`; 
    return axiosClient.delete(url);  
  },

  async likeBlog(blogId: number){ 
    const url = `blog/${blogId}/like`; 
    return axiosClient.post(url);  
  },

  async unLikeBlog(blogId: number){ 
    const url = `blog/${blogId}/unlike`; 
    return axiosClient.post(url);  
  },

};

export default blogApi;
