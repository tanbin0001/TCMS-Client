import { baseApi } from "../baseApi";


const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyTours: builder.query({
            query: (_id) => ({
                url: '/tour-registration/my-tours',
                method: "GET",  
                params: { _id }  
            }),
 providesTags:['tours']
        }),
        getAllRegisteredTours: builder.query({
            query: () => ({
                url: '/tour-registration/all-tours',
                method: "GET",  
           
            }),
            providesTags:['tours']
        }),
        registerTour: builder.mutation({
            query: (data) => ({
      
              url: '/tour-registration/register-tour',
              method: "POST",
              body: data
            }),
            invalidatesTags: ['tours']
      
          }),
           
    })
})

export const {    useGetMyToursQuery,useGetAllRegisteredToursQuery,useRegisterTourMutation} = usersApi