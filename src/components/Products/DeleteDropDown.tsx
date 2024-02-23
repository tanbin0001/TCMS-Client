
 
import type { MenuProps } from 'antd';
import { Dropdown,  Space } from 'antd';
import { useDeleteProductMutation } from '../../redux/api/productsApi/productsApi';
import { CiMenuKebab } from "react-icons/ci";
import toast from 'react-hot-toast';

interface DeleteDropDownProps {
    _id: string;
  }


const DeleteDropDown: React.FC<DeleteDropDownProps> = ({_id}) => {
    const [deleteProduct] = useDeleteProductMutation()

    
    const items: MenuProps['items'] = [
        {
          label: 'Delete Product',
          key: '1',
        },
        
      ];
      const onClick: MenuProps['onClick'] = ( ) => {
         
        deleteProduct(_id)
        toast.success('Product deleted Successfully!')
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