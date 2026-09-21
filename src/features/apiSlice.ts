import customBaseQuery from "@/app/api/customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: [
    // Api'lerin tag'lerini buraya ekleyebilirsin
  ],
  endpoints: () => ({}),
});
export default apiSlice;