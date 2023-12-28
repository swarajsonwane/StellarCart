import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({   // login mutation instead of query because we are sending data to the backend
            query: (data) => ({
                url : `${USERS_URL}/auth`,
                method : 'POST',
                body : data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url : `${USERS_URL}`,
                method : 'POST',
                body : data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url : `${USERS_URL}/logout`,
                method : 'POST',
            }),
        }),
        
    }),
});

export const { useLoginMutation , useLogoutMutation , useRegisterMutation } = usersApiSlice;