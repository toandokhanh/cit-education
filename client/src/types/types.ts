// types.ts

export interface Category {
  id: number;
  name: string;
  // Add other properties as needed
}


export interface User{
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
  gender: string;
}