 

import { Card } from "antd";
import { Link } from "react-router-dom";

const TourCards: React.FC<any> = ({ data: tableData }) => {
  // If tableData is empty, render a message indicating no tours are available
  if (!tableData?.data || tableData.data.length === 0) {
    return (
      <div className="text-center  mt-5">
        You haven't registered/participated in any tour.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tableData.data.map((item: any) => (
        <Card key={item._id} title={item.tourId.tourName}>
          <img className="rounded-md mb-2" src={item.tourId.imageLink} alt="Tour Image" />
          <p><strong>Tour Creator:</strong> {item.tourId.tourCreator}</p>
          <p><strong>Destination:</strong> {item.tourId.destination}</p>
          <div className=" m">
            <Link to={`/user/tour-details/${item._id}`}>
              <button className="bg-purple-300 py-1 px-2 border rounded-md">More Details</button>
            </Link>
            <Link to={`/user/record-expense/${item._id}`}>
              <button className="bg-purple-300 py-1 px-2 mx-1 my-2 border rounded-md">Record Expense</button>
            </Link>
            <Link to={`/user/expenses-summary/${item._id}`}>
              <button className="bg-purple-300 py-1 px-2 border rounded-md">Expense Details</button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TourCards;
