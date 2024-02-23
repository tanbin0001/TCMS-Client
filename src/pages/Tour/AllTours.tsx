import { useState } from "react";
import Card from "../../components/Card";
import DropDown from "../../components/Products/DropDown";
import Heading from "../../components/shared/Heading";
import { useDeleteMultipleProductsMutation, useGetProductsQuery } from "../../redux/api/productsApi/productsApi";
import { TSportsItem } from "../../type/ProductType";
import Spinner from "../../components/shared/Spinner";
import toast from "react-hot-toast";
 
import '../../styles/Product.css'
 
import { Slider } from "antd";






const AllTours = () => {
  const [selectedItemLabel, setSelectedItemLabel] = useState<string | null>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const [checkedProductsToDelete, setCheckedProductsToDelete] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
 
  

  const[toggleCheck,setToggleCheck] = useState(Boolean);
 
 

  const [inputValue, setInputValue] = useState<string>("");
  const [deleteMultipleProducts,{isSuccess: isDeletedQuery, isError:isDeletedQueryError}] =
  useDeleteMultipleProductsMutation()
if(isDeletedQuery){
  toast.success('Product deleted Successfully')
}  
if(isDeletedQueryError){
  toast.error('Something went wrong!')
}
 
  const selectedFilters =
  selectedItemLabel === "All"
    ? {}
    : selectedItemLabel === "priceRange"
    ? {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      }
    : {
        [selectedItemLabel || ""]: inputValue,
      };


  const { data, error:isGetQueryError , isLoading:isGetQueryLoading } = useGetProductsQuery(selectedFilters);
 
  if(isGetQueryError){
    toast.error('Failed to get products')
  }
  const filteredProducts = data?.data?.filter((product: TSportsItem) =>
  Object.values(product).some((value) =>
    value.toString().toLowerCase().includes(searchText.toLowerCase())
  )
);

  if (isGetQueryLoading) {
    return <Spinner />;
  }

  

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelectedItemChange = (label: string | null) => {
    setSelectedItemLabel(label);
  };

  
  const handleDeleteAllProducts = async () => {
    if (checkedProductsToDelete.length > 0) {
      
      await deleteMultipleProducts(checkedProductsToDelete);
      setCheckedProductsToDelete([]);
    }else{
      toast.error('Please select items to delete!')
    }
  };

  const handleCheckboxChange = (isChecked: boolean) => {
 
    setToggleCheck(isChecked)
    console.log('isChecked in Products =>', isChecked);
  };

  const handleSliderChange = (values: number[] | [number, number]) => {
    setPriceRange((values) as  [number, number] );
 
  };

 
  


  return (
    <div>
      <Heading title="All Products" />
    

      <div className="grid grid-cols-3 mt-10  ">
        <DropDown onSelectedItemChange={handleSelectedItemChange} />
 <div className="flex justify-center">

        <input
          className=" lg:w-96  px-4 py-1  text-lg rounded-md border-2 border-purple-400 text-gray-600 outline-purple-600"
          placeholder="Search products"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          />
          </div>
     <div className="flex justify-end">
     {toggleCheck && (
         <button className="bg-purple-400  p-2 rounded-md text-white hover:bg-purple-800" onClick={handleDeleteAllProducts}  >Delete All</button>
       )}
 
     </div>

      </div>
     
      {selectedItemLabel && (selectedItemLabel !== "All" && selectedItemLabel !== "priceRange") && (
  <div>
    {selectedItemLabel}:{" "}
    <input
      className="border-2 border-purple-500 w-72 h-10 rounded-md pl-4 "
      type="text"
      value={inputValue}
      placeholder="Search "
      onChange={(e) => handleInputChange(e.target.value)}
    />
  </div>
)}
 {selectedItemLabel === "priceRange" && ( 
   <div>
   <p>Select Price Range</p>
   <Slider onChange={(values) => handleSliderChange(values)} className="w-80" range max={2000}defaultValue={[0, 2000]}  />
       
      </div>

  
)}
 
 
      

      <div>
        {filteredProducts?.map((product: TSportsItem) => (
          <Card key={product._id} 
          checkedProductsToDelete={checkedProductsToDelete}
          setCheckedProductsToDelete={setCheckedProductsToDelete}
          product={product}
          onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>

    </div>
  );
};

export default AllTours;
