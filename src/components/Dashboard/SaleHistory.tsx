 
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SaleHistoryCards from './SaleHistoryCards';
import { useDailySalesQuery, useWeeklySalesQuery, useMonthlySalesQuery, useYearlySalesQuery } from '../../redux/api/saleHistoryApi/saleHistoryApi';
 import '../../styles/MainLayout.css'
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/authSlice';
import { useGetUsersQuery } from '../../redux/api/usersApi/users.api';
 
 
const SaleHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetUsersQuery(undefined);
  const matchedUser = data?.data?.filter((FindingUser: any) => FindingUser._id === user!._id );
  const managerBranch = matchedUser && matchedUser.length > 0 ? matchedUser[0].branch : null;
  const isManager = user?.role === 'manager';
  
  const { data: dailySalesData, error: dailySalesError,  } = useDailySalesQuery(isManager ? managerBranch : undefined);
  const { data: weeklySalesData, error: weeklySalesError } = useWeeklySalesQuery(isManager ? managerBranch : undefined);
  const { data: monthlySalesData, error: monthlySalesError } = useMonthlySalesQuery(isManager ? managerBranch : undefined);
  const { data: yearlySalesData, error: yearlySalesError } = useYearlySalesQuery(isManager ? managerBranch : undefined);

 
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Daily',
      children: <SaleHistoryCards data={dailySalesData} error={dailySalesError} />,
    
    }
    ,
    {
      key: '2',
      label: 'Weekly',
      children: <SaleHistoryCards data={weeklySalesData} error={weeklySalesError} />,
    },
    {
      key: '3',
      label: 'Monthly',
      children: <SaleHistoryCards data={monthlySalesData} error={monthlySalesError} />,
    },
    {
      key: '4',
      label: 'Yearly',
      children: <SaleHistoryCards data={yearlySalesData} error={yearlySalesError} />,
    },
  ];
  

  return <Tabs  
 
  tabBarStyle={{ border: '2px solid', borderColor: '#C084FC' , borderRadius:'10px' , width:'300px' }}
  
 
  defaultActiveKey="1" items={items}   />;
};

export default SaleHistory;
