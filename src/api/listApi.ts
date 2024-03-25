import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toDoApi } from './toDoApiTest';
import IList from './interfaces/iList';
import { IListPostDto, IListPutDto } from './interfaces/dto';
import { RootState } from '../store/store';


// for test token
let userToken: string | null | undefined = undefined;
toDoApi.getToken()
  .then(result => userToken = result)

 const isTestToken = false;


export const listsApi = createApi({
  reducerPath: 'listsApi',
  tagTypes: ['Lists'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      
    const token = isTestToken? userToken: (getState() as RootState).authSlice;

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (build) => ({

    getLists: build.query<IList[], void>({
      query: () => ({
        url: `/api/List`,

      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(() => ({ type: 'Lists' as const, })),
            { type: 'Lists', id: 'LIST' },
          ]
          : [{ type: 'Lists', id: 'LIST' }],
    }),
    addLists: build.mutation<IList, IListPostDto> ({
      query: (body) => ({
        url: '/api/List',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lists', id: 'LIST' }]
    }),
    deleteLists: build.mutation<IList, string>({
      query: (id) => ({
        url: `/api/List/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Lists', id: 'LIST' }]
    }),
    updateList: build.mutation<IList, IListPutDto>({
      query: (post) => ({
        url: '/api/List',
        method: 'PUT',
        body: post
      }),
      invalidatesTags: [{ type: 'Lists', id: 'LIST' }]
    }),
  })
});

export const { useGetListsQuery, useAddListsMutation, useDeleteListsMutation, useUpdateListMutation } = listsApi;