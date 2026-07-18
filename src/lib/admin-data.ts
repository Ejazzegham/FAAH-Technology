export const STATS = [
  { label: "Total Projects", value: "156", change: "+12.5%", up: true, icon: "briefcase" },
  { label: "Total Clients", value: "89", change: "+9.8%", up: true, icon: "users" },
  { label: "Total Reviews", value: "64", change: "+14.2%", up: true, icon: "star" },
  { label: "Messages", value: "23", change: "-4.3%", up: false, icon: "mail" },
  { label: "Subscribers", value: "532", change: "+18.7%", up: true, icon: "userPlus" },
] as const;

export const PERFORMANCE_DATA = [
  { day: "May 1", value: 32 },
  { day: "May 6", value: 48 },
  { day: "May 11", value: 40 },
  { day: "May 16", value: 68 },
  { day: "May 21", value: 55 },
  { day: "May 26", value: 74 },
  { day: "May 31", value: 60 },
];

export const CATEGORY_SPLIT = [
  { label: "Web Design", value: 32, pct: "20.5%", color: "#f2b134" },
  { label: "Web Development", value: 28, pct: "17.9%", color: "#2fd0c9" },
  { label: "Mobile App", value: 24, pct: "15.4%", color: "#7c4dff" },
  { label: "Graphic Design", value: 26, pct: "16.7%", color: "#ff4d6d" },
  { label: "Desktop Software", value: 18, pct: "11.5%", color: "#3a3a42" },
  { label: "Others", value: 28, pct: "17.9%", color: "#6b6b74" },
];

export type ProjectStatus = "Completed" | "In Progress";

export const RECENT_PROJECTS: {
  id: number;
  title: string;
  category: string;
  client: string;
  date: string;
  status: ProjectStatus;
}[] = [
  { id: 1, title: "E-Commerce Website", category: "Web Design", client: "TechCorp", date: "May 28, 2024", status: "Completed" },
  { id: 2, title: "Mobile Banking App", category: "Mobile App", client: "FinBank", date: "May 27, 2024", status: "In Progress" },
  { id: 3, title: "Brand Identity Design", category: "Graphic Design", client: "Brandify", date: "May 26, 2024", status: "Completed" },
  { id: 4, title: "Custom CRM Software", category: "Desktop Software", client: "DataSoft", date: "May 25, 2024", status: "In Progress" },
  { id: 5, title: "Corporate Website", category: "Web Development", client: "Global Inc.", date: "May 24, 2024", status: "Completed" },
];

export const RECENT_REVIEWS = [
  { name: "John Smith", rating: 5, time: "2 min ago", text: "Excellent work! The team delivered exactly what we wanted." },
  { name: "Emily Johnson", rating: 5, time: "1 hour ago", text: "Great communication and on-time delivery. Highly recommended!" },
  { name: "Michael Brown", rating: 4, time: "3 hours ago", text: "Very professional and skilled team. Will work with them again." },
  { name: "Sarah Williams", rating: 5, time: "5 hours ago", text: "Amazing experience! The results exceeded our expectations." },
];

export const SUBSCRIBERS_DATA = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 52 },
  { month: "May", value: 60 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 65 },
  { month: "Aug", value: 58 },
  { month: "Sep", value: 70 },
  { month: "Oct", value: 62 },
  { month: "Nov", value: 68 },
  { month: "Dec", value: 75 },
];

export const TOP_PAGES = [
  { id: 1, page: "Home", views: "3,256" },
  { id: 2, page: "Portfolio", views: "2,458" },
  { id: 3, page: "Services", views: "1,986" },
  { id: 4, page: "Pricing", views: "1,652" },
  { id: 5, page: "About Us", views: "1,256" },
];

export const PORTFOLIO_CATEGORIES = [
  "Web Design",
  "Web Development",
  "Mobile App",
  "Graphic Design",
  "Desktop Software",
];
