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

const image_hosting_token = "d90ae3f3d54ab3247df92c0620d25ddf";
import { Button, Col, Divider, Form, Input } from "antd";
import CustomForm from "../../components/form/CustomForm";
import { Controller } from "react-hook-form";
// const image_hosting_token = import.meta.env.Image_Upload_token
console.log(image_hosting_token);

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
      setMatchedUserName(matchedUser[0].username);
    }
  }, [matchedUser]);

  const [createTour, { isLoading, isSuccess }] = useCreateTourMutation();

  if (isSuccess) {
    toast.success("Tour Added successfully");
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (!matchedUserName) {
    return <Spinner />;
  }

  const onSubmit = async (data: any) => {
    const imageFile = data.imageLink;  
    console.log(imageFile);  

    const formData = new FormData();
    formData.append("image", imageFile);  

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if(imgRes.success){
          const imageLink  = imgRes.data.display_url;
          const {tourName,destination,tourCreator,startDate,endDate}  = data;
       const tourData = {
        tourName,destination,tourCreator,imageLink,startDate,endDate
       }
     const res =   createTour(tourData);
     console.log(res);
        }
      })
      .catch((error) => console.error("Error uploading image:", error));

 
    // await createTour(data);
  };

  const divClass = "grid grid-cols-2 gap-2";

  return (
    <div>
      <Heading title="Create Tour" />
      <div className="max-w-md mx-auto mt-8">
        <CustomForm onSubmit={onSubmit}>
          <FormInput type="text" name="tourName" label="Tour Name" />
          {/* <FormInput type="file" name="imageLink" label="Tour Name" /> */}
          <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
            <Controller
              name="imageLink"
              render={({ field: { onChange, value, ...field } }) => (
                <Form.Item label="Image">
                  <Input
                    {...field}
                    type="file"
                    value={value?.fileName}
                    onChange={(e) => onChange(e?.target?.files?.[0])}
                  />
                </Form.Item>
              )}
            />
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

          <GenericButton value="Add Product" icon={<IoBagAdd />} />
        </CustomForm>
      </div>
    </div>
  );
};

export default AddTour;
