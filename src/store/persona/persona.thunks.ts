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

    const data: DataPersona = {
      id: response.data.idPersona,
      noDocumento: response.data.noDocumento,
      nombres: response.data.nombres,
      apellidos: response.data.apellidos,
    };

    return { data: data };
  }
);

export const updatePersona = createAsyncThunk(
  "appPersona/updatePersona",
  async (dto: UpdatePersona) => {
    const personaService = new PersonaService();
    await personaService.updatePersona(dto);

    const data: DataPersona = {
      id: dto.idPersona,
      noDocumento: dto.noDocumento,
      nombres: dto.nombres,
      apellidos: dto.apellidos,
    };

    return { data: data };
  }
);

export const deletePersona = createAsyncThunk(
  "appPersona/deletePersona",
  async (id: number) => {
    const personaService = new PersonaService();
    await personaService.deletePersona(id);
    return { id };
  }
);
