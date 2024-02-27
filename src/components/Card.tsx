
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
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-md hover:bg-purple-400";

  const user = useAppSelector(selectCurrentUser);

  const formattedStartDate = moment(startDate).format("DD MMM, YYYY");
  const formattedEndDate = moment(endDate).format("DD MMM, YYYY");
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const totalDurationDays = Math.round(duration.asDays());

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg my-5">
      <div className="flex flex-col">
        <img
          className="object-cover w-96 p-2 h-56 rounded-lg"
          src={imageLink}
          alt={tourName}
        />
        <div className="p-5 flex flex-col">
          <h5 className="text-xl font-bold mb-2">{tourName}</h5>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-700">
                <span className="font-bold">Destination:</span> {destination}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Tour Creator:</span> {tourCreator}
              </p>
            </div>
            <DeleteDropDown _id={_id} />
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Start Date:</span> {formattedStartDate}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">End Date:</span> {formattedEndDate}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Total Duration:</span> {totalDurationDays} days
            </p>
          </div>
          <div className="flex items-center  ">
            <Link to={`/${user!.role}/update-tour/${_id}`}>
              <button className={buttonStyles}>
                Update Tour <FaRegEdit className="ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
