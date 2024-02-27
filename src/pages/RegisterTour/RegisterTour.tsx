 

import { useState } from "react";
import { Button, Input, Row, Select } from "antd";
import CustomForm from "../../components/form/CustomForm";
import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
import CustomSelect from "../../components/form/CustomSelect";
import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";
import { IoAddCircle } from "react-icons/io5"; 
import { useRegisterTourMutation } from "../../redux/api/RegisterTourApi/registerTour.api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import toast from "react-hot-toast";
import { getMessageFromResponse } from "../../utils/ResponseMessage";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/shared/Heading";
const RegisterTour = () => {
  const [registerTour] = useRegisterTourMutation()
  const { data: userData } = useGetUsersQuery(undefined);
  const { data: tourData } = useGetAllToursQuery(undefined);
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const matchedUser = userData?.data?.filter(
    (FindingUser: any) => FindingUser._id === currentUser!._id
  );
  const selectedUserData =
    matchedUser && matchedUser.length > 0 ? matchedUser[0] : null;

  // Filter tours based on the tourCreator property
  const myTours = tourData?.data?.filter(
    (tour: any) => tour?.tourCreator === selectedUserData?.username
  );

  const userOptions = userData?.data.map((item: any) => ({
    value: item._id,
    label: item.username,
  }));

  const tourOptions = myTours?.map((item: any) => ({
    value: item._id,
    label: item.tourName,
  }));

  const [participants, setParticipants] = useState([
    { userId: "", initialContribution: 0 },
  ]);

  const onSubmit =async (data: any) => {

    const requestData = {
      tourId: data.tourId,
      participants,
    };
console.log(requestData);
     
    const toastId = toast.loading("registering tour");
const  emptyFields=[];
    if (!requestData.tourId) emptyFields.push("Tour Name");
   

  if (requestData.participants[0].userId ==='') {
      emptyFields.push("Participants");
  }
 
  if (emptyFields.length > 0) {
    toast.error(`The fields are empty: ${emptyFields.join(", ")}`, { id: toastId, duration: 2000 });
    return;}



 const res = await registerTour(requestData)
 const successOrError = getMessageFromResponse(res);
 if(res){
  toast.success(`${successOrError.message}`,{ id: toastId, duration: 2000 })
  navigate(`/user/dashboard`);
  
} else if(successOrError.success === false){
  toast.error(`${successOrError.message}`,{ id: toastId, duration: 2000 })
 }
 
 
  };

  const handleChange = (value: any, index: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].userId = value;
    setParticipants(updatedParticipants);
  };

  const handleInitialContributionChange = (value: any, index: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].initialContribution = parseFloat(value);
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { userId: "", initialContribution: 0 }]);
  };

  return (
    <div>
      <Heading title="Add Participants"/>
      <Row justify="center" align="middle" className="mx-auto mt-8">
        <CustomForm onSubmit={onSubmit}>
          <CustomSelect
            options={tourOptions}
            name="tourId"
            label="Select Tour"
          />
          {participants.map((participant, index) => (
            <div key={index}>
                <label className="     text-gray-700 font-semibold">
          {`Select Participant ${index + 1}`}
                </label>

              <Select
                allowClear
                style={{ width: "100%" }}      
                onChange={(value) => handleChange(value, index)}
                options={userOptions}
              />
           

              <div className="mb-4  text-start">
                <label className="     text-gray-700 font-semibold">
                  Enter Initial amount
                </label>

                <Input
                  className="w-full  px-4 py-2 mb-4 border  rounded-md focus:outline-none focus:border-purple-500"
                  type="number"
                  placeholder="Enter Initial amount"
                 
                  value={participant.initialContribution}
                  onChange={(e) => handleInitialContributionChange(e.target.value, index)}
                  
                />
              </div>
            </div>
          ))}
          <Button onClick={addParticipant} className="mb-2 block ">
            <IoAddCircle />
          </Button>
          <Button
            className="w-96 px-4   font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
            htmlType="submit"
          >
            Register Tour
          </Button>
        </CustomForm>
      </Row>
    </div>
  );
};

export default RegisterTour;
