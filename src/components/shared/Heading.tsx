interface HeadingProps {
  title: string;
}
const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="text-center ">
      <p className="text-purple-500 text-2xl">
        -------------------------------
      </p>
      <h2 className="text-2xl font-bold text-center ">{title}</h2>
      <p className="text-purple-500 text-2xl">
        -------------------------------
      </p>
    </div>
  );
};

export default Heading;
