export  type TSportsItem = {
 
    _id:string;
    name: string;
    imageLink: string;
    price: number;
    quantity: number;
    sportType: string;
    brand: string;
    size: string;
    material: string;
    color: string;
    condition: 'new' | 'used'
    weight?: number;
    style?: string;
    branch:string;
    isCheckedToDelete?:boolean;
  }
  export type  TFilterOptions = {
    sportType?: string;
    brand?: string;
    size?: string;
    priceRange?: [number, number]; 
    material?: string;
    color?: string;
    condition?: 'new' | 'used';
    weight?: number;
    style?: string;
  }
  