import type { Axios, AxiosResponse } from "axios";
import { ClientError } from "../../domain/models/error";

export async function getResponse<T>(
    call: () => AxiosResponse<T>,
    successfulCallback: (data: T) => any | Promise<any>,
    errorCallback: (error: ClientError) => any | Promise<any>,
) {
    try {
        const response = await call();
        const data = handleResponse(response);
        if (data instanceof ClientError) return errorCallback(data);
        return successfulCallback(data);
    } catch (error) {
        console.error(error);
        if (error instanceof ClientError) return errorCallback(error);
        return errorCallback(createUnknownErrorResponse());
    }
}

function handleResponse<T>(response: AxiosResponse<T>): T | ClientError {
    if (response.data == undefined) return createUnknownErrorResponse();
    if (response.data == null) return createUnknownErrorResponse();
    return response.data;
}

function createUnknownErrorResponse(): ClientError {
    return {
        name: "UnknownError",
        message: "Unknown error occurred",
        code: "UNKNOWN_ERROR",
    };
}


