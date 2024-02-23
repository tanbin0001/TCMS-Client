import { useState } from "react";
import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ImSpinner3 } from "react-icons/im";
import Spinner from "../../shared/Spinner";

const SellReportModal = ({ data }: any) => {
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sales, totalSalesRevenue, totalExpenses, profitOrLoss } = data;

  if (!data) {
    return <Spinner />;
  }

  const totalItemsSold = sales?.length;
 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const downLoadPdf = () => {
    const capture: any = document.querySelector(".invoice-items");
    setLoader(true);

    // Set the scale factor for better quality
    const scale = 2;

    html2canvas(capture, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "px", "a4");

      // Adjust canvas size based on scale
      const componentWidth = canvas.width / scale;
      const componentHeight = canvas.height / scale;

   
      const paddingX = 20; 
      const paddingY = 0; 

 
      doc.addImage(
        imgData,
        "PNG",
        paddingX,
        paddingY,
        componentWidth - 3.5 * paddingX,
        componentHeight
      );

      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  return (
    <>
      <Button
        className="bg-purple-400 text-black px-3 py-1 rounded-md hover:text-white hover:bg-purple-500"
        onClick={showModal}
      >
        See total sell report
      </Button>
      <Modal
        title="Total sell report"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="">
          <div className="invoice-items">
            <div className="mb-8 text-center flex justify-center bg-gradient-to-r from-purple-500 to-indigo-600 items-center p-4">
              <img src="/logo.png" alt="Company Logo" className="h-12 mr-2" />
              <h1 className="text-white font-extrabold text-2xl">
                SportGearHub
              </h1>
            </div>
            <div className="mb-8">
              <p className="mb-2 ">
                <span className="font-bold">Total Sales Revenue:</span> ${" "}
                {totalSalesRevenue}
              </p>
              <p className="mb-2 ">
                <span className="font-bold">Total Expense:</span> ${" "}
                {totalExpenses}
              </p>
              <p className="mb-2 ">
                <span className="font-bold">Total Sales:</span> {totalItemsSold}{" "}
              </p>
              <p className="mb-2 ">
                <span className="font-bold">
                  {profitOrLoss < 0 ? "Net Burn" : "Net Profit"}
                </span>{" "}
                {profitOrLoss}{" "}
              </p>
              <hr className="my-4 border-gray-400" />
            </div>
          </div>

          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
            onClick={downLoadPdf}
            disabled={!loader === false}
          >
            {loader ? (
              <span className="flex">
                Downloading{" "}
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </span>
            ) : (
              <span>Download</span>
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SellReportModal;
