import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-managment-l2-a3.vercel.app/api" }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        addBooks: builder.mutation({
            query: (body)=>({
                url: '',
                method: 'POST',
                body
            })
        })
    })
})


export const {useGetBooksQuery, useAddBooksMutation} = baseApi