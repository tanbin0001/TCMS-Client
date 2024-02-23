/* eslint-disable @typescript-eslint/no-explicit-any */

import Heading from "../../components/shared/Heading";

import GenericButton from "../../components/form/GenericButton";
import { IoBagAdd } from "react-icons/io5";

import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import toast from "react-hot-toast";
import Spinner from "../../components/shared/Spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
import { useEffect, useState } from "react";
import CustomDatePicker from "../../components/form/CustomDatePicker";
import { useCreateTourMutation } from "../../redux/api/tourApi/tour.api";

const AddTour = () => {
  const [matchedUserName, setMatchedUserName] = useState(null);
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetUsersQuery(undefined);

  const matchedUser = data?.data?.filter(
    (FindingUser: any) => FindingUser._id === user!._id
  );

  useEffect(() => {
    if (matchedUser) {
      setMatchedUserName(matchedUser[0].username);
    }
  }, [matchedUser]);

  const [createTour, { isLoading, isSuccess }] = useCreateTourMutation();

  if (isSuccess) {
    toast.success("Product Added successfully");
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (!matchedUserName) {
    return <Spinner />;
  }

  const onSubmit = async (data: any) => {
    console.log(data);
    // await createTour(data);
  };
  const divClass = "grid grid-cols-2 gap-2";

  return (
    <div>
      <Heading title="Create Tour" />
      <div className="max-w-md mx-auto mt-8">
        <Form onSubmit={onSubmit}>
          <FormInput type="text" name="tourName" label="Tour Name" />
          <div className={divClass}>
            <FormInput type="text" name="destination" label="Destination" />
            <FormInput
              defaultValue={matchedUserName || ""}
              disabled
              type="text"
              name="tourCreator"
              label="Tour Creator"
            />
          </div>

          <div className={divClass}>
            <CustomDatePicker name="startDate" label="Start Date" />
            <CustomDatePicker name="endDate" label="End Date" />
          </div>

          <GenericButton value="Add Product" icon={<IoBagAdd />} />
        </Form>
      </div>
    </div>
  );
};

export default AddTour;
