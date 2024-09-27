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
