export type Service = {
  id: number;
  name: string;
  price: number;
  time: string;
  desc: string;
};

export type ServicePoint = {
  id: number;
  name: string;
  address: string;
  phone?: string;
  lat: number;
  lon: number;
  bikesPerDay: number;
  slotsPerDay: number;
  offDays: string[];
};

export type Biker = {
  id: number;
  name: string;
  area: string;
  rating: number;
  jobs: number;
  available: boolean;
  phone?: string;
  vehicle?: string;
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const services: Service[] = [
  { id: 1, name: "Basic Wash", price: 150, time: "20 min", desc: "Exterior water wash and dry." },
  { id: 2, name: "Foam Wash", price: 250, time: "30 min", desc: "Foam wash, chain clean and dry." },
  { id: 3, name: "Full Detailing", price: 600, time: "60 min", desc: "Deep clean, polish and chain lube." },
  { id: 4, name: "Chain & Lube", price: 120, time: "15 min", desc: "Chain degrease and lubrication." },
];

// Sample data. Replace the coordinates with your own.
export const servicePoints: ServicePoint[] = [
  { id: 1, name: "Uttara Wash Point", address: "Sector 7, Uttara", phone: "01700000001", lat: 23.8759, lon: 90.3795, bikesPerDay: 25, slotsPerDay: 8, offDays: ["Fri"] },
  { id: 2, name: "Dhanmondi Wash Point", address: "Road 5, Dhanmondi", phone: "01700000002", lat: 23.7461, lon: 90.3742, bikesPerDay: 18, slotsPerDay: 6, offDays: ["Fri", "Sat"] },
  { id: 3, name: "Gulshan Wash Point", address: "Gulshan 2", phone: "01700000003", lat: 23.7925, lon: 90.4078, bikesPerDay: 30, slotsPerDay: 10, offDays: [] },
];

export const bikers: Biker[] = [
  { id: 1, name: "Rahim", area: "Central", rating: 4.8, jobs: 120, available: true },
  { id: 2, name: "Karim", area: "North", rating: 4.6, jobs: 95, available: true },
  { id: 3, name: "Sabbir", area: "Lake View", rating: 4.9, jobs: 140, available: false },
  { id: 4, name: "Tanvir", area: "Central", rating: 4.5, jobs: 70, available: true },
];
