import { Button } from "antd";
import CustomForm from "../components/form/CustomForm";
import FormInput from "../components/form/FormInput";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../redux/api/authApi/authApi";
import { useNavigate } from "react-router-dom";
 
import { useEffect, useState } from "react";
import { getMessageFromResponse } from "../utils/ResponseMessage";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, {  isLoading }] =
    useResetPasswordMutation();
 
  const [token, setToken] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location.search]);

  
  const onSubmit = async (data: FieldValues) => {

    const emptyFields = [];

    // Check for empty fields
    if (!data.email) emptyFields.push("Email");
    if (!data.newPassword) emptyFields.push("New Password");
  


    const toastId = toast.loading("Resetting password");

    if (emptyFields.length > 0) {
      toast.error(`please provide  ${emptyFields.join(", ")} `, {
        id: toastId,
        duration: 2000,
      });
      return;
    }


    try {
      const newUserInfo = {
        email: data.email,
        newPassword: data.newPassword,
      };

      const res = await resetPassword({newUserInfo,token});
      const successOrError = getMessageFromResponse(res);

      if (successOrError.success) {
        toast.success(`${successOrError.message}`, {
          id: toastId,
          duration: 2000,
        });
        navigate(`/login`);
      } 
        
      
      navigate("/login");
 
    } catch {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center border min-h-screen">
        <CustomForm onSubmit={onSubmit}>
          <FormInput type="text" name="email" label="Email" />
          <FormInput type="text" name="newPassword" label="New Password" />
          <Button
            className=" w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
            htmlType="submit"
          >
            {isLoading ? "  Resetting Password" : "  Reset Password"}
         
          </Button>
        </CustomForm>
      </div>
    </div>
  );
};

export default ResetPassword;
