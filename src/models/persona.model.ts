import { HttpResponse } from "./http.model";

export interface BasePersona {
  noDocumento: string;
  nombres: string;
  apellidos: string;
}

export interface CreatePersona extends BasePersona {}

export interface UpdatePersona extends BasePersona {
  idPersona: number;
}

export interface DataPersona extends BasePersona {
  idPersona: number;
}

export interface PersonaResponse extends HttpResponse<DataPersona[]> {}

export interface PersonaSlice {
  data: DataPersona[];
  isLoading: boolean;
}

export const InitialStatePersonaSlice: PersonaSlice = {
  data: [],
  isLoading: false,
};
