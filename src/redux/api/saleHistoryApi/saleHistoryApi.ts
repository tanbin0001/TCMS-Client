import { baseApi } from "../baseApi";


const saleHistoryApi = baseApi.injectEndpoints({
  
    endpoints: (builder) => ({
         
        allSales: builder.query({
            query: () => ({
                url: '/sales/all-sales',
                method: 'GET',
            }),
        providesTags:['saleHistory']
        }),
        dailySales: builder.query({
            query: (branch) => {
       
                const queryParams = branch ? `?branch=${branch}` : '';
                return {
                    url: `/sales/daily${queryParams}`,
                    method: 'GET',
                  
                };
            },
        providesTags:['saleHistory']
        }),

        weeklySales: builder.query({
        
            query: (branch) => {
                const queryParams = branch ? `?branch=${branch}` : '';
                return {
                    url: `/sales/weekly${queryParams}`,
                    method: 'GET',
                  
                };
            },
            providesTags:['saleHistory']
        }),

        monthlySales: builder.query({
            query: (branch) => {
                const queryParams = branch ? `?branch=${branch}` : '';
                return {
                    url: `/sales/monthly${queryParams}`,
                    method: 'GET',
                  
                };
            },
            providesTags:['saleHistory']
        }),

        yearlySales: builder.query({
            query: (branch) => {
                const queryParams = branch ? `?branch=${branch}` : '';
                return {
                    url: `/sales/yearly${queryParams}`,
                    method: 'GET',
                  
                };
            },
            providesTags:['saleHistory']
        }),
        saleProduct: builder.mutation({
            query: (productToSale) => {
              return{
                  url: '/sales/sale-product',
                method: "POST",
                body:productToSale
              }
            },
            invalidatesTags:['saleHistory','products']
        }),

    

        
       
    })
})

export const { useAllSalesQuery, useSaleProductMutation, useDailySalesQuery,useWeeklySalesQuery,useMonthlySalesQuery,useYearlySalesQuery} = saleHistoryApi; 