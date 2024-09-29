import { createAsyncThunk } from "@reduxjs/toolkit";
import { PersonaService } from "../../services/persona/persona.service";
import {
  CreatePersona,
  DataPersona,
  UpdatePersona,
} from "../../models/persona.model";

export const findAllPersonas = createAsyncThunk(
  "appPersona/findAllPersonas",
  async () => {
    const personaService = new PersonaService();
    const response = await personaService.getAllPersonas();

    const data: DataPersona[] = response.data.map((item) => {
      return {
        id: item.idPersona,
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      };
    });

    return { data: data };
  }
);

export const addPersona = createAsyncThunk(
  "appPersona/addPersona",
  async (dto: CreatePersona) => {
    const personaService = new PersonaService();
    const response = await personaService.createPersona(dto);

    const data: DataPersona[] = response.data.map((item) => {
      return {
        id: item.idPersona,
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      };
    });

    return { data: data[0] };
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
