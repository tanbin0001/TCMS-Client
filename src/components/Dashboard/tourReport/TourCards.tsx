import { Button, Space, Table, TableProps } from "antd";
import { Link } from "react-router-dom";

const TourCards: React.FC<any> = ({ data: tableData, error }) => {
    console.log(tableData?.data);
    
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