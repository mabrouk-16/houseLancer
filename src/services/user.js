import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




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



export const allUsers = createApi({
    reducerPath: 'allUsers',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrll }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        userProfile: builder.query({
            query: (userId) => createRequest(`user/userProfile/${userId}`, 'GET'),
            providesTags:['Users']
        }),
    }),
});

export const {
    useUserProfileQuery,
} = allUsers;