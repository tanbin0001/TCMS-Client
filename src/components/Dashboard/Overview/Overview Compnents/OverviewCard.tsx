


interface OverviewCardProps {
    text?: string
    icon?: JSX.Element;
    element?:string | number;
    iconColor?: string; 
   }
   

const OverviewCard:React.FC<OverviewCardProps>   = ({text,icon,iconColor,element}) => {
 return (
 <div className="border-2 border-purple-400 rounded-md  w-96 flex justify-between px-5 h-20 items-center">
 <div>
 <h2 className="text-gray-500">{text}</h2>
 <h1 className="font-bold text-base">{element}</h1>
 </div>
 <div className={`text-2xl ${iconColor}`}>
{icon}
 </div>
 </div>
 );
};

export default OverviewCard;