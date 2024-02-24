export  type TTourItem = {
 
    _id:string;
    tourName:      string;
    destination: string;
    tourCreator:   string;
    imageLink: string;
    startDate: Date;
    endDate: Date;
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
  