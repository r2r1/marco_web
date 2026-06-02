export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'potolki' | 'remont' | 'mebel' | 'management';
  imageSrc: string;
}

export interface LeadRequest {
  name: string;
  phone: string;
  service: string;
  date: string;
}