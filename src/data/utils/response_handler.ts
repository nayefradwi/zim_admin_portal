import type { AxiosResponse } from "axios";
import { ClientError } from "../models/error";
export interface ResponseHandlerData<T> {
    call: () => Promise<T>,
    onSuccess: (data: T) => any | Promise<any>,
    onError: (error: ClientError) => any | Promise<any>,
}
export async function getResponse<T>(
    details: ResponseHandlerData<T>
) {
    const { call, onSuccess, onError } = details;
    try {
        const response = await call();
        const data = handleResponse(response);
        if (data instanceof ClientError) return onError(data);
        return onSuccess(data);
    } catch (error) {
        console.error(error);
        if (error instanceof ClientError) return onError(error);
        return onError(createUnknownErrorResponse());
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


