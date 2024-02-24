import Heading from "../../components/shared/Heading";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../redux/api/productsApi/productsApi";
import { useParams } from "react-router-dom";
import { TSportsItem } from "../../type/TourType";
import Spinner from "../../components/shared/Spinner";
import toast from "react-hot-toast";
import GenericButton from "../../components/form/GenericButton";
import { HiOutlineDuplicate } from "react-icons/hi";
import CustomSelect from "../../components/form/CustomSelect";
import { branchOptions, conditionOptions } from "../../Constants/global";
import FormInput from "../../components/form/FormInput";
import Form from "../../components/form/CustomForm";

const DuplicateProduct = () => {
  const { _id } = useParams();
  const selectedFilters = {
    "": "",
  };

  const {
    data,

    isLoading: isQueryLoading,
  } = useGetProductsQuery(selectedFilters, {
    refetchOnMountOrArgChange: true,
  });

  const productToUpdate = data?.data?.find(
    (product: TSportsItem) => product._id === _id
  );

  const {
    name,
    price,
    quantity,
    sportType,
    brand,
    size,
    material,
    color,
    condition,
    imageLink,
    branch,
  } = productToUpdate || {};

  const [addProduct, { isLoading: isMutationLoading, isSuccess }] =
    useAddProductMutation();
  if (isQueryLoading || isMutationLoading) {
    return <Spinner />;
  }
  if (isSuccess) {
    toast.success("Product variant created successfully");
  }

  const onSubmit = async (data: any) => {
    const productInfo = data;
    await addProduct(productInfo);
  };
  const divClass = "grid grid-cols-2 gap-2";

  return (
    <div>
      <Heading title="Create Variant" />

      <div className="max-w-md mx-auto mt-8">
        <Form onSubmit={onSubmit}>
          <FormInput
            defaultValue={name || ""}
            type="text"
            name="name"
            label="Product Name"
          />

          <FormInput
            defaultValue={imageLink || ""}
            type="text"
            name="imageLink"
            label="Image Link"
          />

          <div className={divClass}>
            <FormInput
              defaultValue={price || ""}
              type="number"
              name="price"
              label="Price"
            />
            <FormInput
              defaultValue={quantity || ""}
              type="number"
              name="quantity"
              label="Product Quantity"
            />
          </div>

          <div className={divClass}>
            <FormInput
              defaultValue={sportType || ""}
              type="text"
              name="sportType"
              label="Sport Type"
            />
            <FormInput
              defaultValue={brand || ""}
              type="text"
              name="brand"
              label="Brand"
            />
          </div>

          <div className={divClass}>
            <FormInput
              defaultValue={size || ""}
              type="text"
              name="size"
              label="Size"
            />
            <FormInput
              defaultValue={material || ""}
              type="text"
              name="material"
              label="Material"
            />
          </div>

          <div className={`${divClass} items-center`}>
            <FormInput
              defaultValue={color}
              type="text"
              name="color"
              label="Color"
            />

            <CustomSelect
              defaultValue={condition}
              options={conditionOptions}
              name="condition"
              label="Select Condition"
            />
          </div>

          <CustomSelect
            defaultValue={branch}
            options={branchOptions}
            name="branch"
            label="Select Branch"
          />

          <GenericButton value="Create Variant" icon={<HiOutlineDuplicate />} />
        </Form>
      </div>
    </div>
  );
};

export default DuplicateProduct;
