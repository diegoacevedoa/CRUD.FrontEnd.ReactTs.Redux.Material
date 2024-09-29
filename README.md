CRUD Front End en React, Typescript, Redux y Material UI.

PASOS PARA DESARROLLARLO

1- Crear proyecto con Vite: npm create vite@latest project-name, seleccionamos react y typescript.

2- Nos ubicamos en la carpeta del proyecto: cd project-name

3- Instalamos librerías de nodejs: npm install

4- Ejecutamos proyecto para ver que todo funcione OK: npm run dev

5- Instalamos estilos material: npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid

6- Instalamos componentes estilados de material: npm install @mui/material @mui/styled-engine-sc styled-components

7- Instalamos íconos de material: npm install @mui/icons-material

8- Instalamos fuentes de material: npm install @fontsource/roboto

9- Instalar React Redux y Redux Toolkit: npm install react-redux @reduxjs/toolkit

10- Instalamos sweetalert2 para los mensajes: npm i sweetalert2

11- Eliminamos los archivos index.css, app.css, react.svg y los linkeos a esos archivos, limpiamos archivo App.tsx
y ejecutamos proyecto para ver que todo funcione OK: npm run dev

import PersonaPage from "./pages/Persona"

const App = () => {
  return <PersonaPage />;
};

export default App;

12- Crear variables de entorno afuera de src .env.development y .env.production: VITE_APP_API_URL=http://localhost:3000/api

13- Agregamos archivo .prettierignore afuera de src para evitar formatear el archivo README.md con el listado de pasos:

*.md

14- Agregamos carpeta models en src, creamos el archivo http.model.ts e instalamos librería axios: npm i axios:

import { AxiosRequestConfig } from "axios";

export interface HttpResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface Http {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  cancelRequest(): void;
}

15- Agregamos carpeta utils en src, creamos el archivo regex.util.ts:

export const REGEX_SNAKE_CASE = /^[A-Z0-9_]+$/

16- Agregamos carpeta adapters en src, creamos el archivo http.adapter.ts e instalamos librería humps: npm i humps,
npm i --save-dev @types/humps

import humps, { Camelized } from 'humps'
import { REGEX_SNAKE_CASE } from '../utils/regex.util'

export function httpReponseAdapter<T>(data: T): Camelized<T> {
  return humps.camelizeKeys<T>(data)
}

export function httpRequestAdapter<T>(data: T): T {
  return humps.decamelizeKeys(data, {
    separator: '_',
    process: function (key, convert, options) {
      return REGEX_SNAKE_CASE.test(key) ? key : convert(key, options)
    },
  }) as T
}

17- Agregamos el archivo typeWithKey.model.ts en la carpeta models:

export type TypeWithKey<T> = {
  [key: string]: T;
};

18- Agregamos el archivo messageES.util.ts en la carpeta utils:

export const labels = {
  REQUIRED: "Este campo es obligatorio.",
  UNAUTHORIZED: "Oops! Usted no está autorizado para realizar esta operación. ",
  NETWORKERROR:
    "Oops! Algo salió mal en la red. Estamos trabajando para solucionarlo.",
  INTERNALERROR:
    "Oops! Algo salió realmente mal. Estamos trabajando para solucionarlo.",
  INTERNALERRORCLIENT:
    "Oops! Algo salió mal del lado del cliente. Estamos trabajando para solucionarlo. ",
  INTERNALERRORSERVER:
    "Oops! Algo salió mal del lado del servidor. Estamos trabajando para solucionarlo.",
  INTERNALERRORGATEWAY:
    "Oops! Algo salió mal en el Gateway. Estamos trabajando para solucionarlo.",
};

19- Agregamos el archivo util.util.ts en la carpeta utils:

import { TypeWithKey } from "../models/typeWithKey.model";
import { labels } from "./messageES.util";

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function dateToString(date: Date): string {
  return date.toISOString().toString().slice(0, 10);
}

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    400: labels.INTERNALERRORCLIENT,
    401: labels.UNAUTHORIZED,
    500: labels.INTERNALERRORSERVER,
    502: labels.INTERNALERRORGATEWAY,
    503: labels.NETWORKERROR,
    504: labels.INTERNALERRORGATEWAY,
    ERR_BAD_REQUEST: labels.INTERNALERRORSERVER,
  };

  return codeMatcher[errorCode];
};

