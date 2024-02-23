 



interface GenericInputProps {
  type: string;
  placeholder: string;
  registerFunction: any;
  defaultValue:string | undefined;
 
}


const GenericInput: React.FC<GenericInputProps> = ({   type, placeholder, registerFunction, defaultValue }) => {
  
 
   
  return (
    <div className="flex space-x-3">
   
    <input
    
      type={type}
      placeholder={placeholder}
      {...registerFunction}
      defaultValue={defaultValue || ""}
      className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-purple-500"
    />
  </div>
  )

};

export default GenericInput;