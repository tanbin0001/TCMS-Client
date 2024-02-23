import { FieldValues } from "react-hook-form";
import SocialLoginCard from "../components/Login/SocialLoginCard";
import "../styles/Login.css";
import { useRegisterMutation } from "../redux/api/authApi/authApi";
import toast from "react-hot-toast";
import { Button, Row } from "antd";
import Form from "../components/form/CustomForm";
import FormInput from "../components/form/FormInput";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  // register handler
  const onSubmit = async (data: FieldValues) => {
    try {
      register(data);
      navigate(`/login`);
      toast.success("Registration Success");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

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
      <div className="    lg:flex">
        <SocialLoginCard />
        {/* second div */}
        <div className="bg-white text-black       h-[500px]   lg:flex items-center  space-y-2 ">
          <div className="text-center   login-container">
            <h1 className="font-bold text-2xl mb-1">Sign up for free!</h1>

            <Row
              justify="center"
              align="middle"
              className="max-w-md mx-auto p-5 mt-8"
            >
              <Form onSubmit={onSubmit}>
                <FormInput type="text" name="username" label="User Name" />
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="text" name="password" label="Password" />
                <Button
                  htmlType="submit"
                  className="w-96 px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700"
                >
                  {isLoading ? "Signing Up" : "Sign Up"}
                </Button>
              </Form>
            </Row>
            <p className="text-purple-400">
              <a href="/login">Already have an account?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
