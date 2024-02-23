
import { Alert, Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router-dom';
import SellReportModal from './SellReportModal/SellReportModal';
import Spinner from '../shared/Spinner';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/authSlice';
 


interface DataType {
  key: string;
  productName: string;
  image: string;
  price: number;
  buyerName: string;
  quantity: number;
  data?: any; 
}



 
const SaleHistoryCards: React.FC<any> = ({ data: tableData, error }) => {
  const user = useAppSelector(selectCurrentUser);
 
 

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
 
  {
    title: 'Buyer Name',
    dataIndex: 'buyerName',
    key: 'buyerName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
 
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (item) => {
     return(
      <Space size="middle">
 <Link to={`/${user!.role}/invoice/${item._id}`}>
  <Button>Download bill</Button>
</Link>

           </Space>
     )
    },
  } 
 
];

 
  if(!tableData){
    return <Spinner/>
  }

 
  if (error) {
    
    return <Alert message="Error loading data" type="error" />;
  }

  return (
  <div>

    <Table columns={columns} dataSource={tableData?.data?.sales || []} />
 
 
 
{tableData?.data?.sales.length >0 &&  <SellReportModal data={tableData!.data} />}
  </div>
  );
};

export default SaleHistoryCards;