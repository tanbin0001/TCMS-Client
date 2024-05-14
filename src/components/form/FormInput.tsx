import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  disabled?: boolean | undefined;
};

const FormInput = ({
  type,
  name,
  label,
  defaultValue,
  disabled,
}: TInputProps) => {
  return (
    <div className="   text-start">
      {label ? (
        <label className="     text-gray-700 font-semibold">{label}</label>
      ) : null}
      <Controller
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <Input
            className="w-full  px-4 py-2 mb-4 border  rounded-md focus:outline-none focus:border-purple-500"
            defaultValue={defaultValue}
            disabled={disabled}
            {...field}
            type={type}
            id={name}
          />
        )}
      />
    </div>
  );
};

export default FormInput;
