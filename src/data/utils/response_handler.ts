import type { AxiosResponse } from "axios";
import { ClientError } from "../models/error";
import toast from "svelte-french-toast";
export interface ResponseHandlerData<T> {
  call: () => Promise<T>;
  onSuccess: (data: T) => any | Promise<any>;
  onError?: (error: ClientError) => any | Promise<any>;
}
export async function getResponse<T>(details: ResponseHandlerData<T>) {
  const { call, onSuccess, onError } = details;
  try {
    const response = await call();
    const data = handleResponse(response);
    if (data instanceof ClientError) throw data;
    return onSuccess(data);
  } catch (error) {
    if (onError == undefined) return;
    if (error instanceof ClientError) {
      toast.error(error.message);
      return onError(error);
    }
    const unknownError = createUnknownErrorResponse();
    toast.error(unknownError.message);
    return onError(unknownError);
  }
}

function handleResponse<T>(data: T): T | ClientError {
  if (data == undefined) return createUnknownErrorResponse();
  if (data == null) return createUnknownErrorResponse();
  return data;
}

function createUnknownErrorResponse(): ClientError {
  return {
    name: "UnknownError",
    message: "Unknown error occurred",
    code: "UNKNOWN_ERROR",
  };
}
