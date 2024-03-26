import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toDoApi } from './toDoApiTest';
import IItem from './interfaces/iItem';
import { IItemsPostDto, IItemsPutDto } from './interfaces/dto';
import { RootState } from '../store/store';
import {isTest} from "../auth_config";


// for test token
let userToken: string | null | undefined = undefined;
toDoApi.getToken()
  .then(result => userToken = result)



export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      
      const token = isTest? userToken: (getState() as RootState).authSlice;

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (build) => ({

    getItems: build.query<IItem[], string>({
      query: (id) => ({
        url: `/api/Item?listId=${id}`,

      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(() => ({ type: 'Items' as const, })),
            { type: 'Items', id: 'ITEM' },
          ]
          : [{ type: 'Items', id: 'ITEM' }],
    }),
    addItems: build.mutation<IItem, IItemsPostDto> ({
      query: (body) => ({
        url: '/api/Item',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Items', id: 'ITEM' }]
    }),
    deleteItems: build.mutation<IItem, string>({
      query: (id) => ({
        url: `/api/Item/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Items', id: 'ITEM' }]
    }),
    updateItems: build.mutation<IItem, IItemsPutDto>({
      query: (post) => ({
        url: '/api/Item',
        method: 'PUT',
        body: post
      }),
      invalidatesTags: [{ type: 'Items', id: 'ITEM' }]
    }),
  })
});

export const { useGetItemsQuery, useAddItemsMutation, useDeleteItemsMutation, useUpdateItemsMutation } = itemsApi;