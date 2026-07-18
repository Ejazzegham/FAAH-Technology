import ServiceCategoryMenu, {
  type ServiceCategory,
} from "@/components/ServiceCategoryMenu";

const CATEGORIES: ServiceCategory[] = [
  {
    title: "Business Websites",
    icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />,
    items: [
      "Business Website",
      "Corporate Website",
      "Startup Website",
      "Company Profile Website",
      "Personal Website",
      "Portfolio Website",
      "Agency Website",
      "Freelancer Website",
      "Consulting Website",
      "Nonprofit Website",
    ],
  },
  {
    title: "eCommerce Websites",
    icon: (
      <>
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
        <path d="M2 3h3l2.6 12.6a1.5 1.5 0 001.5 1.4h8.3a1.5 1.5 0 001.5-1.2L21 7H6" />
      </>
    ),
    items: [
      "Online Store",
      "eCommerce Website",
      "Multi-Vendor Marketplace",
      "Dropshipping Website",
      "Wholesale Website",
      "Retail Store Website",
      "Subscription-Based Store",
      "Digital Product Store",
      "Print-on-Demand Website",
      "Auction Website",
    ],
  },
  {
    title: "Education Websites",
    icon: <path d="M2 9l10-5 10 5-10 5-10-5zm5 2.5V17c0 1.7 2.2 3 5 3s5-1.3 5-3v-5.5" />,
    items: [
      "School Website",
      "College Website",
      "University Website",
      "Online Learning Platform (LMS)",
      "Coaching Institute Website",
      "Online Course Website",
      "Student Portal",
      "Teacher Portal",
    ],
  },
  {
    title: "Healthcare Websites",
    icon: <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6C19 16.4 12 21 12 21zM9 11h6M12 8v6" />,
    items: [
      "Hospital Website",
      "Clinic Website",
      "Medical Center Website",
      "Pharmacy Website",
      "Dental Clinic Website",
      "Telemedicine Platform",
      "Appointment Booking System",
    ],
  },
  {
    title: "Real Estate",
    icon: <path d="M3 11l9-8 9 8M5 10v10h14V10M9 20v-6h6v6" />,
    items: [
      "Real Estate Website",
      "Property Listing Website",
      "Rental Property Website",
      "Construction Company Website",
    ],
  },
  {
    title: "Restaurant & Hospitality",
    icon: <path d="M6 3v8a2 2 0 002 2h0a2 2 0 002-2V3M8 13v8M17 3c-1.7 0-3 2.2-3 5s1.3 5 3 5v9" />,
    items: [
      "Restaurant Website",
      "Hotel Website",
      "Cafe Website",
      "Bakery Website",
      "Food Delivery Website",
      "Online Reservation System",
    ],
  },
  {
    title: "Travel & Tourism",
    icon: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
    items: [
      "Travel Agency Website",
      "Tour Booking Website",
      "Hotel Booking Website",
      "Vacation Rental Website",
      "Airline Booking Website",
    ],
  },
  {
    title: "Finance",
    icon: <path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
    items: [
      "Banking Website",
      "Insurance Website",
      "Loan Management Website",
      "Investment Website",
      "Cryptocurrency Website",
      "FinTech Platform",
    ],
  },
  {
    title: "SaaS & Technology",
    icon: <path d="M6 15a4 4 0 01.7-7.9A5.5 5.5 0 0117 8.5a3.5 3.5 0 010 6.5H6z" />,
    items: [
      "SaaS Website",
      "Software Company Website",
      "AI Platform Website",
      "Cloud Service Website",
      "Tech Startup Website",
      "API Documentation Website",
    ],
  },
  {
    title: "Media & Entertainment",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
      </>
    ),
    items: [
      "News Website",
      "Magazine Website",
      "Blog Website",
      "Podcast Website",
      "Video Streaming Website",
      "Music Website",
    ],
  },
  {
    title: "Community & Social",
    icon: (
      <>
        <circle cx="8" cy="9" r="3" />
        <circle cx="17" cy="10" r="2.4" />
        <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 20c0-2.6-1.3-4.8-3.2-6.1M15 13.5c2.3.3 4 2.3 4 4.6" />
      </>
    ),
    items: [
      "Social Network",
      "Online Forum",
      "Membership Website",
      "Community Portal",
      "Dating Website",
    ],
  },
  {
    title: "Job & Recruitment",
    icon: <path d="M4 8h16v12H4zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M4 13h16" />,
    items: [
      "Job Portal",
      "Recruitment Website",
      "Freelance Marketplace",
      "Career Portal",
    ],
  },
  {
    title: "Booking & Scheduling",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4M8 14h2M14 14h2M8 18h2" />
      </>
    ),
    items: [
      "Appointment Booking Website",
      "Event Booking Website",
      "Ticket Booking Website",
      "Salon Booking Website",
      "Gym Booking Website",
    ],
  },
  {
    title: "Government & Public Services",
    icon: <path d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-5h6v5M4 9h16" />,
    items: [
      "Government Website",
      "Municipality Website",
      "Public Service Portal",
      "NGO Website",
    ],
  },
  {
    title: "Religious & Charity",
    icon: <path d="M12 2v20M6 8l6-6 6 6M4 14c2-2 4-3 8-3s6 1 8 3M3 21h18" />,
    items: [
      "Mosque Website",
      "Church Website",
      "Temple Website",
      "Donation Website",
      "Charity Organization Website",
    ],
  },
  {
    title: "Legal",
    icon: <path d="M12 3v3M5 8l7-2 7 2M5 8l-3 6h6l-3-6zM19 8l-3 6h6l-3-6zM5 21h14M12 6v9" />,
    items: ["Law Firm Website", "Advocate Website", "Legal Consultation Website"],
  },
  {
    title: "Automotive",
    icon: <path d="M3 13l2-6h14l2 6M3 13v6h3v-2h12v2h3v-6M3 13h18M7 17h.01M17 17h.01" />,
    items: [
      "Car Dealership Website",
      "Auto Parts Store",
      "Vehicle Rental Website",
      "Auto Repair Website",
    ],
  },
  {
    title: "Manufacturing & Industrial",
    icon: <path d="M3 21V11l5 3v-3l5 3V8l5 3v10H3zM7 21v-4M12 21v-4M17 21v-4" />,
    items: [
      "Manufacturing Company Website",
      "Factory Website",
      "Industrial Services Website",
    ],
  },
  {
    title: "Custom Web Applications",
    icon: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </>
    ),
    items: [
      "Customer Portal",
      "Employee Portal",
      "CRM Web Application",
      "ERP Web Application",
      "Inventory Management System",
      "POS Web System",
      "Hospital Management System",
      "School Management System",
      "HR Management System",
      "Accounting System",
      "Payroll Management System",
      "Project Management System",
    ],
  },
  {
    title: "Landing Pages",
    icon: <path d="M4 4h16v16H4zM4 9h16M9 13h6M9 16h3" />,
    items: [
      "Product Landing Page",
      "Sales Landing Page",
      "Marketing Landing Page",
      "Lead Generation Landing Page",
      "Coming Soon Page",
    ],
  },
  {
    title: "Specialized Websites",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
    items: [
      "Event Website",
      "Wedding Website",
      "Fitness Website",
      "Sports Website",
      "Gaming Website",
      "Photography Website",
      "Fashion Website",
      "Beauty & Salon Website",
      "Interior Design Website",
      "Architecture Website",
      "Agriculture Website",
      "Pet Care Website",
    ],
  },
  {
    title: "Website Services",
    icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 11-9-9 9 9 0 019 9z" />,
    items: [
      "Custom Website Design",
      "Responsive Web Design",
      "UI/UX Design",
      "Website Redesign",
      "Website Maintenance",
      "Website Speed Optimization",
      "SEO Optimization",
      "Website Migration",
      "CMS Development",
      "API Integration",
      "Payment Gateway Integration",
      "Website Security",
      "Progressive Web App (PWA)",
      "Admin Dashboard Development",
      "Custom Web Portal",
    ],
  },
];

export default function WebDesignServices() {
  return (
    <ServiceCategoryMenu
      eyebrow="FULL SERVICE MENU"
      heading="Everything We Build"
      subheading="Explore our full website & web app service menu, organized by category — tap any category to see exactly what's included."
      categories={CATEGORIES}
    />
  );
}
