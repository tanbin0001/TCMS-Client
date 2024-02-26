import { Button, Space, Table, TableProps } from "antd";
import { Link } from "react-router-dom";

const TourCards: React.FC<any> = ({ data: tableData }) => {
 
    
const columns: TableProps<any>['columns'] = [
    {
      title: 'Tour Name',
      dataIndex: ['tourId', 'tourName'],
      key: 'tourName',
      render: (text) => <a>{text}</a>,
    },
   
    {
      title: 'Tour Creator',
      dataIndex: ['tourId', 'tourCreator'],
      key: 'buyerName',
    },
    {
      title: 'Destination',
      dataIndex: ['tourId', 'destination'],
      key: 'buyerName',
    } ,
   
    
   
    
    {
      title: 'Action',
      key: 'action',
      render: (item) => {
       return(
        <Space size="middle">
   <Link to={`/user/tour-details/${item._id}`}>
    <Button>More Details</Button>
  </Link>
  
             </Space>
       )
      },
    }, 
    {
      title: 'Record Expense',
      key: 'action',
      render: (item) => {
        console.log(item,'from item');
       return(
        <Space size="middle">
   <Link to={`/user/record-expense/${item._id}`}>
   <Button>Record Expense</Button>
  </Link>
  
             </Space>
       )
      },
    } ,
    {
      title: 'Expense Details',
      key: 'action',
      render: (item) => {
        console.log(item,'from item');
       return(
        <Space size="middle">
   <Link to={`/user/expenses-summary/${item._id}`}>
   <Button> expense details</Button>
  </Link>
  
             </Space>
       )
      },
    } 
   
  ];
  return (
    <div>
  
      <Table columns={columns} dataSource={tableData?.data || []} />
   
   
   
  {/* {tableData?.data?.sales.length >0 &&  <SellReportModal data={tableData!.data} />} */}
    </div>
    );
};

export default TourCards;