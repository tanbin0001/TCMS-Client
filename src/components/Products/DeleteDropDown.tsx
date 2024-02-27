
 
import type { MenuProps } from 'antd';
import { Dropdown,  Space } from 'antd';
 
import { CiMenuKebab } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useDeleteTourMutation } from '../../redux/api/tourApi/tour.api';

interface DeleteDropDownProps {
    _id: string;
  }


const DeleteDropDown: React.FC<DeleteDropDownProps> = ({_id}) => {
    const [deleteTour] = useDeleteTourMutation()

    
    const items: MenuProps['items'] = [
        {
          label: 'Delete Tour',
          key: '1',
        },
        
      ];
      const onClick: MenuProps['onClick'] = ( ) => {
         
        deleteTour(_id)
        toast.success('Tour deleted Successfully!')
      };
      

 return (
    <Dropdown   menu={{ items, onClick }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
  
        <CiMenuKebab className='text-purple-500 text-2xl' />

      </Space>
    </a>
  </Dropdown>
);
 
}; 
export default DeleteDropDown;