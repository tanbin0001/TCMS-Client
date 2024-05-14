import { useParams } from "react-router-dom";
import { useGetAllRegisteredToursQuery } from "../../../redux/api/RegisterTourApi/registerTour.api";

const TourDetails = () => {
  const { _id } = useParams();
  const { data } = useGetAllRegisteredToursQuery(undefined);

  const tour = data?.data?.filter((item: any) => item._id === _id);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {tour?.[0] && (
        <>
          <h1 className="text-3xl font-bold mb-4">
            {tour[0]?.tourId?.tourName}
          </h1>
          <img
            src={tour[0]?.tourId?.imageLink}
            alt={tour[0]?.tourId?.tourName}
            className="w-full mb-4 h-96"
          />
          <p className="mb-2">
            <strong>Destination:</strong> {tour[0]?.tourId?.destination}
          </p>
          <p className="mb-2">
            <strong>Tour Creator:</strong> {tour[0]?.tourId?.tourCreator}
          </p>
          <p className="mb-2">
            <strong>Start Date:</strong>{" "}
            {tour[0]?.tourId?.startDate
              ? new Date(tour[0]?.tourId?.startDate).toLocaleDateString()
              : ""}
          </p>
          <p className="mb-2">
            <strong>End Date:</strong>{" "}
            {tour[0]?.tourId?.endDate
              ? new Date(tour[0]?.tourId?.endDate).toLocaleDateString()
              : ""}
          </p>
          <h2 className="text-xl font-bold mt-4 mb-2 text-center">
            Participants:
          </h2>
          <div className="flex flex-wrap -mx-2 justify-center">
            {tour[0]?.participants?.map((participant: any) => (
              <div
                key={participant?.userId?._id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4"
              >
                <div
                  className={`rounded-lg p-4 ${
                    participant.dueOrLoan < 0 ? "bg-red-600" : "bg-purple-200"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-center flex-col">
                    <img
                      src={participant?.userId?.imageLink}
                      alt={participant?.userId?.firstName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <span
                      className={`text-md font-semibold text-purple-800  ${
                        participant.dueOrLoan < 0
                          ? "text-white"
                          : "bg-purple-200"
                      }`}
                    >
                      {participant?.userId?.firstName}{" "}
                      {participant?.userId?.lastName}
                    </span>
                  </div>
                  <ul
                    className={`text-center   ${
                      participant.dueOrLoan < 0
                        ? "text-white"
                        : " text-purple-800"
                    }`}
                  >
                    <li className="mb-1">
                      <strong>Initial Contribution:</strong>{" "}
                      {participant?.initialContribution}
                    </li>
                    <li className="mb-1">
                      <strong>Total Spend:</strong> {participant?.totalSpend}
                    </li>
                    {/* <li className="mb-1"><strong>Other Expenses:</strong> {participant?.otherExpenses}</li> */}
                    <li className="mb-1">
                      <strong>
                        {participant?.dueOrLoan < 0
                          ? "have to pay"
                          : "will get payed"}
                        :
                      </strong>{" "}
                      {Math.abs(participant?.dueOrLoan)}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-2xl">
            <strong>Total Spend on This Tour:</strong>${" "}
            {tour[0]?.totalSpendOnThisTour}
          </p>
        </>
      )}
    </div>
  );
};

export default TourDetails;
