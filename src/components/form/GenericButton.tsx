interface ButtonProp {
  value: string;
  icon?: JSX.Element;
}

const GenericButton: React.FC<ButtonProp> = ({ value, icon }) => {
  return (
    <div>
      <button className=" flex  justify-center items-center space-x-3 w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700">
        <input type="submit" value={value} />
        {icon}
      </button>
    </div>
  );
};

export default GenericButton;
