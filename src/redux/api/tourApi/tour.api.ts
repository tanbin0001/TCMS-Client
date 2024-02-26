import { baseApi } from "../baseApi";


const productsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    getAllTours: builder.query({
      query: (filters) => {
      
        return {
          url: `/tour/tours`,
          method: "GET",
        };
      },
      providesTags: ['tours']
    }),

    createTour: builder.mutation({
      query: (data) => ({

        url: '/tour/create-tour',
        method: "POST",
        body: data
      }),
      invalidatesTags: ['tours']

    }),
    updateTour: builder.mutation({
      query: ({ tourInfo, _id }) => {
       
        return {
          url: `/tour/update-tour/${_id}`,
          method: "PATCH",
          body: tourInfo,
        };
      },
      invalidatesTags: ['tours']
    }),
    deleteTour: builder.mutation({
      query: (_id) => ({
        url: `/tour/delete-tour/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['tours']
    }),

     


  })
})

 export const {   useCreateTourMutation,useGetAllToursQuery,useUpdateTourMutation,useDeleteTourMutation } = productsApi;