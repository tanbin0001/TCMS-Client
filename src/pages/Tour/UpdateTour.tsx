import { useParams } from "react-router-dom";
import {
  useGetAllToursQuery,
  useUpdateTourMutation,
} from "../../redux/api/tourApi/tour.api";
import { TTourItem } from "../../type/TourType";
import CustomForm from "../../components/form/CustomForm";
import Heading from "../../components/shared/Heading";
import FormInput from "../../components/form/FormInput";
import CustomDatePicker from "../../components/form/CustomDatePicker";
import { CiEdit } from "react-icons/ci";
import GenericButton from "../../components/form/GenericButton";
import Spinner from "../../components/shared/Spinner";
import { getMessageFromResponse } from "../../utils/ResponseMessage";
import toast from "react-hot-toast";
 
const UpdateTour = () => {
  const { _id } = useParams();
  const { data, isLoading: isGetQueryLoading } = useGetAllToursQuery(undefined);
  const [updateTour, { isLoading: isUpdateMutationLoading }] =
    useUpdateTourMutation();

  const tourItemToUpdate = data?.data?.find(
    (product: TTourItem) => product._id === _id
  );

  const { tourName, tourCreator, destination } = tourItemToUpdate || {};

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("updating tour");
    try{

    
    const tourInfo: any = {};
    for (const key in data) {
      if (data[key] !== undefined) {
        tourInfo[key] = data[key];
      }
    }

 

    const res = await updateTour({ tourInfo, _id });
    console.log(res);
     

    const successOrError = getMessageFromResponse(res);
    
if(successOrError.success === true) {
  toast.success(`Tour updated successfully`,{ id: toastId, duration: 2000 })
} 
  }catch(error){
    const successOrError = getMessageFromResponse(error);
    toast.error(`${successOrError.message}`,{ id: toastId, duration: 2000 })
  }
  };
  if (isGetQueryLoading || isUpdateMutationLoading) {
    return <Spinner />;
  }
  const divClass = "grid grid-cols-2 gap-2";
  return (
    <div>
      <div>
        <Heading title="Update Tour" />
        <div className="max-w-md mx-auto mt-8">
          <CustomForm onSubmit={onSubmit}>
            <FormInput
              defaultValue={tourName}
              type="text"
              name="tourName"
              label="Tour Name"
            />
            <div className={divClass}>
              <FormInput
                type="text"
                defaultValue={destination}
                name="destination"
                label="Destination"
              />
              <FormInput
                defaultValue={tourCreator || ""}
                disabled
                type="text"
                name="tourCreator"
                label="Tour Creator"
              />
            </div>

            <div className={divClass}>
              <CustomDatePicker name="startDate" label="Start Date" />
              <CustomDatePicker name="endDate" label="End Date" />
            </div>

            <GenericButton value="Update Product" icon={<CiEdit />} />
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default UpdateTour;
