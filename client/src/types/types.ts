// types.ts

export interface Category {
  id: number;
  name: string;
}


export interface User{
  userId: number;
  email: string;
  avatart: string;
  fullname: string;
  role: string;
  isInstructor: boolean;
}


export interface RegisterUser{
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  avatar?: string;
  role: string;
}

export interface LoginUser{
  email: string;
  password: string;
}

export interface Algorithm{
  id: number;
  idUnit: string;
  name: string;
}



export interface Language{
  id: number;
  idUnit: string;
  name: string;
}

export interface Course{
  title: string;
  description: string;
  thumbnail: string;
  category: number;
}

export interface Lesson{
  title: string;
  content: string;
  video: string;
  sourceLanguage: string;
  targetLanguage: string;
  algorithm: string;
}