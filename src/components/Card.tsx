

import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

// import SaleProductModal from "./SaleProducts/SaleProductModal";
 
import DeleteDropDown from "./Products/DeleteDropDown";
import { TSportsItem } from "../type/ProductType";
import { HiOutlineDuplicate } from "react-icons/hi";
import {  useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/authSlice";
 
 
 const Card: React.FC<{ product: TSportsItem; checkedProductsToDelete: string[]; setCheckedProductsToDelete: React.Dispatch<React.SetStateAction<string[]>>;  onCheckboxChange: (isChecked: boolean) => void; }> = ({
   product,
   checkedProductsToDelete,
   onCheckboxChange,
   
 }) => {
    const {_id,name,price,quantity,sportType,brand,size,material,color,condition,imageLink} = product;
 const buttonStyles =  "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  bg-purple-500 rounded-md hover:bg-purple-400"
 const [isChecked, setIsChecked] = useState(false);
 const user = useAppSelector(selectCurrentUser);
 
 

const handleCheckboxChange = async () => {
  setIsChecked((prevIsChecked) => !prevIsChecked);
  onCheckboxChange(!isChecked);
 
}


 const collectCheckedProducts = () => {

   if (!isChecked) {
 
     const checkedProduct = {
       _id,
       name,
       price,
       quantity,
       sportType,
       brand,
       size,
       material,
       color,
       condition,
       imageLink,
     }; 
 
 
  checkedProductsToDelete.push(checkedProduct._id)
 

 
}
};
 
 
   
 return (
 

<div className="w-full  bg-white border border-gray-200 rounded-lg shadow   my-5">
   
 
<div className="flex justify-between items-start ">

<div className="lg:flex items-center space-y-5 ">
   <img className="rounded-lg lg:w-64 ml-1.5  w-full h-56" src={imageLink} alt="" />
 
 <div className="p-5">
   <div className=" flex justify-between items-center  ">
         <h5 className="mb-2 text-2xl font-bold tracking-tight  text-black">{name}</h5>
  
            <DeleteDropDown  _id={_id}/>
   </div>

  <div className="flex space-x-3">
  <p className="mb-3 font-normal text-gray-700  "><span className="font-bold ">  Price:</span> ${price}</p>
     <p className="mb-3 font-normal text-gray-700  "><span className="font-bold ">   Quantity:</span> {quantity}</p>
  </div>
  <div className="flex space-x-3">
  <p className="mb-3 font-normal text-gray-700  "><span className="font-bold ">  SportType:</span> {sportType}</p>
     <p className="mb-3 font-normal text-gray-700  "> <span className="font-bold ">  Brand:</span> {brand}</p>
     <p className="mb-3 font-normal text-gray-700  "> <span className="font-bold ">  Condition:</span> {condition}</p>
  </div>
  <div className="flex space-x-3">
  <p className="mb-3 font-normal text-gray-700  "><span className="font-bold ">  Size:</span> {size}</p>
     <p className="mb-3 font-normal text-gray-700  "> <span className="font-bold ">  Material:</span> {material}</p>
     <p className="mb-3 font-normal text-gray-700  "> <span className="font-bold ">  Color:</span> {color}</p>
  </div>


 <div className="flex  items-center  gap-5">

 

    
                <>
                  <Link to={`/${user!.role}/duplicate-product/${_id}`}>
                    <button className={buttonStyles}>
                      <HiOutlineDuplicate className="mr-2" /> Create Variant
                    </button>
                  </Link>
                  <Link to={`/${user!.role}/update-products/${_id}`}>
                    <button className={buttonStyles}>
                      <FaRegEdit />
                    </button>
                  </Link>
                </>
 


       
    
 </div>


 </div>
</div>
<input className="size-4 m-2" type="checkbox" name="" id="" checked={isChecked} onChange={handleCheckboxChange} onClick={collectCheckedProducts} />
   </div>
</div>

 );
};

export default Card;