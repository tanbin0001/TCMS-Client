import { Button, Modal } from "antd";
import { useState } from "react";
import CustomForm from "../form/CustomForm";
import FormInput from "../form/FormInput";
import { useForgetPasswordMutation } from "../../redux/api/authApi/authApi";
import toast from "react-hot-toast";

import { getMessageFromResponse } from "../../utils/ResponseMessage";

const ForgottenPasswordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();

  const onSubmit = async (data: any) => {
    const emptyFields = [];

    // Check for empty fields
    if (!data.email) emptyFields.push("Email");

    const toastId = toast.loading("Generating reset password link");

    if (emptyFields.length > 0) {
      toast.error(` This field empty: ${emptyFields.join(", ")}`, {
        id: toastId,
        duration: 2000,
      });
      return;
    }

    console.log(data);
    const res = await forgetPassword(data);

    const successOrError = getMessageFromResponse(res);

    if (successOrError.success) {
      toast.success(
        "Password reset link generated successfully, please check your email",
        { id: toastId, duration: 6000 }
      );
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className=" text-purple-500 hover:text-purple-300 text-sm mt-1"
        onClick={showModal}
      >
        Forgotten Password?
      </button>
      <Modal
        title="Are you sure you want to reset your password?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="mt-5">
          <CustomForm onSubmit={onSubmit}>
            <FormInput
              type="text"
              name="email"
              label="please enter your email"
            />

            <Button
              className="text-white bg-purple-500 rounded-md px-2 py-1"
              htmlType="submit"
            >
              {/* {isLoading ? "Logging in" : "Login"} */}
              Reset Password
            </Button>
          </CustomForm>
        </div>
      </Modal>
    </>
  );
};

export default ForgottenPasswordModal;
