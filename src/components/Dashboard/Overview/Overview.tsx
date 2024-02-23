 
import OverviewCard from "./Overview Compnents/OverviewCard";
import { BsPersonBadge } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
 import { useAllSalesQuery } from "../../../redux/api/saleHistoryApi/saleHistoryApi";
import Spinner from "../../shared/Spinner";
import { useState, useEffect } from "react";
import { CiBadgeDollar } from "react-icons/ci";


const Overview = () => {
  const [customersName, setCustomersName] = useState<any[]>([]);
 

  const [topProduct, setTopProduct] = useState('');
  const { data, isLoading: isQueryLoading } = useAllSalesQuery(undefined);

  useEffect(() => {
    if (!isQueryLoading && data) {
      const uniqueCustomerNames = [...new Set(data.data.map((sale: { buyerName: string; }) => sale.buyerName))];
      const products: { [key: string]: number } = {};
    
      data?.data?.forEach((sale: { productName: string, quantity: number })=> {
        const { productName, quantity } = sale;
        products[productName] = (products[productName] || 0) + quantity;
      });
      const maxQuantityProduct = Object.keys(products).reduce((a, b) => (products[a] > products[b] ? a : b), '');

    

      
      
      setTopProduct(maxQuantityProduct);
 
      setCustomersName(uniqueCustomerNames);
  
    }
    
  }, [isQueryLoading, data]);

  if (isQueryLoading) {
    return <Spinner />;
  }
 
  return (
    <div className="flex justify-center my-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-5">
        <OverviewCard text="Customers" element={customersName.length} icon={<BsPersonBadge />} iconColor="text-pink-500" />
        <OverviewCard text="Top Sold Product" element={topProduct} icon={<CiBadgeDollar   />} iconColor="text-yellow-500" />
        <OverviewCard text="Orders" element={data?.data?.length} icon={<CiShoppingCart />} iconColor="text-red-500" />
       
      </div>
    </div>
  );
};

export default Overview;
