import { useState } from "react";
import Card from "../../components/Card";
import Heading from "../../components/shared/Heading";
import { TTourItem } from "../../type/TourType";
import Spinner from "../../components/shared/Spinner";
import toast from "react-hot-toast";

import "../../styles/Product.css";

import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";

const AllTours = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data,
    error: isGetQueryError,
    isLoading: isGetQueryLoading,
  } = useGetAllToursQuery(undefined);

  if (isGetQueryError) {
    toast.error("Failed to get tours");
  }
  const filteredProducts = data?.data?.filter((product: TTourItem) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (isGetQueryLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading title="All Products" />

      <div className="grid grid-cols-3 mt-10  ">
        {/* <DropDown onSelectedItemChange={handleSelectedItemChange} /> */}
        <div className="flex justify-center">
          <input
            className=" lg:w-96  px-4 py-1  text-lg rounded-md border-2 border-purple-400 text-gray-600 outline-purple-600"
            placeholder="Search products"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div>
        {filteredProducts?.map((product: any) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllTours;
