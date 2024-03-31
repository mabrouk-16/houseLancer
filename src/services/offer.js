import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


import { allProjects } from '../services/api';

const token = localStorage.getItem('token');

const myHeaders ={
    'Content-Type':'application/json',
    Authorization: `FINALITI__${token}`,
}
const baseUrl="https://iti-final-be.onrender.com"
const baseUrll="http://localhost:3000"
const createRequest = (url, method, body) => ({
    url,
    method,
    headers: myHeaders,
    body: JSON.stringify(body),
});



export const allOffers = createApi({
    reducerPath: 'allOffers',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrll }),
    tagTypes: ['Offers'],
    endpoints: (builder) => ({
        getOffers: builder.query({
            query: () => createRequest('/offer/', 'GET'),
            providesTags:['Offers']
        }),
        getProjectOffers: builder.query({
            query: (projectId) => createRequest(`/offer/projectOffer/${projectId}`, 'GET'),
            providesTags: (result, error, projectId) => [{ type: 'Offers', project: projectId }]
        }),
        addOffer: builder.mutation({
            query: (offerData) => createRequest(`/offer/addoffer`, 'POST', offerData),
            invalidatesTags: ['Offers', ...(allProjects.endpoints.projectDetails?.invalidatesTags || [])]
        }),
        updateOffer: builder.mutation({
            query: ({ offerId, updatedData }) => createRequest(`/offer/updateOffer/${offerId}`, 'PUT', updatedData),
            invalidatesTags: ['Offers']
        }),
        getDesignerOffers: builder.query({
            query: () => createRequest('/offer/usersOffers', 'GET'),
            providesTags:['Offers']
        }),
        getOneOffer: builder.query({
            query: (offerId) => createRequest(`/offer/oneOffer/${offerId}`, 'GET'),
            providesTags:['Offers']
        }),
    }),
});

export const {
    useGetOffersQuery,
    useGetProjectOffersQuery,
    useAddOfferMutation,
    useUpdateOfferMutation,
    useGetDesignerOffersQuery,
    useGetOneOfferQuery,
} = allOffers;