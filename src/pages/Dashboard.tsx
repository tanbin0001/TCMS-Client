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

  const matchedUser = data?.data?.filter(
    (FindingUser: any) => FindingUser._id === currentUser!._id
  );
  const selectedUserData =
    matchedUser && matchedUser.length > 0 ? matchedUser[0] : null;

  if (!data) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="bg-gray-300 w-80    text-center rounded-md space-y-5  p-3 items-center    flex  text-black">
        {selectedUserData.imageLink ? (
          <img
            src={selectedUserData.imageLink}
            alt="User Image"
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <FaRegUserCircle className="text-3xl mt-9 flex justify-end w-full mr-2 size-14" />
        )}
        <div>
          <h1>
            {" "}
            <span className="font-semibold">UserName: </span>
            {selectedUserData.username ?? "Unknown"}
          </h1>
          <h1>
            {" "}
            <span className="font-semibold">Email: </span>
            {selectedUserData.email ?? "Unknown"}
          </h1>
        </div>
      </div>
      <Heading title="Welcome to Dashboard" />

      <div className="    ">
        <div className="  min-h-screen   ">
          <AllRegisteredTours />
        </div>
        <div className="w-96    flex justify-center lg:justify-center   "></div>
      </div>
    </div>
  );
};

export default Dashboard;
