import { Tabs, TabsProps } from "antd";
import TourCards from "./TourCards";

 
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/authSlice";
import { useEffect } from "react";

import { useGetMyToursQuery } from "../../../redux/api/RegisterTourApi/registerTour.api";

 const AllRegisteredTours = () => {
   
    const user = useAppSelector(selectCurrentUser);
    const {data} = useGetMyToursQuery(user!._id);
    console.log(data,'daata');
  
  
    
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Your recent Tours',
          children: <TourCards data={data} error={''} />,
        
        }
        
      ];
    
      return <Tabs  
 
      tabBarStyle={{ border: '2px solid', borderColor: '#C084FC' , borderRadius:'10px' , width:'300px' }}
      
     
      defaultActiveKey="1" items={items}   />;
    };
 
 export default AllRegisteredTours;