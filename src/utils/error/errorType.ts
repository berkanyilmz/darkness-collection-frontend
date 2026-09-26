import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type NormalizedError = FetchBaseQueryError & {
    data: {
        Message: string;
    } & Record<string, unknown>;
};