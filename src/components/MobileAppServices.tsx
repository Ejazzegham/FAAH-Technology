import ServiceCategoryMenu, {
  type ServiceCategory,
} from "@/components/ServiceCategoryMenu";

const CATEGORIES: ServiceCategory[] = [
  {
    title: "Business Apps",
    icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />,
    items: [
      "Business Management App",
      "Corporate App",
      "Company App",
      "Startup App",
      "Employee Management App",
      "Customer Management App (CRM)",
      "Enterprise Mobile App",
    ],
  },
  {
    title: "eCommerce Apps",
    icon: (
      <>
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
        <path d="M2 3h3l2.6 12.6a1.5 1.5 0 001.5 1.4h8.3a1.5 1.5 0 001.5-1.2L21 7H6" />
      </>
    ),
    items: [
      "Online Shopping App",
      "Multi-Vendor Marketplace App",
      "Grocery Delivery App",
      "Food Delivery App",
      "Pharmacy Delivery App",
      "Fashion Shopping App",
      "Electronics Store App",
      "Digital Product Store App",
    ],
  },
  {
    title: "Finance Apps",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    items: [
      "Mobile Banking App",
      "Digital Wallet App",
      "Payment Gateway App",
      "Investment App",
      "Stock Trading App",
      "Cryptocurrency App",
      "Loan Management App",
      "Expense Tracker App",
    ],
  },
  {
    title: "Education Apps",
    icon: <path d="M2 9l10-5 10 5-10 5-10-5zm5 2.5V17c0 1.7 2.2 3 5 3s5-1.3 5-3v-5.5" />,
    items: [
      "School App",
      "College App",
      "University App",
      "Learning Management System (LMS) App",
      "Online Course App",
      "Language Learning App",
      "Student Portal App",
      "Teacher Portal App",
      "Quiz App",
    ],
  },
  {
    title: "Healthcare Apps",
    icon: <path d="M20 8.5c0 5-8 10-8 10s-8-5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 8.5zM8.5 11h2l1-2 2 4 1-2h2" />,
    items: [
      "Hospital Management App",
      "Clinic App",
      "Doctor Appointment App",
      "Pharmacy App",
      "Telemedicine App",
      "Health Monitoring App",
      "Fitness Tracker App",
      "Nutrition App",
    ],
  },
  {
    title: "Travel & Booking Apps",
    icon: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
    items: [
      "Travel App",
      "Hotel Booking App",
      "Flight Booking App",
      "Taxi Booking App",
      "Bus Ticket Booking App",
      "Train Booking App",
      "Tour Guide App",
    ],
  },
  {
    title: "Restaurant & Hospitality Apps",
    icon: (
      <>
        <path d="M6 3v7a2 2 0 002 2v9M6 3v18M10 3v9M18 3c-1.7 0-3 2-3 5s1.3 5 3 5v9" />
      </>
    ),
    items: [
      "Restaurant App",
      "Cafe App",
      "Hotel App",
      "Table Reservation App",
      "Food Ordering App",
      "QR Menu App",
    ],
  },
  {
    title: "Real Estate Apps",
    icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" />,
    items: [
      "Property Listing App",
      "Real Estate Marketplace App",
      "Rental Property App",
      "Construction Management App",
    ],
  },
  {
    title: "Logistics & Delivery",
    icon: (
      <>
        <rect x="2" y="8" width="12" height="9" rx="1" />
        <path d="M14 11h4l3 3v3h-7z" />
        <circle cx="7" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </>
    ),
    items: [
      "Courier Delivery App",
      "Parcel Tracking App",
      "Fleet Management App",
      "Driver App",
      "Warehouse Management App",
    ],
  },
  {
    title: "Social & Communication",
    icon: <path d="M4 5h16v11H8l-4 4V5z" />,
    items: [
      "Social Networking App",
      "Chat/Messaging App",
      "Community App",
      "Dating App",
      "Video Calling App",
      "Forum App",
    ],
  },
  {
    title: "Entertainment",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
      </>
    ),
    items: [
      "Music Streaming App",
      "Video Streaming App",
      "Movie App",
      "Podcast App",
      "Live Streaming App",
      "Event App",
    ],
  },
  {
    title: "News & Media",
    icon: <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5a2.5 2.5 0 00-2.5-2.5H4V5.5zM4 16v3a2 2 0 002 2h14M8 7h8M8 10.5h8M8 14h5" />,
    items: [
      "News App",
      "Digital Magazine App",
      "Blog Reader App",
      "RSS Reader App",
    ],
  },
  {
    title: "Productivity",
    icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 11-9-9 9 9 0 019 9z" />,
    items: [
      "Notes App",
      "To-Do App",
      "Task Management App",
      "Calendar App",
      "Document Scanner App",
      "File Manager App",
    ],
  },
  {
    title: "Utility Apps",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6" />
      </>
    ),
    items: [
      "Calculator App",
      "QR Code Scanner",
      "Barcode Scanner",
      "Weather App",
      "Flashlight App",
      "Unit Converter",
      "Currency Converter",
    ],
  },
  {
    title: "Business Automation",
    icon: <rect x="4" y="3" width="16" height="18" rx="2" />,
    items: [
      "POS Mobile App",
      "Inventory Management App",
      "ERP Mobile App",
      "HR Management App",
      "Payroll App",
      "Attendance App",
      "Accounting App",
    ],
  },
  {
    title: "On-Demand Service Apps",
    icon: <path d="M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />,
    items: [
      "Home Services App",
      "Cleaning Services App",
      "Beauty Salon App",
      "Barber Booking App",
      "Car Wash App",
      "Mechanic Service App",
    ],
  },
  {
    title: "Fitness & Lifestyle",
    icon: <path d="M6.5 6.5l11 11M4 9l3-3 2 2-3 3-2-2zm11 11l3-3-2-2-3 3 2 2zM17 4l3 3-1.5 1.5-3-3L17 4zM4 17l3 3 1.5-1.5-3-3L4 17z" />,
    items: [
      "Gym App",
      "Yoga App",
      "Meditation App",
      "Diet Planner App",
      "Habit Tracker App",
    ],
  },
  {
    title: "Smart Technology",
    icon: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2 2M17.1 17.1l2 2M4.9 19.1l2-2M17.1 6.9l2-2" />
      </>
    ),
    items: [
      "IoT App",
      "Smart Home App",
      "Home Automation App",
      "AI Assistant App",
    ],
  },
  {
    title: "Custom Mobile Solutions",
    icon: <rect x="7" y="2" width="10" height="20" rx="2" />,
    items: [
      "Custom Android App",
      "Custom iOS App",
      "Cross-Platform App",
      "Progressive Web App (PWA)",
      "Offline Mobile App",
      "Cloud-Connected App",
      "API Integration",
      "Firebase Integration",
      "Push Notification System",
      "Admin Dashboard Integration",
    ],
  },
];

export default function MobileAppServices() {
  return (
    <ServiceCategoryMenu
      eyebrow="FULL SERVICE MENU"
      heading="Every App We Build"
      subheading="Explore our full mobile app service menu, organized by category — tap any category to see exactly what's included."
      categories={CATEGORIES}
    />
  );
}
