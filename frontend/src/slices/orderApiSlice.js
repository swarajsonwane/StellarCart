import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url : `${ORDERS_URL}`,
                method : 'POST',
                body : {...data},
            }),
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url : `${ORDERS_URL}/${id}`,
                method : 'GET',
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url : `${ORDERS_URL}/mine`,
                method : 'GET',
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url : `${ORDERS_URL}`,
                method : 'GET',
            }),
        }),
        updateOrderToDelivered: builder.mutation({
            query: (id) => ({
                url : `${ORDERS_URL}/${id}/deliver`,
                method : 'PUT',
            }),
        }),
        updateOrderToPaid: builder.mutation({
            query: (id) => ({
                url : `${ORDERS_URL}/${id}/pay`,
                method : 'PUT',
            }),
        }),
    }),
});


export const { useCreateOrderMutation , useGetOrderByIdQuery , useGetMyOrdersQuery , useGetOrdersQuery , useUpdateOrderToDeliveredMutation , useUpdateOrderToPaidMutation } = orderApiSlice;