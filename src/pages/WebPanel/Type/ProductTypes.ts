export interface ProductImagesType {
    id: string;
    image: string;
    product: number 
}

export interface ProductsDataType {
    id: string;
    name: string;
    short_text: string;
    unit_price: string;
    publish_status: string;
    visibility: string;
    category_id: number;
    product_sequence: string;
    description: string;
    manufacturer_brand: string;
    manufacturer_name: string;
    product_price: string;
    product_photo: string;
    product_stock: string;
    product_images: any;
    create_date: string;
    last_modified: string;
    last_published_date_time: string;
    create_by: string;
  }

  