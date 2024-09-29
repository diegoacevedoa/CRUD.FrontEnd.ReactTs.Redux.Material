import { HttpResponse } from "./http.model";

export interface BasePersona {
  noDocumento: string;
  nombres: string;
  apellidos: string;
}

export interface CreatePersona extends BasePersona {}

export interface UpdatePersona extends BasePersona {
  id: number;
}

export interface DataPersona extends BasePersona {
  // id: number | null | undefined;
  id: number;
}

export interface DataResponsePersona extends BasePersona {
  idPersona: number;
}

export interface PersonaResponse extends HttpResponse<DataResponsePersona[]> {}

export interface PersonaSlice {
  data: DataPersona[];
  active?: DataPersona | null;
  title: string;
  isNew: boolean;
  show: boolean;
  isLoading: boolean;
}

export const InitialStatePersonaSlice: PersonaSlice = {
  data: [],
  active: null,
  title: "",
  isNew: false,
  show: false,
  isLoading: false,
};
