export interface ProductProps {
  id: string;
  Name: string;
  isAvailable: boolean;
  image: string;
  price: number;
  currency: string;
  unit: string;
}
export interface PostProps {
  _id?: string;
  image_url?: string | null;
  title: string;
  description: string;
}
