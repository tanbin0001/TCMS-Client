import { baseApi } from "../baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userinfo) => ({
                url: '/auth/login',
                method: "POST",
                body: userinfo
            })
        }),
        register: builder.mutation({
            query: (userinfo) => ({
                url: '/auth/register',
                method: "POST",
                body: userinfo
            })
        }),
        // resetPassword: builder.mutation({
        //     query: (newUserInfo: any,token: any) => ({
        //         return{
        //             url: '/auth/reset-password',
        //             method: "POST",
        //             body: newUserInfo,
        //             headers: {
        //                 authorization: `${token}`,
        //                 // "your-custom-header": params.customKey
        //             },
        //         }
              
        //     })
        // }),
        resetPassword: builder.mutation({
            query: (args) => {
                console.log("newUserInfo:", args.newUserInfo);
                console.log("token:", args.token);
        
                return {
                    url: '/auth/reset-password',
                    method: "POST",
                    body: args.newUserInfo,
                    headers: {
                        authorization: `${args.token}`,
                        // "your-custom-header": params.customKey
                    }
                };
            }
        }),
        
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forget-password',
                method: "POST",
                body: email
            })
        }),

        
    })
})

export const { useLoginMutation,useRegisterMutation,useResetPasswordMutation,useForgetPasswordMutation } = authApi