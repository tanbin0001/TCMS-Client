// import { useState } from "react";
// import { Button, DatePicker, Input, Row, Select } from "antd";
// import CustomForm from "../../components/form/CustomForm";
// import CustomSelect from "../../components/form/CustomSelect";
// import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";
// import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
// import CustomDatePicker from "../../components/form/CustomDatePicker";
// import { useGetMyToursQuery } from "../../redux/api/RegisterTourApi/registerTour.api";
// import { selectCurrentUser } from "../../redux/features/authSlice";
// import { useAppSelector } from "../../redux/hooks";

// const RecordExpense = () => {
//   const { data: userData } = useGetUsersQuery(undefined);
//   const { data: tourData } = useGetAllToursQuery(undefined);

//   const user = useAppSelector(selectCurrentUser);

//   const {data:myRegisteredTours} = useGetMyToursQuery(user!._id)

// //   const rregisterTourOptions = myRegisteredTours?.data.map((item) =>console.log(item));
//   const registerTourOptions = myRegisteredTours?.data.map((item) => ({
//     value: item._id,
//     label: item.tourId.tourName,
//   }));

//   const userOptions = userData?.data.map((item) => ({
//     value: item._id,
//     label: item.username,
//   }));

//   const tourOptions = tourData?.data.map((item) => ({
//     value: item._id,
//     label: item.tourName,
//   }));

//   const [expenseData, setExpenseData] = useState({
//     tourId: "",
//     registeredTourId: "",
//     amount: "",
//     date: null,
//     description: "",
//     payer: "",
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     // Here you can send the 'data' to your backend or perform any further processing
//   };

//   const handleInputChange = (name, value) => {
//  ;
//     setExpenseData({
//       ...expenseData,
//       [name]: value,
//     });

//     console.log(expenseData,'expenseData');
//   };

//   return (
//     <div>
//       <Row justify="center" align="middle" className="mx-auto mt-8">
//         <CustomForm onSubmit={onSubmit}>
//           <CustomSelect
//             options={tourOptions}
//             name="tourId"
//             label="Select Tour"

//           />
//           <CustomSelect
//             options={registerTourOptions}
//             name="registeredTourId"
//             label="Select Registered Tour"

//           />
//           <Input
//             type="number"
//             placeholder="Amount"
//             onChange={(e) => handleInputChange("amount", e.target.value)}
//           />
//             <label className="     text-gray-700 font-semibold">
//                 Select date
//                 </label>

//            <CustomDatePicker name="date" label="" />
//           <Input
//             placeholder="Description"
//             onChange={(e) => handleInputChange("description", e.target.value)}
//           />
//           <Select
//             options={userOptions}

//             placeholder="select payer"

//             onChange={(value) => handleInputChange("payer", value)}
//           />
//           <Button
//             className="w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
//             htmlType="submit"
//           >
//             Submit
//           </Button>
//         </CustomForm>
//       </Row>
//     </div>
//   );
// };

// export default RecordExpense;
 
import { Button,  Row } from "antd";
import CustomForm from "../../components/form/CustomForm";
import CustomSelect from "../../components/form/CustomSelect";
 
import CustomDatePicker from "../../components/form/CustomDatePicker";
import {
  useGetAllRegisteredToursQuery,
 
} from "../../redux/api/RegisterTourApi/registerTour.api";
 
import { useParams } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import Spinner from "../../components/shared/Spinner";
import { useRecordExpenseMutation } from "../../redux/api/ExpenseApi/expense.api";
import toast from "react-hot-toast";

const RecordExpense = () => {
  const { _id } = useParams();
  const { data } = useGetAllRegisteredToursQuery(undefined);
  const [recordExpense, {isSuccess,isError}] = useRecordExpenseMutation();

  const tour = data?.data?.filter((item: any) => item._id === _id);


  const selectedTour = tour && tour[0];
  const participantOptions = selectedTour?.participants.map((item : any) => ({
    value: item.userId._id,
    label: item?.userId?.username,
  }));

 
  const onSubmit = async (data : any) => {
    const toastId = toast.loading("Recording expense");
   
    const expenseData  = {
      tourId : selectedTour.tourId._id,
      registeredTourId: selectedTour._id,
      amount:Number(data.amount),
      description: data.description,
      date: data.date,
      payer:data.payer
      
    }

 
    const res = await recordExpense (expenseData)
 
  
      toast.success('Expense recorded successfully', { id: toastId, duration: 2000 })
 if(isError){
      toast.error('Kindly ensure all required inputs are filled.', { id: toastId, duration: 4000 })

    }
 
  };

  if (!tour) {
    return <Spinner />;
  }

  return (
    <div>
      <Row justify="center" align="middle" className="mx-auto mt-8">
        <CustomForm onSubmit={onSubmit}>
          <FormInput
            type="text"
            name="tourId"
            label="Tour Name"
            disabled
            defaultValue={selectedTour?.tourId?.tourName}
          />

<FormInput
            type="number"
            name="amount"
            label="Amount"
          />
          <label className="     text-gray-700 font-semibold">
            Select date
          </label>

          <CustomDatePicker name="date" label="" />
          <FormInput
            type="text"
            name="description"
            label="Expense Description"
          />
        

          <CustomSelect
            options={participantOptions}
            name="payer"
            label="Select Payer"
          />
          <Button
            className="w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
            htmlType="submit"
          >
            Submit
          </Button>
        </CustomForm>
      </Row>
    </div>
  );
};

export default RecordExpense;
