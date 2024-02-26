import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteDropDown from "./Products/DeleteDropDown";

import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/authSlice";
import moment from "moment";
import { TTourItem } from "../type/TourType";

const Card: React.FC<{ product: TTourItem }> = ({ product }) => {
  const {
    _id,
    tourName,
    imageLink,
    destination,
    tourCreator,
    startDate,
    endDate,
  } = product;
 
  const buttonStyles =
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  bg-purple-500 rounded-md hover:bg-purple-400";

  const user = useAppSelector(selectCurrentUser);

  const formattedStartDate = moment(startDate).format("DD MMM, YYYY");
  const formattedEndDate = moment(endDate).format("DD MMM, YYYY");
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const totalDurationDays = Math.round(duration.asDays());

  return (
    <div className="w-full  bg-white border border-gray-200 rounded-lg shadow   my-5">
      <div className="flex justify-between items-start ">
        <div className="lg:flex items-center space-y-5 ">
          <img
            className="rounded-lg lg:w-64 ml-1.5  w-full h-56"
            src={imageLink}
            alt=""
          />

          <div className="p-5">
            <div className=" flex justify-between items-center  ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-black">
                {tourName}
              </h5>

              <DeleteDropDown _id={_id} />
            </div>

            <div className="flex space-x-3">
              <p className="mb-3 font-normal text-gray-700  ">
                <span className="font-bold "> Destination:</span> {destination}
              </p>
              <p className="mb-3 font-normal text-gray-700  ">
                <span className="font-bold "> Tour Creator:</span> {tourCreator}
              </p>
            </div>
            <div className="flex space-x-3">
              <p className="mb-3 font-normal text-gray-700  ">
                <span className="font-bold "> Start Date:</span>{" "}
                {formattedStartDate}
              </p>
              <p className="mb-3 font-normal text-gray-700  ">
                {" "}
                <span className="font-bold "> End Date:</span>{" "}
                {formattedEndDate}
              </p>
            </div>
            <div className="flex space-x-3">
              <p className="mb-3 font-normal text-gray-700  ">
                <span className="font-bold "> Total Duration:</span>{" "}
                {totalDurationDays} days
              </p>
            </div>

            <div className="flex  items-center  gap-5">
              <>
              
                <Link to={`/${user!.role}/update-tour/${_id}`}>
                  <button className={buttonStyles}>
                    Update Tour <FaRegEdit />
                  </button>
                </Link>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
