import { Controller, FieldValues } from "react-hook-form";
 
import "../styles/Login.css";
import { useRegisterMutation } from "../redux/api/authApi/authApi";
import toast from "react-hot-toast";
import { Button, Col, Form, Input, Row } from "antd";

import FormInput from "../components/form/FormInput";
import { useNavigate } from "react-router-dom";
import CustomForm from "../components/form/CustomForm";
import Spinner from "../components/shared/Spinner";
import { useState } from "react";
import { getMessageFromResponse } from "../utils/ResponseMessage";

const image_hosting_token = "d90ae3f3d54ab3247df92c0620d25ddf";
const Register = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [loading, setLoading] = useState(false);

  

  const onSubmit = async (data: FieldValues) => {
    const emptyFields = [];
  
    // Check for empty fields
    if (!data.firstName) emptyFields.push("Tour Name");
    if (!data.username) emptyFields.push("User Name");
    if (!data.email) emptyFields.push("Email");
    if (!data.password) emptyFields.push("Password");
  
    const toastId = toast.loading("Registration in progress!");
  
    if (emptyFields.length > 0) {
      toast.error(`The fields are empty: ${emptyFields.join(", ")}`, { id: toastId, duration: 2000 });
      return;
    }
  
    setLoading(true);
  
    let imageLink = null; // Set imageLink to null by default
  
    // Check if an image is provided
    if (data.imageLink) {
      const formData = new FormData();
      formData.append("image", data.imageLink);
  
      try {
        const response = await fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          toast.error("Failed to upload image", { id: toastId, duration: 2000 });
        }
  
        const imgRes = await response.json();
        if (imgRes.success) {
          imageLink = imgRes.data.display_url;
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    // Proceed with registration
    const { firstName, lastName, email, username, password } = data;
    const userInfo = {
      firstName,
      lastName,
      email,
      username,
      imageLink, // Assign imageLink whether it's provided or null
      password,
    };
  
    try {
      const res = await register(userInfo);
      const successOrError = getMessageFromResponse(res);
  
      if (successOrError.success) {
        toast.success(`${successOrError.message}`, { id: toastId, duration: 2000 });
        navigate(`/login`);
      } else {
        toast.error(`${successOrError.message}`, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  // const onSubmit = async (data: FieldValues) => {

  //   const emptyFields = [];

  //   // Check for empty fields
  //   if (!data.firstName) emptyFields.push("Tour Name");
  //   if (!data.username) emptyFields.push("User Name");
  //   if (!data.email) emptyFields.push("Email");
  //   if (!data.password) emptyFields.push("Password"); 
  
  
  //   const toastId = toast.loading("Registration in progress!");
  //   if (emptyFields.length > 0) {
  //     toast.error(`The fields are empty: ${emptyFields.join(", ")}`, { id: toastId, duration: 2000 });
  //     return;
  //   }
  //   setLoading(true);
  //   const imageFile = data.imageLink;
  //   const formData = new FormData();
  //   formData.append("image", imageFile);

  //   try {
  //     const response = await fetch(img_hosting_url, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       toast.error("Failed to upload image",{ id: toastId, duration: 2000 });
  //     }

  //     const imgRes = await response.json();
  //     if (imgRes.success) {
  //       const imageLink = imgRes.data.display_url;
  //       const { firstName, lastName, email, username, password } = data;
  //       const userInfo = {
  //         firstName,
  //         lastName,
  //         email,
  //         username,
  //         imageLink,
  //         password,
  //       };

  //       const res = await register(userInfo);
  //       const successOrError = getMessageFromResponse (res);
  //      if(successOrError.success) {
  //       toast.success(`${successOrError.message}`,{ id: toastId, duration: 2000 })
  //      }else if(successOrError.success === false){
  //       toast.error(`${successOrError.message}`,{ id: toastId, duration: 2000 })
  //      }
 
  //       navigate(`/login`);

        
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
      
  //     setLoading(false);
  //   }
  // };

  const backgroundStyle = {
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://image.lexica.art/full_webp/1484d18f-ebb0-4921-b3a8-548bb7ed697b")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  return (
    <div style={backgroundStyle}>
    
      {loading ? (
        <Spinner />
      ) : (
        <div className=" ">
       
          {/* second div */}
          <div className="bg-white text-black rounded-md py-3 lg:w-full   lg:flex items-center space-y-2 ">
            <div className="text-center  ">
              <h1 className="font-bold text-2xl my-2">Sign up for free!</h1>

              <Row
                justify="center"
                align="middle"
                className="lg:max-w-md mx-auto p-5 mt-8"
              >
                  <div className="  px-3 ">

               
                <CustomForm onSubmit={onSubmit}>
                  <div className="lg:flex space-x-1">
                  <FormInput type="text" name="firstName" label="First Name" />
                  <FormInput type="text" name="lastName" label="Last Name" />
                  </div>
                  <FormInput type="text" name="username" label="User Name" />
                  <FormInput type="email" name="email" label="Email" />
                  <FormInput type="text" name="password" label="Password" />
                  <Col span={24} md={{ span: 12 }} lg={{ span: 24 }}>
                    <Controller
                      name="imageLink"
                      render={({ field: { onChange, value, ...field } }) => (
                        <Form.Item label="image">
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
                  <Button
                    htmlType="submit"
                    className="w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
                  >
                    {isLoading ? "Signing Up" : "Sign Up"}
                  </Button>
                </CustomForm>
                 </div>
              </Row>
              <p className="text-purple-400">
                <a href="/login">Already have an account?</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
