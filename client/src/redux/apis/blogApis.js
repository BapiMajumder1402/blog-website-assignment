import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: (args, api, extraOptions) => {
    const token = api.getState().auth.accessToken; 
    const baseQuery = fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_URL}`,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    });

    return baseQuery(args, api, extraOptions); 
  },
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ title, page = 1, limit = 10, sortOrder = "asc" }) => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        params.append('page', page);
        params.append('limit', limit);
        params.append('sortOrder', sortOrder);
        return `/blog?${params.toString()}`;
      },
    }),
    
    getSingleBlog: builder.query({
      query: (id) => `/blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    getUserBlogs: builder.query({
      query: () => '/blog/user/blogs',
      providesTags: ['UserBlogs'],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blog',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog', 'UserBlogs'], 
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/blog/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    getUniqueAuthors: builder.query({
      query: () => '/blog/authors',
      providesTags: ['Authors'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useGetUserBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetUniqueAuthorsQuery,
} = blogApi;

export default blogApi;
