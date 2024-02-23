import AddTour from "../pages/Tour/AddTour";
import AllTours from "../pages/Tour/AllTours";

 

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
  
   
 
];
