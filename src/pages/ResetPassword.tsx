import { Button } from "antd";
import CustomForm from "../components/form/CustomForm";
import FormInput from "../components/form/FormInput";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../redux/api/authApi/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isSuccess, isError, isLoading }] =
    useResetPasswordMutation();
  const dispatch = useAppDispatch();

  const dataString = localStorage.getItem("persist:auth");
  const data = JSON.parse(dataString as string);
  const userString = data.user;
  const user = JSON.parse(userString);
  const userId = user._id;

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const newUserInfo = {
        _id: userId,
        newPassword: data.newPassword,
      };

      const res = await resetPassword(newUserInfo);
      if ((res as any).error ) {
        toast.error((res as any).error.data.message, { id: toastId, duration: 2000 });
      }

      toast.success("Password reset successful", {
        id: toastId,
        duration: 2000,
      });
      dispatch(logOut());
      navigate("/login");
    } catch {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center border min-h-screen">
        <CustomForm onSubmit={onSubmit}>
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
