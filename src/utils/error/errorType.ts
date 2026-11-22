import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type NormalizedError = FetchBaseQueryError & {
    data: {
        code: string;
        Message: string;
    } & Record<string, unknown>;
};

export interface BackendException {
    code: string;
    createtime: string;
    hostName: string;
    message: string;
    path: string;
}

export interface BackendErrorResponse {
    exception: BackendException;
    status: number;
}