import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['books']
        }),
        addBook: builder.mutation({
            query: (data)=>({
            
                url: '/books',
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['books']
        })
    })
})


export const {useGetBooksQuery, useAddBookMutation} = baseApi