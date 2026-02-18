export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  images: string[];
  designer?: string;
  year?: string;
  stockStatus: "instock" | "outofstock";
  // Pola ACF (Raport Stanu)
  condition: {
    status: string; // np. "Po renowacji"
    description: string;
    dimensions: string; // np. "78 x 68 x 72 cm"
  };
}
