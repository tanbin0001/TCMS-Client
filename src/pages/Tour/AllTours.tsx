// import { useState } from "react";
// import Card from "../../components/Card";
// import Heading from "../../components/shared/Heading";
// import { TTourItem } from "../../type/TourType";
// import Spinner from "../../components/shared/Spinner";
// import toast from "react-hot-toast";

// import "../../styles/Product.css";

// import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../redux/features/authSlice";
// import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";

// const AllTours = () => {
//   const [searchText, setSearchText] = useState("");

//   const {
//     data,
//     error: isGetQueryError,
//     isLoading: isGetQueryLoading,
//   } = useGetAllToursQuery(undefined);

//   const { data:usersData } = useGetUsersQuery(undefined);
//   const currentUser = useSelector(selectCurrentUser);
//   const matchedUser = usersData?.data?.filter((FindingUser: any) => FindingUser._id === currentUser!._id );
//   const selectedUserData = matchedUser && matchedUser.length > 0 ? matchedUser[0] : null;

//   // Filter tours based on the tourCreator property
//   const myTours = data?.data?.filter((tour :any) => tour?.tourCreator === selectedUserData?.username);
//   console.log(myTours);

//   if (isGetQueryError) {
//     toast.error("Failed to get tours");
//   }
//   const filteredTours = myTours?.filter((tour: TTourItem) =>
//     Object.values(tour).some((value) =>
//       value.toString().toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   if (isGetQueryLoading) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       <Heading title="All Tours" />

//       <div className="  mt-10  flex justify-center ">

//         <div className="">
//           <input
//             className=" lg:w-96  px-4 py-1    text-sm rounded-md border-2 border-purple-400 text-gray-600 outline-purple-600"
//             placeholder="Search Tours ⌕.."
//             type="text"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>

//     <div className="flex justify-center">
//     <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredTours?.map((product: any) => (
//           <Card key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AllTours;

import { useState } from "react";
import Card from "../../components/Card";
import Heading from "../../components/shared/Heading";
import { TTourItem } from "../../type/TourType";
import Spinner from "../../components/shared/Spinner";
import toast from "react-hot-toast";

import "../../styles/Product.css";

import { useGetAllToursQuery } from "../../redux/api/tourApi/tour.api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useGetUsersQuery } from "../../redux/api/usersApi/users.api";

const AllTours = () => {
  const [searchText, setSearchText] = useState("");

  const {
    data,
    error: isGetQueryError,
    isLoading: isGetQueryLoading,
  } = useGetAllToursQuery(undefined);

  const { data: usersData } = useGetUsersQuery(undefined);
  const currentUser = useSelector(selectCurrentUser);
  const matchedUser = usersData?.data?.filter(
    (FindingUser: any) => FindingUser._id === currentUser!._id
  );
  const selectedUserData =
    matchedUser && matchedUser.length > 0 ? matchedUser[0] : null;

  // Filter tours based on the tourCreator property
  const myTours = data?.data?.filter(
    (tour: any) => tour?.tourCreator === selectedUserData?.username
  );

  if (isGetQueryError) {
    toast.error("Failed to get tours");
  }

  const filteredTours = myTours?.filter((tour: TTourItem) =>
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
        <div className="">
          <input
            className=" lg:w-96  px-4 py-1    text-sm rounded-md border-2 border-purple-400 text-gray-600 outline-purple-600"
            placeholder="Search Tours ⌕.."
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        {filteredTours && filteredTours.length > 0 ? (
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTours?.map((product: any) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-5 text-gray-600">
            {filteredTours
              ? "Tour not found"
              : "You haven't created any tour yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTours;
