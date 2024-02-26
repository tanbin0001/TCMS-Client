import { FaRegUserCircle } from "react-icons/fa";
import Heading from "../components/shared/Heading";
import "../styles/Dashboard.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/authSlice";
import AllRegisteredTours from "../components/Dashboard/tourReport/AllRegisteredTours";
import { useGetUsersQuery } from "../redux/api/usersApi/users.api";
import Spinner from "../components/shared/Spinner";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data } = useGetUsersQuery(undefined);

  const matchedUser = data?.data?.filter((FindingUser: any) => FindingUser._id === currentUser!._id );
  const selectedUserData = matchedUser && matchedUser.length > 0 ? matchedUser[0] : null;
 
if(!data){
  return <Spinner/>
}
  return (
    <div>

      <Heading title="Welcome to Dashboard" />

    <div className=" flex justify-center  ">
      <div className="  min-h-screen   ">
        <AllRegisteredTours />
      </div>
      <div className="w-96    flex justify-center lg:justify-center   ">
        
        <div className="bg-gray-300 w-72 h-52 mt-32 text-center rounded-md space-y-5   flex items-center justify-center flex-col text-black">
  {selectedUserData.imageLink ? (
    <img src={selectedUserData.imageLink} alt="User Image" className="w-20 h-20 rounded-full object-cover" />
  ) : (
    <FaRegUserCircle className="text-3xl mt-9 flex justify-center w-full mr-2 size-14" />
  )}
  <h1> <span className="font-semibold">UserName: </span>{selectedUserData.username ?? "Unknown"}</h1>
  <h1> <span className="font-semibold">Email: </span>{selectedUserData.email ?? "Unknown"}</h1>
</div>

      </div>
    </div>
    </div>
  );
};

export default Dashboard;
