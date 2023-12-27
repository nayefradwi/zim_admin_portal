export interface Retailer {
  id: number;
  name: string;
  lat: number;
  lng: number;
  contacts: RetailerContact[];
}

export interface RetailerContact {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  website: string;
}
