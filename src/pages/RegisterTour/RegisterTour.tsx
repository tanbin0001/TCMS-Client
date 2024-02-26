// import { Button, Input, Row, Select } from "antd";
// import CustomForm from "../../components/form/CustomForm";

// import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
// import CustomSelect from "../../components/form/CustomSelect";
// import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";

// const RegisterTour = () => {
//     const {data:userData} = useGetUsersQuery(undefined);
//     const {data:tourData} = useGetAllToursQuery(undefined);
//     console.log(tourData);

//     const userOptions = userData?.data.map((item : any) => ({
//         value: item._id,
//         label:item.username
//     }))
//     const tourOptions = tourData?.data.map((item : any) => ({
//         value: item._id,
//         label:item.tourName
//     }))
//     const  onSubmit = (data:any ) => {
//     console.log(data);
//     }
//     const handleChange =()=>{

//     }
//  return (
//  <div>

// <Row
//               justify="center"
//               align="middle"
//               className="  mx-auto mt-8      "
//             >
//               <CustomForm onSubmit={onSubmit}>

//               <CustomSelect   options={tourOptions} name="tourId" label="Select Tour" />
//               <Select
//       mode="multiple"
//       allowClear
//       style={{ width: '100%' }}
//       placeholder="Please select"
//       defaultValue={['a10', 'c12']}
//       onChange={handleChange}
//       options={userOptions}
//     />
// <Input placeholder="Select Initial amount" />;
//                 <Button
//                   className=" w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
//                   htmlType="submit"
//                 >
//             Register Tour
//                 </Button>
//               </CustomForm>

//             </Row>
//  </div>
//  );
// };

// export default RegisterTour;

import { useState } from "react";
import { Button, Input, Row, Select } from "antd";
import CustomForm from "../../components/form/CustomForm";
import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
import CustomSelect from "../../components/form/CustomSelect";
import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";
import { IoAddCircle } from "react-icons/io5"; 
import { useRegisterTourMutation } from "../../redux/api/RegisterTourApi/registerTour.api";
const RegisterTour = () => {
  const [registerTour,{isSuccess}] = useRegisterTourMutation()
  const { data: userData } = useGetUsersQuery(undefined);
  const { data: tourData } = useGetAllToursQuery(undefined);

  const userOptions = userData?.data.map((item: any) => ({
    value: item._id,
    label: item.username,
  }));

  const tourOptions = tourData?.data.map((item: any) => ({
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

 const res = await registerTour(requestData)
 
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
            className="w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
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
