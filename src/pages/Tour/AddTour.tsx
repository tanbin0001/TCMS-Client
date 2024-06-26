/* eslint-disable @typescript-eslint/no-explicit-any */

import Heading from "../../components/shared/Heading";

import GenericButton from "../../components/form/GenericButton";
import { IoBagAdd } from "react-icons/io5";

import FormInput from "../../components/form/FormInput";
import toast from "react-hot-toast";
import Spinner from "../../components/shared/Spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";
import { useEffect, useState } from "react";
import CustomDatePicker from "../../components/form/CustomDatePicker";
import { useCreateTourMutation } from "../../redux/api/tourApi/tour.api";

const image_hosting_token = "0f036a7553610b9f1abaf96dabed4168";
import { Col, Form, Input } from "antd";
import CustomForm from "../../components/form/CustomForm";
import { Controller } from "react-hook-form";
import { getMessageFromResponse } from "../../utils/ResponseMessage";

const AddTour = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const [matchedUserName, setMatchedUserName] = useState(null);
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetUsersQuery(undefined);

  const matchedUser = data?.data?.filter(
    (FindingUser: any) => FindingUser._id === user!._id
  );

  useEffect(() => {
    if (matchedUser) { 
      setMatchedUserName(matchedUser[0]?.username);
    }
  }, [matchedUser]);

  const [createTour, { isLoading }] = useCreateTourMutation();

  
  if (isLoading) {
    return <Spinner />;
  }
  if (!matchedUserName) {
    return <Spinner />;
  }
 
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("creating tour");
    
    const emptyFields = [];

    // Check for empty fields
    if (!data.tourName) emptyFields.push("Tour Name");
    if (!data.imageLink) emptyFields.push("Image Link");
    if (!data.destination) emptyFields.push("Destination");
    if (!data.tourCreator) emptyFields.push("Tour Creator");
    if (!data.startDate) emptyFields.push("Start Date");
    if (!data.endDate) emptyFields.push("End Date");
  
  
    if (emptyFields.length > 0) {
      toast.error(`The fields are empty: ${emptyFields.join(", ")}`, { id: toastId, duration: 2000 });
      return;
    }
    try{

    
    const imageFile = data.imageLink;
    const formData = new FormData();
    formData.append("image", imageFile);

   
  
    try {
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: formData 
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const imgRes = await response.json();
   
      if (imgRes.success) {
        const imageLink = imgRes.data.display_url;
        const { tourName, destination, tourCreator, startDate, endDate } = data;
        const tourData = {
          tourName,
          destination,
          tourCreator,
          imageLink,
          startDate,
          endDate,
        };
        
        console.log(tourData);

        const res = await createTour(tourData);
        if(res){
          const successOrError = getMessageFromResponse(res);
          console.log(successOrError);
      
          toast.success(`${successOrError.message}`,{ id: toastId, duration: 2000 })
        }
 
       
      }
    } catch (error) {
      console.log("Error uploading image:");
    }
  }catch (error){
    const successOrError = getMessageFromResponse(error);
    
        toast.error(`${successOrError.message}`,{ id: toastId, duration: 2000 })
  }
  };

  const divClass = "grid grid-cols-2 gap-2";

  return (
    <div>
      <Heading title="Create Tour" />
      <div className="max-w-md mx-auto mt-8">
        <CustomForm onSubmit={onSubmit}>
          <FormInput type="text" name="tourName" label="Tour Name" />

         
       <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
  <Form.Item  labelCol={{ span: 24 }}
    label={ <p style={{fontWeight:"500"}}>Image</p> }>
 
    <Controller
      name="imageLink"
      render={({ field: { onChange, value, ...field } }) => (
        <Input
          {...field}
          type="file"
          value={value?.fileName}
          onChange={(e) => onChange(e?.target?.files?.[0])}
        />
      )}
    />
  </Form.Item>
</Col>


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

          <GenericButton value="Create Tour" icon={<IoBagAdd />} />
        </CustomForm>
      </div>
    </div>
  );
};

export default AddTour;
