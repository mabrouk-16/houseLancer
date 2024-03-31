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
            query: () => createRequest(`user/userProfile/`, 'GET'),
            providesTags: ['Users']
        }),
        userProfileId: builder.query({
            query: (userId) => {
                const url = userId ? `user/userProfile/${userId}` : 'user/userProfile';
                return createRequest(url, 'GET');
            },
            providesTags: ['Users']
        }),
        changeUserImage: builder.mutation({
            query: (newImage) => createRequest('user/userImage', 'PUT', { image: newImage }),
            invalidatesTags: ['Users']
        })
    }),
});

export const {
    useUserProfileQuery,
    useUserProfileIdQuery,
    useChangeUserImageMutation // Hook to use the mutation
} = allUsers;