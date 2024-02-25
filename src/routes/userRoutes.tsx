import TourDetails from "../components/Dashboard/tourReport/TourDetails";
import Dashboard from "../pages/Dashboard";
import RegisterTour from "../pages/RegisterTour/RegisterTour";
import AddTour from "../pages/Tour/AddTour";
import AllTours from "../pages/Tour/AllTours";
import UpdateTour from "../pages/Tour/UpdateTour";

 

export const userRoutePaths = [
   
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Create Tour",
    path: "create-tour",
    element: <AddTour />,
  },
  
  {
    name: "All Tours",
    path: "all-tours",
    element: <AllTours />,
  },
  {
    name: "Register Tour",
    path: "register-tour",
    element: <RegisterTour />,
  },
  {
    path: "update-tour/:_id",
    element: <UpdateTour />,
  },
  {
    path: "tour-details/:_id",
    element: <TourDetails />,
  },
  
   
 
];
