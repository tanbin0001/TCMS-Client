import { Button, Row } from "antd";
import CustomForm from "../../components/form/CustomForm";
import CustomSelect from "../../components/form/CustomSelect";

import CustomDatePicker from "../../components/form/CustomDatePicker";
import { useGetAllRegisteredToursQuery } from "../../redux/api/RegisterTourApi/registerTour.api";

import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import Spinner from "../../components/shared/Spinner";
import { useRecordExpenseMutation } from "../../redux/api/ExpenseApi/expense.api";
import toast from "react-hot-toast";
import { getMessageFromResponse } from "../../utils/ResponseMessage";

const RecordExpense = () => {
  const { _id } = useParams();
  const { data } = useGetAllRegisteredToursQuery(undefined);
  const [recordExpense] = useRecordExpenseMutation();
  const navigate = useNavigate();

  const tour = data?.data?.filter((item: any) => item._id === _id);

  const selectedTour = tour && tour[0];
  const participantOptions = selectedTour?.participants.map((item: any) => ({
    value: item.userId._id,
    label: item?.userId?.username,
  }));

  const onSubmit = async (data: any) => {
    console.log(data);

    const emptyFields = [];

    // Check for empty fields

    if (!data.amount) emptyFields.push("Amount");
    if (!data.description) emptyFields.push("Description");
    if (!data.payer) emptyFields.push("Payer");
    if (!data.date) emptyFields.push("Date");

    const toastId = toast.loading("Recording expense");

    if (emptyFields.length > 0) {
      toast.error(`The fields are empty: ${emptyFields.join(", ")}`, {
        id: toastId,
        duration: 2000,
      });
      return;
    }
    try {
      const expenseData = {
        tourId: selectedTour.tourId._id,
        registeredTourId: selectedTour._id,
        amount: Number(data.amount),
        description: data.description,
        date: data.date,
        payer: data.payer,
      };

      const res = await recordExpense(expenseData);
      console.log(res);
      const successOrError = getMessageFromResponse(res);
      if (res) {
        toast.success(`${successOrError.message}`, {
          id: toastId,
          duration: 2000,
        });
        const responseData = (res as { data: any }).data;
        

        navigate(`/user/expenses-summary/${responseData.data.registeredTourId}`);
      }
    } catch (error:any) {
 
     toast.error(`${error.message}`,{ id: toastId, duration: 2000 })
 
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

          <FormInput type="number" name="amount" label="Amount" />
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
