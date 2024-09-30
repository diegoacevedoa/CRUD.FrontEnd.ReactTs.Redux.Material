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
