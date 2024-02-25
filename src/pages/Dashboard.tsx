import { FaRegUserCircle } from "react-icons/fa"
import Heading from "../components/shared/Heading"
import '../styles/Dashboard.css'
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/features/authSlice"
import AllRegisteredTours from "../components/Dashboard/tourReport/AllRegisteredTours"
 
const Dashboard = () => {
  
   
  const currentUser = useSelector(selectCurrentUser);
 
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3">
  <div className="  min-h-screen lg:col-span-2 ">
      <Heading title="Welcome to Dashboard"/>
 <AllRegisteredTours/>
    </div>
    <div className="w-96    flex justify-center lg:justify-end lg:col-span-1">
    <div className="bg-purple-500 w-72 h-52 mt-32 text-center   rounded-md space-y-5 text-white">
      <FaRegUserCircle  className="text-3xl mt-9 flex justify-center   w-full mr-2  size-14" /> 
      <h1>{currentUser?.email ?? "Unknown"}</h1>
  
 
  
</div>
    </div>
    </div>
  
  )
}

export default Dashboard