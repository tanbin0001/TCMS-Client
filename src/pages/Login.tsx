import { FieldValues } from "react-hook-form";
 
import { useLoginMutation } from "../redux/api/authApi/authApi";
import { useAppDispatch } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/authSlice";
import { Button, Row } from "antd";

import CustomForm from "../components/form/CustomForm";
import FormInput from "../components/form/FormInput";
import ForgottenPasswordModal from "../components/Login/ForgottenPasswordModal";
import { getMessageFromResponse } from "../utils/ResponseMessage";
import Spinner from "../components/shared/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();


  const onSubmit = async (data :FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res);
      const successOrError = getMessageFromResponse(res);
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      
      navigate(`/${user?.role}/dashboard`);
      toast.success(`${successOrError.message}`,{ id: toastId, duration: 2000 })
    } catch (error) {
        
      const successOrError = getMessageFromResponse(error);
      toast.error(`${successOrError.message}`,{ id: toastId, duration: 2000 })
     
    }
  };

  if(isLoading) {
    return <Spinner/>
  }
  
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
      <div className="  ">
     

        {/* second div */}
        <div className="bg-white text-black  w-full  p-5   rounded-lg      flex items-center justify-center space-y-2 ">
          <div className="text-center     ">
            <h1 className="font-bold text-2xl mb-1">Login to your account</h1>
            <p>
              Don’t have an account?{" "}
              <Link to="/register" className="text-purple-500">
                {" "}
                Sign Up Free!
              </Link>
            </p>

            <Row
              justify="center"
              align="middle"
              className="  mx-auto mt-8 "
            >
              <div className="  px-3">
              <CustomForm onSubmit={onSubmit}>
                <FormInput type="text" name="username" label="User Name/Email" />
                <FormInput type="text" name="password" label="Password" />
                <Button
                  className=" w-96 px-4 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
                  htmlType="submit"
                >
                  {isLoading ? "Logging in" : "Login"}
                </Button>
              </CustomForm>
              </div>

            </Row>
            
            <ForgottenPasswordModal/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
