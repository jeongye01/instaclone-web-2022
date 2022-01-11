import { createSlice,PayloadAction } from '@reduxjs/toolkit';

// 초기 상태 타입
interface UserState {
  isLoggedIn: boolean;
  userData: any;
};

// 액션 Payload 타입
interface LoginPayload {
  email: string;
  password: string;
};

// 초기 상태
//임시로 userData는 null
const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

// 리듀서 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction:(state: UserState, action: PayloadAction<LoginPayload>)=> {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logoutAction:(state: UserState)=> {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = userSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;