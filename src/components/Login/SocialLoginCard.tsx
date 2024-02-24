import { CiFacebook } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const SocialLoginCard = () => {
  return (
    <div>
      {/* first div */}
      <div className=" lg:w-[400px] h-[80vh]  p-10  space-y-9 bg-purple-600   flex flex-col   justify-center     ">
        <h1 className="text-3xl font-bold ">SportGearHub</h1>
        <p>Login using social media to get quick access</p>
        <div className="flex flex-col space-y-4 items-center mx-3">
          <button className="bg-[#476BB6] w-96 size-11 flex justify-center items-center  ">
            <CiFacebook className="size-5  mr-2" /> SignIn with facebook
          </button>
          <button className="bg-[#EA3813] w-96 size-11 flex justify-center items-center ">
            <FaGoogle className="size-5  mr-2" /> SignIn with google
          </button>
          <button className="bg-[#0099D3] w-96 size-11 flex justify-center items-center ">
            <FaTwitter className="size-5  mr-2" /> SignIn with twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginCard;
