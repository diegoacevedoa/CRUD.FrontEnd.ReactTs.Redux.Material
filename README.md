CRUD Front End en React, Typescript, Redux y Material UI.

PASOS PARA DESARROLLARLO

1- Crear proyecto con Vite: npm create vite@latest project-name, seleccionamos react y typescript.

2- Nos ubicamos en la carpeta del proyecto: cd project-name

3- Instalamos librerías de nodejs: npm install

4- Ejecutamos proyecto para ver que todo funcione OK: npm run dev

5- Instalamos estilos material: npm install @mui/material @emotion/react @emotion/styled

6- Instalamos componentes estilados de material: npm install @mui/material @mui/styled-engine-sc styled-components

7- Instalamos íconos de material: npm install @mui/icons-material

8- Instalamos fuentes de material: npm install @fontsource/roboto

9- Instalar React Redux y Redux Toolkit: npm install react-redux @reduxjs/toolkit

10- Instalamos sweetalert2 para los mensajes: npm i sweetalert2

11- Eliminamos los archivos index.css, app.css, react.svg y los linkeos a esos archivos, limpiamos archivo App.tsx
y ejecutamos proyecto para ver que todo funcione OK: npm run dev

const App = () => {
return (

<div>
HOLA
</div>
)
}

export default App

12- Crear variables de entorno en src .env.development y .env.production: VITE_APP_API_URL=http://localhost:3000/api

13- Agregamos carpeta models en src, creamos el archivo http.model.ts e instalamos librería axios: npm i axios:

import { AxiosRequestConfig } from 'axios'

export interface HttpResponse<T> {
data: T
message: string
status: string
loading?: boolean
}

export interface Http {
get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
cancelRequest(): void
}

14- Agregamos carpeta utils en src, creamos el archivo regex.util.ts, tener en cuenta cambiar el signo asterisco
de la fórmula por un guión bajo:

export const REGEX_SNAKE_CASE = /^[A-Z0-9*]+$/

15- Agregamos carpeta adapters en src, creamos el archivo http.adapter.ts e instalamos librería humps, tener en cuenta de eliminar el signo (\) en el código: npm i humps,
npm i --save-dev @types/humps

import humps, { Camelized } from 'humps'
import { REGEX_SNAKE_CASE } from '../utils/regex.util'

export function httpReponseAdapter<T>(data: T): Camelized<T> {
return humps.camelizeKeys<T>(data)
}

export function httpRequestAdapter<T>(data: T): T {
return humps.decamelizeKeys(data, {
separator: '\_',
process: function (key, convert, options) {
return REGEX_SNAKE_CASE.test(key) ? key : convert(key, options)
},
}) as T
}

16- Agregamos el archivo typeWithKey.model.ts en la carpeta models:

export type TypeWithKey<T> = {
[key: string]: T
}

17- Agregamos el archivo messageES.util.ts en la carpeta utils:

export const labels = {
REQUIRED: 'Este campo es obligatorio.',
UNAUTHORIZED: 'Oops! Usted no está autorizado para realizar esta operación. ',
NETWORKERROR: 'Oops! Algo salió mal en la red. Estamos trabajando para solucionarlo.',
INTERNALERROR: 'Oops! Algo salió realmente mal. Estamos trabajando para solucionarlo.',
INTERNALERRORCLIENT: 'Oops! Algo salió mal del lado del cliente. Estamos trabajando para solucionarlo. ',
INTERNALERRORSERVER: 'Oops! Algo salió mal del lado del servidor. Estamos trabajando para solucionarlo.',
INTERNALERRORGATEWAY: 'Oops! Algo salió mal en el Gateway. Estamos trabajando para solucionarlo.'
}

18- Agregamos el archivo util.util.ts en la carpeta utils:

import { TypeWithKey } from "../models/typeWithKey.model"
import { labels } from "./messageES.util"

export function isInRange(value: number, min: number, max: number): boolean {
return value >= min && value <= max
}

export function dateToString(date: Date): string {
return date.toISOString().toString().slice(0, 10)
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
}

    return codeMatcher[errorCode]

}

19- Agregamos carpeta configs en src, agregamos el archivo snackbarManager.config.ts en la carpeta configs para la popup de notificaciones de errores: npm i notistack

import { useSnackbar, ProviderContext, VariantType } from 'notistack'

let useSnackbarRef: ProviderContext
export const SnackbarUtilitiesConfigurator = () => {
useSnackbarRef = useSnackbar()
return null
}

export const snackbarUtilities = {
toast(message: string, variant: VariantType = 'default') {
useSnackbarRef.enqueueSnackbar(message, { variant })
},
success(message: string) {
this.toast(message, 'success')
},
error(message: string) {
this.toast(message, 'error')
},
info(message: string) {
this.toast(message, 'info')
},
warning(message: string) {
this.toast(message, 'warning')
},
}

20- Creamos el archivo http.config.ts en la carpeta configs:

