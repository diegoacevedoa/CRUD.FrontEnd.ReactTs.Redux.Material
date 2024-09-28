import { createSlice } from "@reduxjs/toolkit";
import {
  addPersona,
  deletePersona,
  findAllPersonas,
  updatePersona,
} from "./persona.thunks";
import { InitialStatePersonaSlice } from "../../models/persona.model";

export const personaSlice = createSlice({
  name: "persona",
  initialState: InitialStatePersonaSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllPersonas.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(findAllPersonas.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.data,
          isLoading: false,
        };
      })
      .addCase(findAllPersonas.rejected, (state) => {
        return { ...state, isLoading: false };
      })
      .addCase(addPersona.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(addPersona.fulfilled, (state, action) => {
        return {
          ...state,
          data: [...state.data, action.payload.data],
          isLoading: false,
        };
      })
      .addCase(addPersona.rejected, (state) => {
        return { ...state, isLoading: false };
      })
      .addCase(updatePersona.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(updatePersona.fulfilled, (state, action) => {
        return {
          ...state,
          data: state.data.map((item) =>
            item.idPersona === action.payload.data.idPersona
              ? action.payload.data
              : item
          ),
          isLoading: false,
        };
      })
      .addCase(updatePersona.rejected, (state) => {
        return { ...state, isLoading: false };
      })
      .addCase(deletePersona.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(deletePersona.fulfilled, (state, action) => {
        return {
          ...state,
          data: state.data.filter(
            (item) => item.idPersona !== action.payload.id
          ),
          isLoading: false,
        };
      })
      .addCase(deletePersona.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});
