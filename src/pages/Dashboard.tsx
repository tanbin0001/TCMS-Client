import { FaRegUserCircle } from "react-icons/fa"
import Overview from "../components/Dashboard/Overview/Overview"
import SaleHistory from "../components/Dashboard/SaleHistory"
import Heading from "../components/shared/Heading"
import '../styles/Dashboard.css'
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../redux/features/authSlice"
 
const Dashboard = () => {
  
   
  const currentUser = useSelector(selectCurrentUser);
 
  return (
    <div className="lg:flex">
  <div className="  min-h-screen">
      <Heading title="Welcome to Dashboard"/>
 <Overview/>
 <SaleHistory />
    </div>
    <div className="w-96    flex justify-center lg:justify-end  ">
    <div className="bg-purple-500 w-72 h-52 mt-32 text-center   rounded-md space-y-5 text-white">
      <FaRegUserCircle  className="text-3xl mt-9 flex justify-center   w-full mr-2  size-14" /> 
      <h1>{currentUser?.email ?? "Unknown"}</h1>
  
 
  
</div>
    </div>
    </div>
  
  )
}

export default Dashboard