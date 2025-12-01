//import type { Category } from './Category'
//import type { UnitOfMeasure } from './UnitOfMeasure'

export type Product = {
  _id: string;                    
  name: string;
  price: number;
  image: string;                 
  description?: string;
  //category: Category[];            
  //unitOfMeasure: UnitOfMeasure;
  stock: number;
  glutenFree: boolean;
  brand?: string;
}