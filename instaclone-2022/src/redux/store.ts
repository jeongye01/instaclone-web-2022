
// store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import user from "./Auth/userSlice";


export const store = configureStore({ 
  reducer: {
    user
  },
 
});

console.log(user);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


