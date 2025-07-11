import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-managment-l2-a3.vercel.app/api" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ['books', 'borrow'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({page,limit}) => `/books?page=${page}&limit=${limit}`,
            providesTags: ['books']
        }),
        getASingleBook: builder.query({
            query: (bookId) => `/books/${bookId}`,
            providesTags: ['books']
        }),
        addBook: builder.mutation({
            query: (data) => ({

                url: '/books',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['books']
        }),
       updateBook: builder.mutation({
            query: ({bookId,updatedBookData}) => ({

                url: `/books/${bookId}`,
                method: 'PUT',
                body: updatedBookData
            }),
            invalidatesTags: ['books']
        }),
       deleteBook: builder.mutation({
            query: (bookId) => ({

                url: `/books/${bookId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['books']
        }),
         borrowBook: builder.mutation({
            query: (data) => ({

                url: '/borrow',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['books', 'borrow']
        }),
         borrowSummary: builder.query({
            query: () => '/borrow',
            providesTags: ['books','borrow']
        }),
    })
})


export const { useGetBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useBorrowSummaryQuery, useGetASingleBookQuery } = baseApi