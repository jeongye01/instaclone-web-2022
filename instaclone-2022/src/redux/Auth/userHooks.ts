import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction,logoutAction } from './userSlice';
import { RootState } from "../store";



// 커스텀 훅
export default function useUser() {
  const {isLoggedIn} = useSelector((state: RootState) =>state.user);
  const dispatch = useDispatch();
  
  const login = useCallback((data: any) => {
    dispatch(loginAction(data));
  }, []);
  
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return { isLoggedIn, login, logout };
}
