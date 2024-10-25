import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentsApi = createApi({
  reducerPath: 'commentsApi',
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

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        method: 'DELETE',
      }),
    }),

    createComment: builder.mutation({
      query: ({ blogId, content }) => ({
        url: '/comment',
        method: 'POST',
        body: { blogId, content },
      }),
    }),

    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `/comment/${commentId}`,
        method: 'PUT',
        body: { content },
      }),
    }),
  }),
});


export const {
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation  
} = commentsApi;

export default commentsApi;