import axios, {
AxiosInstance,
AxiosRequestConfig,
AxiosRequestHeaders,
AxiosResponse,
InternalAxiosRequestConfig,
} from 'axios'
import { Http } from '../models/http.model'
import { httpReponseAdapter, httpRequestAdapter } from '../adapters/http.adapter'
import { getValidationError, isInRange } from '../utils/util.util'
import { snackbarUtilities } from './snackbarManager.config'
import { labels } from '../utils/messageES.util'

class HttpService implements Http {
private readonly axiosInstance: AxiosInstance
private readonly abortController: AbortController

constructor() {
this.abortController = new AbortController()
this.axiosInstance = axios.create({
baseURL: import.meta.env.VITE_APP_API_URL,
})
this.interceptors()
}

private updateHeaderTypeFormData(request: InternalAxiosRequestConfig) {
const newHeaders = {
'Content-Type': 'multipart/form-data',
...request.headers,
}
request.headers = newHeaders as AxiosRequestHeaders
return request
}

private updateHeaderTypeJson(request: InternalAxiosRequestConfig) {
request = this.updateHeader(request, {
'Content-Type': 'application/json',
})
request.data = httpRequestAdapter(request.data)
return request
}

private addTokenRequest(request: InternalAxiosRequestConfig) {
const tokenRow = document.cookie
.split('; ')
.find((row) => row.startsWith('token='))
const tokenValue = tokenRow ? tokenRow.split('=')[1] : undefined
return this.updateHeader(request, {
Authorization: `Bearer ${tokenValue}`,
})
}

private updateHeader = (
request: InternalAxiosRequestConfig,
header: { [key: string]: string },
) => {
const headers = {
...request.headers,
...header,
}
request.headers = headers as AxiosRequestHeaders
return request
}

private interceptors() {
this.axiosInstance.interceptors.request.use(
(request) => {
request = this.addTokenRequest(request)
if (request.url?.includes('assets')) return request
if (request.data instanceof FormData)
return this.updateHeaderTypeFormData(request)
return this.updateHeaderTypeJson(request)
},
error => {
this.errorMessage(error)

        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return {
          ...response,
          data: httpReponseAdapter(response.data),
        }
      },
      error => {
        this.errorMessage(error)

        return Promise.reject(error)
      }
    )

}

errorMessage(error: any) {
const status = error.response?.status ?? 503

      if (isInRange(status, 400, 499)) {
        const message = getValidationError(status)

        if (error.response?.data?.message) {
          snackbarUtilities.warning(error.response?.data?.message ?? '')
        } else {
          if (message) {
            snackbarUtilities.warning(message)
          } else {
            snackbarUtilities.warning(labels.INTERNALERRORCLIENT)
          }
        }
      } else if (isInRange(status, 500, 599)) {
        const message = getValidationError(status)

        if (message) {
          snackbarUtilities.error(message)
        } else {
          snackbarUtilities.error(labels.INTERNALERRORSERVER)
        }
      } else {
        snackbarUtilities.error(labels.INTERNALERROR)
      }

}

async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
...config,
signal: this.abortController.signal,
})
return response.data as T
}

async put<T>(
url: string,
data: any,
config?: AxiosRequestConfig,
): Promise<T> {
const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, {
...config,
signal: this.abortController.signal,
})
return response.data as T
}

async post<T>(
url: string,
data: any,
config?: AxiosRequestConfig,
): Promise<T> {
const response: AxiosResponse<T> = await this.axiosInstance.post(
url,
data,
{
...config,
signal: this.abortController.signal,
},
)
return response.data as T
}

async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
const response: AxiosResponse<T> = await this.axiosInstance.delete(url, {
...config,
signal: this.abortController.signal,
})
return response.data as T
}

async patch<T>(
url: string,
data: any,
config?: AxiosRequestConfig,
): Promise<T> {
const response: AxiosResponse<T> = await this.axiosInstance.patch(
url,
data,
{
...config,
signal: this.abortController.signal,
},
)
return response.data as T
}

cancelRequest() {
if (!this.abortController.signal.aborted) {
this.abortController.abort()
}
}
}

export default HttpService

21- Agregamos la carpeta services y adentro la carpeta persona con el archivo persona.ts

22- Creamos carpeta store y adentro del archivo store.tsx que contendrá todos los reducers con el siguiente código:

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
reducer: { }, });

23- El archivo principal (main.tsx) donde queda el store como el proveedor del store queda asi:

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilitiesConfigurator } from './configs/snackbarManager.config.ts';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<StrictMode>
<SnackbarProvider>
<SnackbarUtilitiesConfigurator />
<Provider store={store}>
<App />
</Provider>
</SnackbarProvider>
</StrictMode>,
)

24- Agregamos la caperta persona en la carpeta store y adentro creamos los archivos: personaSlice.ts,
personaThunks.ts y index.ts

25-
