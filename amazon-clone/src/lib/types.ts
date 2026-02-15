export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specs: Record<string, string>;
  features: string[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  label: string;
  isDefault: boolean;
}

export type PaymentMethodType = "credit_card" | "debit_card" | "upi" | "net_banking";

export interface SavedPaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  isDefault: boolean;
  // Credit/Debit card fields
  cardNumber?: string;       // stored masked: **** **** **** 1234
  cardLast4?: string;
  nameOnCard?: string;
  expiry?: string;
  // UPI fields
  upiId?: string;
  // Net Banking fields
  bankName?: string;
}

export interface PaymentInfo {
  type: PaymentMethodType;
  displayText: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

export interface Deal {
  id: string;
  product: Product;
  endTime: string;
  originalPrice: number;
  dealPrice: number;
}
