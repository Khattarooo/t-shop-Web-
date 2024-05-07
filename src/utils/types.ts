export interface ProductCardProps {
  id: string;
  image: string;
  Name: string;
  price: number;
  currency: string;
  unit: string;
  isAvailable: boolean;
}
export interface ModalProps {
  closeModal: () => void;
  convertedPrice: string;
  image: string;
  Name: string;
  unit: string;
}
export interface PostCardProps {
  image_url?: string;
  title?: string;
  keywords?: string;
}

export interface Post {
  keywords?: string;
  _id: string;
  image_url?: string;
  title: string;
}

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}
