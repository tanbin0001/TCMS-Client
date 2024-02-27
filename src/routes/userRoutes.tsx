import TourDetails from "../components/Dashboard/tourReport/TourDetails";
import Dashboard from "../pages/Dashboard";
import AllExpenses from "../pages/Expense/AllExpenses";
import RecordExpense from "../pages/Expense/RecordExpense";
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
    name: "Add Participants",
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
  {
  
    path: "record-expense/:_id",
    element: <RecordExpense />,
  },
  {
  
    path: "expenses-summary/:_id",
    element: <AllExpenses />,
  },
 
  
   
 
];
