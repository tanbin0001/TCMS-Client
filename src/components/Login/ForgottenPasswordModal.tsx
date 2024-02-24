import { Button, Modal } from "antd";
import { useState } from "react";











//! TODO: handle forget password (issue: localstorage)
const ForgottenPasswordModal = () => {
    const [loader, setLoader] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
 
  
 
 const handleForgetPassword = () => {
    const dataString = localStorage.getItem("persist:auth");
    const data = JSON.parse(dataString as string);
    const userString = data.user;
    const user = JSON.parse(userString);
    const userId = user._id;
  
 }
   
  
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
         <button onClick={() => handleForgetPassword} className="text-white bg-purple-500 rounded-md px-2 py-1">reset password</button>
        </Modal>
      </>
    );
  };
  

export default ForgottenPasswordModal;