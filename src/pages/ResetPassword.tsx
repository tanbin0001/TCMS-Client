import { Button } from "antd";
import CustomForm from "../components/form/CustomForm";
import FormInput from "../components/form/FormInput";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../redux/api/authApi/authApi";
import { useNavigate } from "react-router-dom";
 
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isSuccess, isLoading }] =
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
    const toastId = toast.loading("Resetting password");

    try {
      const newUserInfo = {
        email: data.email,
        newPassword: data.newPassword,
      };

      const res = await resetPassword({newUserInfo,token});
      console.log(res,'res fro');
      if ((res as any).error ) {
        toast.error((res as any).error.data.message, { id: toastId, duration: 2000 });
      }

      if(isSuccess){
        
      toast.success("Password reset successful", {
        id: toastId,
        duration: 2000,
      });
       
      navigate("/login");
      }
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
