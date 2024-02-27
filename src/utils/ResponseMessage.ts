 

// export const getMessageFromResponse = (response: any) => {
//     console.log('response from ()' ,response);
//     console.log(response);
//     if (response.data.success ||  response.data.statusCode=== 201) {
//         console.log('201 true');
//         return {
//             success: true,
//             message: response.data.message
//         };
//     } else if (response.error.status === 500 && response.data && response.data.errorDetails) {
//         const { errorDetails } = response.data;
//         const errorMessage = errorDetails.issues.map((issue: any) => issue.message).join('. ');
//         return {
//             success: false,
//             message: errorMessage
//         };
//     } else {
//         return {
//             success: false,
//             message: 'something went wrong'
//         };
//     }
// };


export const getMessageFromResponse = (response: any) => {
    console.log('response from ()' ,response);
    console.log(response);
    if (response.data && (response.data.success || response.data.statusCode === 201)) {
        console.log('201 true');
        return {
            success: true,
            message: response.data.message
        };
    } else if (response.error && response.error.status === 500 && response.data && response.data.errorDetails) {
        const { errorDetails } = response.data;
        const errorMessage = errorDetails.issues.map((issue: any) => issue.message).join('. ');
        return {
            success: false,
            message: errorMessage
        };
    } else {
        return {
            success: false,
            message: 'something went wrong'
        };
    }
};
