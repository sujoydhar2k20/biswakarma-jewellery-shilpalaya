
export interface HeroBanner {
  id: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  name: string;
  image?: string | null;
  link?: string | null;
  type: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FeaturedCollection {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title?: string | null;
  content: string;
  image?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  image?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentSection {
  id: string;
  title: string;
  description?: string | null;
  footer?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: string;
  title: string;
  description1?: string | null;
  description2?: string | null;
  image?: string | null;
  years_experience?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AboutFeature {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  about_id?: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FooterContent {
  id: string;
  section: string;
  content: any;
  created_at: string;
  updated_at: string;
}
