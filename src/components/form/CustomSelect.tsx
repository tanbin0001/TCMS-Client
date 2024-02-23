 

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TCustomSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  defaultValue?:string;
};

const CustomSelect = ({
  label,
  name,
  options,
  disabled ,mode,defaultValue
}: TCustomSelectProps) => {
  return (
    <Controller   defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item    >
          <label className="     text-gray-700 font-semibold" htmlFor="">{label}</label>
          <Select
          className=" "
          defaultValue={defaultValue}
          mode={mode}
            {...field}
            style={{ width: "100%" }}
            options={options}
    
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
