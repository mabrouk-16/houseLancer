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


export const allChats = createApi({
    reducerPath: 'allChats',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrll }),
    tagTypes: ['Chats'],
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (receiverId) => createRequest(`messages/${receiverId}`, 'GET'),
            providesTags:['Chats']
        }),
        sendMessage: builder.mutation({
            query: ({ receiverId, message }) => createRequest(`messages/sendMessage/${receiverId}`, 'POST', { message }),
            invalidatesTags: ['Chats']
        }),
        sendNotification: builder.mutation({  // Changed from query to mutation
            query: ({ receiverId, notification }) => createRequest(`messages/send/notification`, 'POST', { receiverId, notification }),
            invalidatesTags: ['Chats']
        }),
        getNotification: builder.query({
            query: () => createRequest(`messages/show/notification`, 'GET'),
            providesTags:['Chats']
        }),
    }),
});     

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useSendNotificationMutation  ,
    useGetNotificationQuery
} = allChats;