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
    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `/product/delete-product/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ['products']
    // }),

    // deleteMultipleProducts: builder.mutation({
    //   query: (ids) => ({
    //     url: '/product/delete-multiple-products',
    //     method: "POST",
    //     body: { ids },
    //   }),
    //   invalidatesTags: ['products']
    // }),


  })
})

// export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useDeleteMultipleProductsMutation } = productsApi;
export const {   useCreateTourMutation,useGetAllToursQuery,useUpdateTourMutation } = productsApi;