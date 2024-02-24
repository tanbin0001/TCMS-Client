import AddTour from "../pages/Tour/AddTour";
import AllTours from "../pages/Tour/AllTours";
import UpdateTour from "../pages/Tour/UpdateTour";

 

export const userRoutePaths = [
   
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
    path: "update-tour/:_id",
    element: <UpdateTour />,
  },
  
   
 
];
