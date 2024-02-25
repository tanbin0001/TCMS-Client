import { baseApi } from "../baseApi";


const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyTours: builder.query({
            query: (_id) => ({
                url: '/tour-registration/my-tours',
                method: "GET",  
                params: { _id }  
            })
        }),
        getAllRegisteredTours: builder.query({
            query: () => ({
                url: '/tour-registration/all-tours',
                method: "GET",  
           
            })
        }),
        
           
    })
})

export const {    useGetMyToursQuery,useGetAllRegisteredToursQuery} = usersApi