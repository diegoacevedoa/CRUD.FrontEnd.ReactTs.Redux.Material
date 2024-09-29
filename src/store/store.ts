// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import { personaSlice } from "./persona/persona.slice";

export const store = configureStore({
  reducer: { persona: personaSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
