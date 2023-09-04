// types.ts

export interface Category {
  id: number;
  name: string;
}


export interface RegisterUser{
  userId: number;
  email: string;
  avatart: string;
  fullname: string;
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