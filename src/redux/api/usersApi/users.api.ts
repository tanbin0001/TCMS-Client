import { baseApi } from "../baseApi";


const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
              
              return {
                url: `/auth/users`,
                method: "GET",
              };
            },
            providesTags:['users']
          }),
           
    })
})

export const {  useGetUsersQuery } = usersApi