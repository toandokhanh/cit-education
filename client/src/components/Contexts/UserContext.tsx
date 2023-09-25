import React, { createContext, useContext, ReactNode, useEffect, useReducer } from 'react';
import { User } from '../../types/types';
import userApi from '../../apis/userApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../constant/constant';
import setAuthToken from '../utils/SetAuthToken';
import userReducer from '../reducers/authReducer';
interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  loginUser: (userForm: any) => Promise<void>;
  logoutUser: () => Promise<void>;
}
// Khởi tạo trạng thái mặc định của reducer

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Sử dụng useReducer để quản lý trạng thái người dùng
  const [state, dispatch] = useReducer(userReducer, {user: null});

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
      try {
        const response = await userApi.getMyAccount();
        if (response.role === 'instructor') {
          response.isInstructor = true;
        } else if (response.role === 'student'){
          response.isInstructor = false;
        }else{
          response.isInstructor = false;
        }
        dispatch({ type: 'SET_USER', payload: response });
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        console.error('Error fetching user:', error);
      }
    }
    
  };

  useEffect(() => {
    const fetchUser = async () => {
      await loadUser();
    }
    fetchUser();
  }, []);
  // handle Login
  const loginUser = async (userForm: any) => {
    try {
      const response = await userApi.login(userForm)
      if (response) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken);
      }
      await loadUser()
    } catch (error: any) {
      console.error('Error fetching user:', error);
    }
  };
  // handle logout
  const logoutUser = async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({ type: 'CLEAR_USER'});
    await loadUser();
  };
  return (
    <UserContext.Provider value={{ user: state.user, setUser: (user) => dispatch({ type: 'SET_USER', payload: user }), loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
