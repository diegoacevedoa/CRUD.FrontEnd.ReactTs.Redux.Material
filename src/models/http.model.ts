import { AxiosRequestConfig } from "axios";

export interface HttpResponse<T> {
  apiCode: number;
  apiData: T;
  apiError: boolean;
  apiErrors: string;
  apiMessage: string;
}

export interface Http {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  cancelRequest(): void;
}
