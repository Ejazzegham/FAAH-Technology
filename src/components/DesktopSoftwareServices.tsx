import ServiceCategoryMenu, {
  type ServiceCategory,
} from "@/components/ServiceCategoryMenu";

const CATEGORIES: ServiceCategory[] = [
  {
    title: "Business Management Software",
    icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />,
    items: [
      "Custom Business Software",
      "Enterprise Software",
      "Business Automation Software",
      "Office Management Software",
      "Company Management Software",
      "Workflow Automation Software",
      "Customer Relationship Management (CRM)",
      "Enterprise Resource Planning (ERP)",
    ],
  },
  {
    title: "Retail & Sales",
    icon: (
      <>
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
        <path d="M2 3h3l2.6 12.6a1.5 1.5 0 001.5 1.4h8.3a1.5 1.5 0 001.5-1.2L21 7H6" />
      </>
    ),
    items: [
      "Point of Sale (POS) Software",
      "Inventory Management System",
      "Stock Management Software",
      "Billing & Invoicing Software",
      "Barcode Management System",
      "Warehouse Management System",
      "Retail Management Software",
      "Multi-Store Management System",
    ],
  },
  {
    title: "Accounting & Finance",
    icon: <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
    items: [
      "Accounting Software",
      "Payroll Management System",
      "Expense Tracking Software",
      "Financial Management System",
      "Tax Management Software",
      "Budget Planning Software",
    ],
  },
  {
    title: "Education",
    icon: <path d="M2 9l10-5 10 5-10 5-10-5zm5 2.5V17c0 1.7 2.2 3 5 3s5-1.3 5-3v-5.5" />,
    items: [
      "School Management System",
      "College Management System",
      "University Management Software",
      "Learning Management System (LMS)",
      "Student Information System",
      "Examination Management System",
      "Library Management System",
    ],
  },
  {
    title: "Healthcare",
    icon: <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6C19 16.4 12 21 12 21zM9 11h6M12 8v6" />,
    items: [
      "Hospital Management System",
      "Clinic Management Software",
      "Laboratory Management System",
      "Pharmacy Management Software",
      "Patient Record System",
      "Medical Billing Software",
      "Appointment Management System",
    ],
  },
  {
    title: "Human Resources",
    icon: (
      <>
        <circle cx="8" cy="9" r="3" />
        <circle cx="17" cy="10" r="2.4" />
        <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 20c0-2.6-1.3-4.8-3.2-6.1M15 13.5c2.3.3 4 2.3 4 4.6" />
      </>
    ),
    items: [
      "HR Management Software",
      "Employee Management System",
      "Attendance Management System",
      "Leave Management System",
      "Recruitment Management Software",
      "Performance Management System",
    ],
  },
  {
    title: "Manufacturing",
    icon: <path d="M3 21V11l5 3v-3l5 3V8l5 3v10H3zM7 21v-4M12 21v-4M17 21v-4" />,
    items: [
      "Manufacturing ERP",
      "Production Management System",
      "Factory Management Software",
      "Quality Control System",
      "Supply Chain Management Software",
    ],
  },
  {
    title: "Logistics & Transportation",
    icon: <path d="M3 13l2-6h14l2 6M3 13v6h3v-2h12v2h3v-6M3 13h18M7 17h.01M17 17h.01" />,
    items: [
      "Fleet Management System",
      "Courier Management Software",
      "Delivery Management System",
      "Vehicle Tracking Software",
      "Transport Management System",
    ],
  },
  {
    title: "Real Estate",
    icon: <path d="M3 11l9-8 9 8M5 10v10h14V10M9 20v-6h6v6" />,
    items: [
      "Property Management Software",
      "Real Estate CRM",
      "Rental Management System",
      "Construction Project Management",
    ],
  },
  {
    title: "Hospitality",
    icon: <path d="M6 3v8a2 2 0 002 2h0a2 2 0 002-2V3M8 13v8M17 3c-1.7 0-3 2.2-3 5s1.3 5 3 5v9" />,
    items: [
      "Hotel Management Software",
      "Restaurant POS System",
      "Cafe Management Software",
      "Resort Management System",
    ],
  },
  {
    title: "Legal",
    icon: <path d="M12 3v3M5 8l7-2 7 2M5 8l-3 6h6l-3-6zM19 8l-3 6h6l-3-6zM5 21h14M12 6v9" />,
    items: [
      "Law Firm Management Software",
      "Case Management System",
      "Legal Document Management",
    ],
  },
  {
    title: "Government & Organizations",
    icon: <path d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-5h6v5M4 9h16" />,
    items: [
      "Municipality Management Software",
      "Public Service Management System",
      "NGO Management Software",
    ],
  },
  {
    title: "Security & Monitoring",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5l8-3z" />
        <circle cx="12" cy="11" r="2.4" />
      </>
    ),
    items: [
      "Visitor Management System",
      "Access Control Software",
      "CCTV Monitoring Dashboard",
      "Security Management System",
    ],
  },
  {
    title: "Project & Productivity",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4M8 14l2 2 4-4" />
      </>
    ),
    items: [
      "Project Management Software",
      "Task Management System",
      "Time Tracking Software",
      "Document Management System",
      "File Management Software",
    ],
  },
  {
    title: "Data & Reporting",
    icon: <path d="M4 20V10M11 20V4M18 20v-7" />,
    items: [
      "Dashboard & Analytics Software",
      "Reporting System",
      "Business Intelligence Dashboard",
      "Data Management Software",
    ],
  },
  {
    title: "Trading & Finance",
    icon: <path d="M3 17l6-6 4 4 8-8M15 3h6v6" />,
    items: [
      "Trading Platform",
      "Forex Trading Dashboard",
      "Cryptocurrency Trading Software",
      "AI Trading Analysis Software",
      "Market Monitoring System",
    ],
  },
  {
    title: "Specialized Industry Software",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
    items: [
      "Franchise Management System",
      "Agriculture Management Software",
      "Textile Management Software",
      "Garment Management Software",
      "Construction Management Software",
      "Automobile Workshop Management",
      "Fuel Station Management",
      "Travel Agency Management Software",
    ],
  },
  {
    title: "Utility Software",
    icon: <path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 015.4-5.4l-3 3-2-2 3-3z" />,
    items: [
      "PDF Management Tool",
      "File Converter",
      "Backup & Restore Software",
      "Data Synchronization Tool",
      "System Monitoring Software",
      "Desktop Automation Tool",
    ],
  },
  {
    title: "AI & Smart Solutions",
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
      </>
    ),
    items: [
      "AI Business Assistant",
      "AI Chatbot Desktop Application",
      "AI Data Analysis Tool",
      "Machine Learning Dashboard",
      "Predictive Analytics Software",
    ],
  },
  {
    title: "Custom Desktop Solutions",
    icon: <path d="M4 4h16v12H4zM2 20h20M9 20l1-4h4l1 4" />,
    items: [
      "Windows Desktop Application",
      "Cross-Platform Desktop Application",
      "Electron.js Desktop Software",
      "Offline Desktop Software",
      "Cloud-Integrated Desktop Software",
      "Multi-User Desktop Application",
      "Database Management Software",
      "SQLite-Based Desktop Software",
      "API Integration",
      "Custom Admin Dashboard",
      "Report Generation System",
      "Software Maintenance & Support",
    ],
  },
];

export default function DesktopSoftwareServices() {
  return (
    <ServiceCategoryMenu
      eyebrow="FULL SERVICE MENU"
      heading="Everything We Develop"
      subheading="Explore our full desktop software service menu, organized by category — tap any category to see exactly what's included."
      categories={CATEGORIES}
    />
  );
}
