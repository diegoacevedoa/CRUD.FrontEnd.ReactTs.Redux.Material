// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import { personaSlice } from "./persona/persona.slice";

// ** Reducers

export const store = configureStore({
  reducer: { persona: personaSlice.reducer },
});
