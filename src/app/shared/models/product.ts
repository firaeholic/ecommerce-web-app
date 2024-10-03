export class Product {
    product!: {
      name: string;
      imagesPath: string;
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
    imagesPath!: string;
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

export class Products {
  products!: Product[];
}

export enum MeasurementUnit {
  Kg = 'Kg',
}

export enum ProductCategory {
  Cereals = 'Cereals',
  DairyProducts = 'DairyProducts',
  Fruits = 'Fruits',
  OtherProducts = 'OtherProducts',
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