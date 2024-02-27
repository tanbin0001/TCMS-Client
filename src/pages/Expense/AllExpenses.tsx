import { useParams } from "react-router-dom";
import { useGetAllExpensesQuery } from "../../redux/api/ExpenseApi/expense.api";
import Spinner from "../../components/shared/Spinner";
import { useEffect, useState } from "react";
import { Table } from "antd";
import Heading from "../../components/shared/Heading";







interface PayerType {
    firstName: string;
    lastName: string;
   }











const AllExpenses = () => {
    const [allExpenseData, setAllExpenseData] = useState([]);
  const { _id } = useParams();
  const { data } = useGetAllExpensesQuery(undefined);
  console.log(data);
  const allData = data?.data;
useEffect(() => {
    if(data && allData) {

        // const filteredData = allData.filter((expense:any) => console.log(expense.registeredTourId._id ) );
        const filteredData = allData.filter((expense:any) => expense.registeredTourId._id === _id);
        
         setAllExpenseData(filteredData)
     }
},[data])
 
 
   // Define columns for the table
    const columns = [
      {
        title: 'Tour Name',
        dataIndex: 'tourName',
        key: 'tourName',
        render: (tourId : string) => tourId,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date:  Date) => new Date(date).toLocaleDateString(), // Convert date to a readable format
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Payer',
        dataIndex: 'payer',
        key: 'payer',
        render: (payer: PayerType) => {
          if (payer.lastName) {
              return `${payer.firstName} ${payer.lastName}`;
          } else {
              return payer.firstName;
          }
      }
      
      },
    ];

//   Prepare data with additional fields
    const tableData  = allExpenseData?.map((expense:any) => ({
      ...expense,
      tourName: expense.tourId.tourName,
      payer: expense.payer,
    }));

    if(!data){
        return <Spinner/>
    }
  return (
    <div className="space-y-5">
       <Heading title="Expense Summary"/>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="_id"  
      />
    </div>
  );
};

export default AllExpenses;
