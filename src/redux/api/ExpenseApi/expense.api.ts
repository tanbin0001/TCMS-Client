import { baseApi } from "../baseApi";


const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
       
        getAllExpenses: builder.query({
            query: () => ({
      
              url: '/expense/all-expenses',
              method: "GET",
       
            }),
 
      providesTags:['tours']
          }),
       
        recordExpense: builder.mutation({
            query: (data) => ({
      
              url: '/expense/record-expense',
              method: "POST",
              body: data
            }),
 
      invalidatesTags:['tours']
          }),
           
    })
})

export const {useRecordExpenseMutation,useGetAllExpensesQuery} = usersApi