export class Product {
    product!: {
      name: string;
      imagesPath: string[];
      category: ProductCategory | null;
      price: number;
      maxAmount: number;
      amountLeft: number;
      originalAmount: number;
      unit: MeasurementUnit | null;
      productRequestID: number | null;
      productRequest: ProductRequest | null; 
      id: number;
      created: string;
      lastModified: string; 
    }

    name!: string;
    imagesPath!: string[];
    category!: ProductCategory | null;
    price!: number;
    maxAmount!: number;
    amountLeft!: number;
    originalAmount!: number;
    unit!: MeasurementUnit | null;
    productRequestID!: number | null;
    productRequest!: ProductRequest | null; 
    id!: number;
    created!: string;
    lastModified!: string; 
}

export interface cartProduct {
  id: number;
  name: string;
  imagesPath: string[];
  category: ProductCategory | null;
  price: number;
  maxAmount: number;
  amountLeft: number;
  originalAmount: number;
  unit: MeasurementUnit | null;
  productRequestID: number | null;
  productRequest: ProductRequest | null;
  created: string;
  lastModified: string;
  quantity: number;
}

export class AddProduct{
  name!: string;
  images!: File[];
  category!: string;
  price!: number;
  amountLeft!: number;
  description!: string;
  originalAmount!: number;
}

export class Products {
  products!: Product[];
}

export enum MeasurementUnit {
  Kg = 'Kg',
}

export enum ProductCategory {
  Cereals = 'Cereals',
  DairyProducts = 'Dairy Products',
  Fruits = 'Fruits',
  OtherProducts = 'Other Products',
  Vegetables = 'Vegetables',
}

export class ProductRequest {
  producerName!: string;
  contactInformation!: string;
  businessLicenseFilePath!: string;
  name!: string;
  imagesPath!: string;
  category!: ProductCategory;
  price!: number;
  maxAmount!: number;
  unit!: MeasurementUnit;
}

export class UpdateProductModel {
  id!: number;
  producerName?: string | null;
  producerPhone?: string | null;
  images?: File[] | null;
  name?: string | null;
  description?: string | null;
  category?: ProductCategory | null;
  price?: number | null;
  originalAmount?: number | null;
  amountLeft?: number | null;

}