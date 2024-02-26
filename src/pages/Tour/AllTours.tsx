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

  console.log(data);

  if (isGetQueryError) {
    toast.error("Failed to get tours");
  }
  const filteredTours = data?.data?.filter((tour: TTourItem) =>
    Object.values(tour).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (isGetQueryLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading title="All Tours" />

      <div className="  mt-10  flex justify-center ">
      
        <div className="  border border-red-300">
          <input
            className=" lg:w-96  px-4 py-1    text-lg rounded-md border-2 border-purple-400 text-gray-600 outline-purple-600"
            placeholder="Search Tours"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div>
        {filteredTours?.map((product: any) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllTours;
