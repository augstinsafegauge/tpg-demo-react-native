import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATS_API_KEY} from '@env';

const BASE_URL = "https://api.thecatapi.com/v1/";

interface CatPhoto {
  id: string;
  url: string;
}

export const apiSlice =createApi({
  reducerPath: 'api',
  baseQuery : fetchBaseQuery({baseUrl:BASE_URL,
    prepareHeaders(headers){
      headers.set('x-api-key', CATS_API_KEY);
      return headers;
    }
  }),
  endpoints(builder){
    return {
      fetchRandomCatsPhotos: builder.query<CatPhoto[],number |void>({
        query: (limit=20) => `images/search?limit=${limit}`,
      }),
fetchUploadedCatsPhotos: builder.query<CatPhoto[], void>({
        query: () => 'images/?limit=20',
      }),

      deleteCatPhoto: builder.mutation<void, string>({
        query: (id) => ({
          url: `images/${id}`,
          method: 'DELETE',
        }),
      }),


      uploadCatsPhoto: builder.mutation<CatPhoto, FormData>({
        query: (formData) => ({   
          url: 'images/upload',
          method: 'POST',
          body: formData,
        }),
       
      }),
    };

    


  },
});

export const {useFetchRandomCatsPhotosQuery, useFetchUploadedCatsPhotosQuery, useDeleteCatPhotoMutation,useUploadCatsPhotoMutation } = apiSlice;