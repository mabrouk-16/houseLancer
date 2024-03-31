import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




const token = localStorage.getItem('token');

const myHeaders ={
    'Content-Type':'application/json',
    Authorization: `FINALITI__${token}`,
}
const baseUrl="https://iti-final-be.onrender.com"
// const baseUrl="http://localhost:3000"
const createRequest = (url, method, body) => ({
    url,
    method,
    headers: myHeaders,
    body: JSON.stringify(body),
});



export const allProjects = createApi({
    reducerPath: 'allProjects',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => createRequest('/project/', 'GET'),
            providesTags:['Projects']
        }),
        projectDetails: builder.query({
            query: ( projectId ) => createRequest(`/project/projectdetails/${projectId}`, 'GET'),
            providesTags: ['Projects']
        }),
        addProject: builder.mutation({
            query: (projectData) => createRequest('project/addproject', 'POST', projectData),
            invalidatesTags: ['Projects']
        }),
        updateProject: builder.mutation({
            query: ({ projectId, updatedData }) => createRequest(`project/updateProject/${projectId}`, 'PUT', updatedData),
            invalidatesTags: ['Projects']
        }),
        userProjects: builder.query({
            query: () => createRequest(`project/userProjects`, 'GET'),
            providesTags:['Projects']
        }),
        deleteProject: builder.mutation({
            query: ( projectId ) => createRequest(`/project/deleteProject/${projectId}`, 'DELETE'),
            invalidatesTags: ['Projects']
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useProjectDetailsQuery,
    useUserProjectsQuery,
    useDeleteProjectMutation
} = allProjects;