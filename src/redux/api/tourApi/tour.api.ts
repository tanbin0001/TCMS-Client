import { baseApi } from "../baseApi";


const productsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    // getProducts: builder.query({
    //   query: (filters) => {
    //     if ('minPrice' in filters && 'maxPrice' in filters) {
    //       return {
    //         url: `/product/all-products?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`,

    //         method: "GET",
    //       };
    //     }
    //     return {
    //       url: `/product/all-products?${new URLSearchParams(filters).toString()}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ['products']
    // }),

    createTour: builder.mutation({
      query: (data) => ({

        url: '/tour/create-tour',
        method: "POST",
        body: data
      }),
      invalidatesTags: ['tours']

    }),
    // updateProduct: builder.mutation({
    //   query: ({ productInfo, _id }) => {
    //     return {
    //       url: `/product/update-product/${_id}`,
    //       method: "PATCH",
    //       body: productInfo,
    //     };
    //   },
    //   invalidatesTags: ['products']
    // }),
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
export const {   useCreateTourMutation } = productsApi;