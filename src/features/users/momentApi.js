import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const momentApi = createApi({
  reducerPath: 'momentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/users' }),
  tagTypes: ['Moment'],
  endpoints: (builder) => ({
    getMoments: builder.query({
      query: () => 'addmoment',
      providesTags: ['Moment'],
    }),
    addMoment: builder.mutation({
      query: (newMoment) => ({
        url: 'addmoment',
        method: 'POST',
        body: newMoment,
      }),
      invalidatesTags: ['Moment'],
    }),
  }),
});

export const { useGetMomentsQuery, useAddMomentMutation } = momentApi;
