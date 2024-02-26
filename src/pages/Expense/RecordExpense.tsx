 
 
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
  const [recordExpense, { isError}] = useRecordExpenseMutation();

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

 
  await recordExpense (expenseData)
 
  
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