20- Agregamos carpeta configs en src, agregamos el archivo snackbarManager.config.ts en la carpeta configs para la popup de notificaciones de errores: npm i notistack

import { useSnackbar, ProviderContext, VariantType } from "notistack";

let useSnackbarRef: ProviderContext;
export const SnackbarUtilitiesConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const snackbarUtilities = {
  toast(message: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(message, { variant });
  },
  success(message: string) {
    this.toast(message, "success");
  },
  error(message: string) {
    this.toast(message, "error");
  },
  info(message: string) {
    this.toast(message, "info");
  },
  warning(message: string) {
    this.toast(message, "warning");
  },
};

21- Creamos el archivo http.config.ts en la carpeta configs:

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Http } from "../models/http.model";
import {
  httpReponseAdapter,
  httpRequestAdapter,
} from "../adapters/http.adapter";
import { getValidationError, isInRange } from "../utils/util.util";
import { snackbarUtilities } from "./snackbarManager.config";
import { labels } from "../utils/messageES.util";

class HttpService implements Http {
  private readonly axiosInstance: AxiosInstance;
  private readonly abortController: AbortController;

  constructor() {
    this.abortController = new AbortController();
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
    });
    this.interceptors();
  }

  private updateHeaderTypeFormData(request: InternalAxiosRequestConfig) {
    const newHeaders = {
      "Content-Type": "multipart/form-data",
      ...request.headers,
    };
    request.headers = newHeaders as AxiosRequestHeaders;
    return request;
  }

  private updateHeaderTypeJson(request: InternalAxiosRequestConfig) {
    request = this.updateHeader(request, {
      "Content-Type": "application/json",
    });
    request.data = httpRequestAdapter(request.data);
    return request;
  }

  private addTokenRequest(request: InternalAxiosRequestConfig) {
    const tokenRow = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const tokenValue = tokenRow ? tokenRow.split("=")[1] : undefined;
    return this.updateHeader(request, {
      Authorization: `Bearer ${tokenValue}`,
    });
  }

  private updateHeader = (
    request: InternalAxiosRequestConfig,
    header: { [key: string]: string }
  ) => {
    const headers = {
      ...request.headers,
      ...header,
    };
    request.headers = headers as AxiosRequestHeaders;
    return request;
  };

  private interceptors() {
    this.axiosInstance.interceptors.request.use(
      (request) => {
        request = this.addTokenRequest(request);
        if (request.url?.includes("assets")) return request;
        if (request.data instanceof FormData)
          return this.updateHeaderTypeFormData(request);
        return this.updateHeaderTypeJson(request);
      },
      (error) => {
        this.errorMessage(error);

        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return {
          ...response,
          data: httpReponseAdapter(response.data),
        };
      },
      (error) => {
        this.errorMessage(error);

        return Promise.reject(error);
      }
    );
  }

  errorMessage(error: any) {
    const status = error.response?.status ?? 503;

    if (isInRange(status, 400, 499)) {
      const message = getValidationError(status);

      if (error.response?.data?.message) {
        snackbarUtilities.warning(error.response?.data?.message ?? "");
      } else {
        if (message) {
          snackbarUtilities.warning(message);
        } else {
          snackbarUtilities.warning(labels.INTERNALERRORCLIENT);
        }
      }
    } else if (isInRange(status, 500, 599)) {
      const message = getValidationError(status);

      if (message) {
        snackbarUtilities.error(message);
      } else {
        snackbarUtilities.error(labels.INTERNALERRORSERVER);
      }
    } else {
      snackbarUtilities.error(labels.INTERNALERROR);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      ...config,
      signal: this.abortController.signal,
    });
    return response as T;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, {
      ...config,
      signal: this.abortController.signal,
    });
    return response as T;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      {
        ...config,
        signal: this.abortController.signal,
      }
    );
    return response as T;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, {
      ...config,
      signal: this.abortController.signal,
    });
    return response as T;
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      {
        ...config,
        signal: this.abortController.signal,
      }
    );
    return response as T;
  }

  cancelRequest() {
    if (!this.abortController.signal.aborted) {
      this.abortController.abort();
    }
  }
}

export default HttpService;

22- Agregamos el archivo api.config.ts en la carpeta configs con las rutas de las apis:

