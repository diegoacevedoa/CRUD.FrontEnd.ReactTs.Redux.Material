import { createAsyncThunk } from "@reduxjs/toolkit";
import { PersonaService } from "../../services/persona/persona.service";
import { CreatePersona, UpdatePersona } from "../../models/persona.model";

export const findAllPersonas = createAsyncThunk(
  "appPersona/findAllPersonas",
  async () => {
    const personaService = new PersonaService();
    const response = await personaService.getAllPersonas();
    return { data: response.apiData };
  }
);

export const addPersona = createAsyncThunk(
  "appPersona/addPersona",
  async (dto: CreatePersona) => {
    const personaService = new PersonaService();
    const response = await personaService.createPersona(dto);
    return { data: response.apiData[0] };
  }
);

export const updatePersona = createAsyncThunk(
  "appPersona/updatePersona",
  async (dto: UpdatePersona) => {
    const personaService = new PersonaService();
    const response = await personaService.updatePersona(dto);
    return { data: dto };
  }
);

export const deletePersona = createAsyncThunk(
  "appPersona/deletePersona",
  async (id: number) => {
    const personaService = new PersonaService();
    const response = await personaService.deletePersona(id);
    return { id };
  }
);