export const API = {
  PERSONA_GET_ALL: "personas",
  PERSONA_CREATE: "personas",
  PERSONA_UPDATE: "personas/{id}",
  PERSONA_DELETE: "personas/{id}",
};

23- Agregamos el archivo persona.model.ts en la carpeta models con los modelos de persona:

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
  id: number;
}

export interface DataResponsePersona extends BasePersona {
  idPersona: number;
}

export interface PersonaResponse extends HttpResponse<DataResponsePersona[]> {}

export interface PersonaSlice {
  data: DataPersona[];
  isLoading: boolean;
}

export const InitialStatePersonaSlice: PersonaSlice = {
  data: [],
  isLoading: false,
};

24- Agregamos la carpeta services y adentro la carpeta persona con el archivo persona.service.ts:

import { API } from "../../configs/api.config";
import HttpService from "../../configs/http.config";
import {
  CreatePersona,
  PersonaResponse,
  UpdatePersona,
} from "../../models/persona.model";

export class PersonaService {
  private http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  async getAllPersonas(): Promise<PersonaResponse> {
    const response = await this.http.get<PersonaResponse>(API.PERSONA_GET_ALL);

    return response;
  }

  async createPersona(dto: CreatePersona): Promise<PersonaResponse> {
    const response = await this.http.post<PersonaResponse>(
      API.PERSONA_CREATE,
      dto
    );

    return response;
  }

  async updatePersona(dto: UpdatePersona): Promise<PersonaResponse> {
    const response = await this.http.put<PersonaResponse>(
      API.PERSONA_UPDATE.replace("{id}", dto.idPersona.toString()),
      dto
    );

    return response;
  }

  async deletePersona(id: number): Promise<PersonaResponse> {
    const response = await this.http.delete<PersonaResponse>(
      API.PERSONA_DELETE.replace("{id}", id.toString())
    );

    return response;
  }
}

25- Creamos carpeta store y adentro la carpeta persona con el archivo persona.thunks.ts que contendrá los thunks de persona con el siguiente código:

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

26- Creamos carpeta store y adentro el archivo persona.slice.ts que contendrá todos los reducers con el siguiente código:

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
            item.id === action.payload.data.id ? action.payload.data : item
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
          data: state.data.filter((item) => item.id !== action.payload.id),
          isLoading: false,
        };
      })
      .addCase(deletePersona.rejected, (state) => {
        return { ...state, isLoading: false };
      });
  },
});

27- Creamos carpeta store y adentro del archivo store.ts que contendrá todos los reducers con el siguiente código:

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


28- El archivo principal (main.tsx) donde queda el store como el proveedor del store queda asi:

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfigurator } from "./configs/snackbarManager.config.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator />
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </StrictMode>
);

29- Agregamos la carpeta components, pages y views en src y agregamos la carpeta persona adentro de views, agregamos las carpetas components y schemas en persona, agregamos el archivo index.tsx y modificamos el archivo App.tsx:

import Persona from "../views/persona";

const PersonaPage = () => {
  return <Persona />;
};

export default PersonaPage;

30- Agregamos adentro de la carpeta components la carpeta table y adentro el archivo Table.tsx:

import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface arrayOfObjects extends Array<{}> {}

interface ITable {
  data: arrayOfObjects;
  columns: GridColDef[];
  isLoading: boolean;
  emptyText?: string;
}

const Table = ({
  data,
  columns,
  isLoading,
  emptyText = "No hay registros para mostrar",
}: ITable) => {
  return (
    <DataGrid
      autoHeight
      rows={data}
      columns={columns}
      loading={isLoading}
      disableRowSelectionOnClick
      disableColumnMenu
      localeText={{
        noRowsLabel: emptyText,
      }}
      sx={{
        "& .MuiDataGrid-footerContainer": {
          justifyContent: "center",
          justifyItems: "flex-end",
          gap: 26,
          lineHeight: 6,
          wordWrap: "break-word",
        },
        "& .MuiDataGrid-row": {
          "&:nth-of-type(2n)": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
        "& .MuiDataGrid-columnHeader": {
          display: "inline-grid",
          justifyContent: "center",
        },
        "& .datagrid-theme-header": {
          backgroundColor: "#E4F2FE",
        },
      }}
    />
  );
};

export default Table;

31- Agregamos adentro de la carpeta table el archivo index.ts:

export { default } from "./Table";

32- 

