export type PricingCategory = {
  slug: string;
  label: string;
  icon: string; // key into ICONS map in PricingExplorer.tsx
  items?: string[]; // the real services offered inside this category
};

export type PricingGroup = {
  slug: string;
  label: string;
  icon: string;
  base: number; // starting price basis used to derive the 5-tier ladder
  subcategories: PricingCategory[];
};

const ICON_POOL = [
  "logo",
  "stationery",
  "social",
  "shield",
  "browser",
  "code",
  "cart",
  "phone",
  "phoneCode",
  "desktop",
  "gear",
  "search",
  "chart",
  "play",
  "pen",
];

function makeSubcategories(entries: [string, string, string[]][]): PricingCategory[] {
  return entries.map(([slug, label, items], i) => ({
    slug,
    label,
    icon: ICON_POOL[i % ICON_POOL.length],
    items,
  }));
}

// ---------------------------------------------------------------------------
// Graphic Design — from Graphic Services.rtf
// ---------------------------------------------------------------------------
const GRAPHIC_ENTRIES: [string, string, string[]][] = [
  [
    "gd-logo-branding",
    "Logo & Branding",
    [
      "All 7 Types Logo Design",
      "Logo Redesign",
      "Brand Identity Design",
      "Brand Guidelines",
      "Brand Style Guide",
      "Corporate Identity Design",
      "Business Card Design",
      "Letterhead Design",
      "Envelope Design",
      "Email Signature Design",
      "Company Profile Design",
      "Stationery Design",
      "Brand Kit Design",
    ],
  ],
  [
    "gd-print-design",
    "Print Design",
    [
      "Flyer Design",
      "Brochure Design",
      "Tri-Fold Brochure Design",
      "Bi-Fold Brochure Design",
      "Poster Design",
      "Banner Design",
      "Roll-Up Banner Design",
      "Billboard Design",
      "Menu Design",
      "Catalogue Design",
      "Magazine Design",
      "Book Cover Design",
      "Book Layout Design",
      "Booklet Design",
      "Annual Report Design",
      "Newsletter Design",
      "Calendar Design",
      "Greeting Card Design",
      "Invitation Card Design",
      "Certificate Design",
      "ID Card Design",
    ],
  ],
  [
    "gd-marketing-advertising",
    "Marketing & Advertising",
    [
      "Social Media Post Design",
      "Social Media Banner Design",
      "Facebook Cover Design",
      "Instagram Post Design",
      "Instagram Story Design",
      "LinkedIn Banner Design",
      "X (Twitter) Banner Design",
      "YouTube Thumbnail Design",
      "YouTube Channel Art",
      "Google Display Ads",
      "Web Banner Design",
      "Email Newsletter Design",
      "Promotional Banner Design",
      "Sale Campaign Graphics",
    ],
  ],
  [
    "gd-packaging-design",
    "Packaging Design",
    [
      "Product Packaging Design",
      "Box Packaging Design",
      "Label Design",
      "Pouch Design",
      "Bottle Label Design",
      "Food Packaging Design",
      "Cosmetic Packaging Design",
      "Amazon Packaging Design",
    ],
  ],
  [
    "gd-merchandise-design",
    "Merchandise Design",
    [
      "T-Shirt Design",
      "Hoodie Design",
      "Cap Design",
      "Mug Design",
      "Tote Bag Design",
      "Jersey Design",
      "Sticker Design",
      "Merchandise Collection Design",
    ],
  ],
  [
    "gd-digital-graphics",
    "Digital Graphics",
    [
      "Website Graphics",
      "Hero Banner Design",
      "Landing Page Graphics",
      "UI Graphics",
      "Dashboard Graphics",
      "App Store Screenshots",
      "Feature Illustrations",
    ],
  ],
  [
    "gd-uiux-design",
    "UI/UX Design",
    [
      "Website UI Design",
      "Mobile App UI Design",
      "Desktop Software UI Design",
      "Dashboard UI Design",
      "Admin Panel Design",
      "Landing Page UI",
      "Wireframe Design",
      "Prototype Design",
    ],
  ],
  [
    "gd-illustration-creative",
    "Illustration & Creative",
    [
      "Vector Illustration",
      "Character Illustration",
      "Mascot Design",
      "Icon Design",
      "Icon Pack Design",
      "Infographic Design",
      "Custom Illustrations",
      "Isometric Design",
    ],
  ],
  [
    "gd-image-editing",
    "Image Editing",
    [
      "Photo Editing",
      "Background Removal",
      "Photo Retouching",
      "Color Correction",
      "Image Restoration",
      "Image Manipulation",
      "Product Photo Editing",
      "Beauty Retouching",
    ],
  ],
  [
    "gd-presentation-design",
    "Presentation Design",
    [
      "PowerPoint Presentation",
      "Pitch Deck Design",
      "Google Slides Design",
      "Keynote Presentation",
      "Business Proposal Design",
    ],
  ],
  [
    "gd-ecommerce-graphics",
    "eCommerce Graphics",
    [
      "Amazon Listing Images",
      "Product Mockups",
      "Product Infographics",
      "Product Advertisement",
      "Store Banner Design",
      "Shopify Graphics",
    ],
  ],
  [
    "gd-publishing",
    "Publishing",
    ["eBook Cover Design", "Kindle Cover Design", "Magazine Cover Design", "Journal Design", "Workbook Design"],
  ],
  [
    "gd-event-promotional",
    "Event & Promotional",
    [
      "Event Poster",
      "Event Flyer",
      "Conference Banner",
      "Stage Backdrop",
      "Trade Show Booth Graphics",
      "Wedding Card Design",
    ],
  ],
  [
    "gd-print-ready-files",
    "Print-Ready Files",
    ["CMYK/RGB Conversion", "High-Resolution Export", "Source Files (AI, PSD, SVG, EPS, PDF, CDR & More)"],
  ],
];

// ---------------------------------------------------------------------------
// Web Development & Design — from Web services.rtf
// ---------------------------------------------------------------------------
const WEB_ENTRIES: [string, string, string[]][] = [
  [
    "wd-business-websites",
    "Business Websites",
    [
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
  ],
  [
    "wd-ecommerce-websites",
    "eCommerce Websites",
    [
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
  ],
  [
    "wd-education-websites",
    "Education Websites",
    [
      "School Website",
      "College Website",
      "University Website",
      "Online Learning Platform (LMS)",
      "Coaching Institute Website",
      "Online Course Website",
      "Student Portal",
      "Teacher Portal",
    ],
  ],
  [
    "wd-healthcare-websites",
    "Healthcare Websites",
    [
      "Hospital Website",
      "Clinic Website",
      "Medical Center Website",
      "Pharmacy Website",
      "Dental Clinic Website",
      "Telemedicine Platform",
      "Appointment Booking System",
    ],
  ],
  [
    "wd-real-estate",
    "Real Estate",
    ["Real Estate Website", "Property Listing Website", "Rental Property Website", "Construction Company Website"],
  ],
  [
    "wd-restaurant-hospitality",
    "Restaurant & Hospitality",
    [
      "Restaurant Website",
      "Hotel Website",
      "Cafe Website",
      "Bakery Website",
      "Food Delivery Website",
      "Online Reservation System",
    ],
  ],
  [
    "wd-travel-tourism",
    "Travel & Tourism",
    [
      "Travel Agency Website",
      "Tour Booking Website",
      "Hotel Booking Website",
      "Vacation Rental Website",
      "Airline Booking Website",
    ],
  ],
  [
    "wd-finance",
    "Finance",
    [
      "Banking Website",
      "Insurance Website",
      "Loan Management Website",
      "Investment Website",
      "Cryptocurrency Website",
      "FinTech Platform",
    ],
  ],
  [
    "wd-saas-technology",
    "SaaS & Technology",
    [
      "Software Company Website",
      "AI Platform Website",
      "Cloud Service Website",
      "Tech Startup Website",
      "API Documentation Website",
    ],
  ],
  [
    "wd-media-entertainment",
    "Media & Entertainment",
    [
      "News Website",
      "Magazine Website",
      "Blog Website",
      "Podcast Website",
      "Video Streaming Website",
      "Music Website",
    ],
  ],
  [
    "wd-community-social",
    "Community & Social",
    ["Social Network", "Online Forum", "Membership Website", "Community Portal", "Dating Website"],
  ],
  [
    "wd-job-recruitment",
    "Job & Recruitment",
    ["Job Portal", "Recruitment Website", "Freelance Marketplace", "Career Portal"],
  ],
  [
    "wd-booking-scheduling",
    "Booking & Scheduling",
    [
      "Appointment Booking Website",
      "Event Booking Website",
      "Ticket Booking Website",
      "Salon Booking Website",
      "Gym Booking Website",
    ],
  ],
  [
    "wd-government-public-services",
    "Government & Public Services",
    ["Government Website", "Municipality Website", "Public Service Portal", "NGO Website"],
  ],
  [
    "wd-religious-charity",
    "Religious & Charity",
    ["Mosque Website", "Church Website", "Temple Website", "Donation Website", "Charity Organization Website"],
  ],
  ["wd-legal", "Legal", ["Law Firm Website", "Advocate Website", "Legal Consultation Website"]],
  [
    "wd-automotive",
    "Automotive",
    ["Car Dealership Website", "Auto Parts Store", "Vehicle Rental Website", "Auto Repair Website"],
  ],
  [
    "wd-manufacturing-industrial",
    "Manufacturing & Industrial",
    ["Manufacturing Company Website", "Factory Website", "Industrial Services Website"],
  ],
  [
    "wd-custom-web-applications",
    "Custom Web Applications",
    [
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
  ],
  [
    "wd-landing-pages",
    "Landing Pages",
    [
      "Product Landing Page",
      "Sales Landing Page",
      "Marketing Landing Page",
      "Lead Generation Landing Page",
      "Coming Soon Page",
    ],
  ],
  [
    "wd-specialized-websites",
    "Specialized Websites",
    [
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
  ],
  [
    "wd-website-services",
    "Website Services",
    [
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
  ],
];

// ---------------------------------------------------------------------------
// Mobile App Development & Design — from Mobile app services.rtf
// ---------------------------------------------------------------------------
const MOBILE_ENTRIES: [string, string, string[]][] = [
  [
    "ma-business-apps",
    "Business Apps",
    [
      "Business Management App",
      "Corporate App",
      "Company App",
      "Startup App",
      "Employee Management App",
      "Customer Management App (CRM)",
      "Enterprise Mobile App",
    ],
  ],
  [
    "ma-ecommerce-apps",
    "eCommerce Apps",
    [
      "Online Shopping App",
      "Multi-Vendor Marketplace App",
      "Grocery Delivery App",
      "Food Delivery App",
      "Pharmacy Delivery App",
      "Fashion Shopping App",
      "Electronics Store App",
      "Digital Product Store App",
    ],
  ],
  [
    "ma-finance-apps",
    "Finance Apps",
    [
      "Mobile Banking App",
      "Digital Wallet App",
      "Payment Gateway App",
      "Investment App",
      "Stock Trading App",
      "Cryptocurrency App",
      "Loan Management App",
      "Expense Tracker App",
    ],
  ],
  [
    "ma-education-apps",
    "Education Apps",
    [
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
  ],
  [
    "ma-healthcare-apps",
    "Healthcare Apps",
    [
      "Hospital Management App",
      "Clinic App",
      "Doctor Appointment App",
      "Pharmacy App",
      "Telemedicine App",
      "Health Monitoring App",
      "Fitness Tracker App",
      "Nutrition App",
    ],
  ],
  [
    "ma-travel-booking-apps",
    "Travel & Booking Apps",
    [
      "Travel App",
      "Hotel Booking App",
      "Flight Booking App",
      "Taxi Booking App",
      "Bus Ticket Booking App",
      "Train Booking App",
      "Tour Guide App",
    ],
  ],
  [
    "ma-restaurant-hospitality-apps",
    "Restaurant & Hospitality Apps",
    ["Restaurant App", "Cafe App", "Hotel App", "Table Reservation App", "Food Ordering App", "QR Menu App"],
  ],
  [
    "ma-real-estate-apps",
    "Real Estate Apps",
    ["Property Listing App", "Real Estate Marketplace App", "Rental Property App", "Construction Management App"],
  ],
  [
    "ma-logistics-delivery",
    "Logistics & Delivery",
    [
      "Courier Delivery App",
      "Parcel Tracking App",
      "Fleet Management App",
      "Driver App",
      "Warehouse Management App",
    ],
  ],
  [
    "ma-social-communication",
    "Social & Communication",
    ["Social Networking App", "Chat/Messaging App", "Community App", "Dating App", "Video Calling App", "Forum App"],
  ],
  [
    "ma-entertainment",
    "Entertainment",
    ["Music Streaming App", "Video Streaming App", "Movie App", "Podcast App", "Live Streaming App", "Event App"],
  ],
  [
    "ma-news-media",
    "News & Media",
    ["News App", "Digital Magazine App", "Blog Reader App", "RSS Reader App"],
  ],
  [
    "ma-productivity",
    "Productivity",
    ["Notes App", "To-Do App", "Task Management App", "Calendar App", "Document Scanner App", "File Manager App"],
  ],
  [
    "ma-utility-apps",
    "Utility Apps",
    [
      "Calculator App",
      "QR Code Scanner",
      "Barcode Scanner",
      "Weather App",
      "Flashlight App",
      "Unit Converter",
      "Currency Converter",
    ],
  ],
  [
    "ma-business-automation",
    "Business Automation",
    [
      "POS Mobile App",
      "Inventory Management App",
      "ERP Mobile App",
      "HR Management App",
      "Payroll App",
      "Attendance App",
      "Accounting App",
    ],
  ],
  [
    "ma-on-demand-service-apps",
    "On-Demand Service Apps",
    [
      "Home Services App",
      "Cleaning Services App",
      "Beauty Salon App",
      "Barber Booking App",
      "Car Wash App",
      "Mechanic Service App",
    ],
  ],
  [
    "ma-fitness-lifestyle",
    "Fitness & Lifestyle",
    ["Gym App", "Yoga App", "Meditation App", "Diet Planner App", "Habit Tracker App"],
  ],
  [
    "ma-smart-technology",
    "Smart Technology",
    ["IoT App", "Smart Home App", "Home Automation App", "AI Assistant App"],
  ],
  [
    "ma-custom-mobile-solutions",
    "Custom Mobile Solutions",
    [
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
  ],
];

// ---------------------------------------------------------------------------
// Desktop Software — from Desktop app services.rtf
// ---------------------------------------------------------------------------
const DESKTOP_ENTRIES: [string, string, string[]][] = [
  [
    "ds-business-management-software",
    "Business Management Software",
    [
      "Custom Business Software",
      "Enterprise Software",
      "Business Automation Software",
      "Office Management Software",
      "Company Management Software",
      "Workflow Automation Software",
      "Customer Relationship Management (CRM)",
      "Enterprise Resource Planning (ERP)",
    ],
  ],
  [
    "ds-retail-sales",
    "Retail & Sales",
    [
      "Point of Sale (POS) Software",
      "Inventory Management System",
      "Stock Management Software",
      "Billing & Invoicing Software",
      "Barcode Management System",
      "Warehouse Management System",
      "Retail Management Software",
      "Multi-Store Management System",
    ],
  ],
  [
    "ds-accounting-finance",
    "Accounting & Finance",
    [
      "Accounting Software",
      "Payroll Management System",
      "Expense Tracking Software",
      "Financial Management System",
      "Tax Management Software",
      "Budget Planning Software",
    ],
  ],
  [
    "ds-education",
    "Education",
    [
      "School Management System",
      "College Management System",
      "University Management Software",
      "Learning Management System (LMS)",
      "Student Information System",
      "Examination Management System",
      "Library Management System",
    ],
  ],
  [
    "ds-healthcare",
    "Healthcare",
    [
      "Hospital Management System",
      "Clinic Management Software",
      "Laboratory Management System",
      "Pharmacy Management Software",
      "Patient Record System",
      "Medical Billing Software",
      "Appointment Management System",
    ],
  ],
  [
    "ds-human-resources",
    "Human Resources",
    [
      "HR Management Software",
      "Employee Management System",
      "Attendance Management System",
      "Leave Management System",
      "Recruitment Management Software",
      "Performance Management System",
    ],
  ],
  [
    "ds-manufacturing",
    "Manufacturing",
    [
      "Manufacturing ERP",
      "Production Management System",
      "Factory Management Software",
      "Quality Control System",
      "Supply Chain Management Software",
    ],
  ],
  [
    "ds-logistics-transportation",
    "Logistics & Transportation",
    [
      "Fleet Management System",
      "Courier Management Software",
      "Delivery Management System",
      "Vehicle Tracking Software",
      "Transport Management System",
    ],
  ],
  [
    "ds-real-estate",
    "Real Estate",
    ["Property Management Software", "Real Estate CRM", "Rental Management System", "Construction Project Management"],
  ],
  [
    "ds-hospitality",
    "Hospitality",
    ["Hotel Management Software", "Restaurant POS System", "Cafe Management Software", "Resort Management System"],
  ],
  ["ds-legal", "Legal", ["Law Firm Management Software", "Case Management System", "Legal Document Management"]],
  [
    "ds-government-organizations",
    "Government & Organizations",
    ["Municipality Management Software", "Public Service Management System", "NGO Management Software"],
  ],
  [
    "ds-security-monitoring",
    "Security & Monitoring",
    [
      "Visitor Management System",
      "Access Control Software",
      "CCTV Monitoring Dashboard",
      "Security Management System",
    ],
  ],
  [
    "ds-project-productivity",
    "Project & Productivity",
    [
      "Project Management Software",
      "Task Management System",
      "Time Tracking Software",
      "Document Management System",
      "File Management Software",
    ],
  ],
  [
    "ds-data-reporting",
    "Data & Reporting",
    [
      "Dashboard & Analytics Software",
      "Reporting System",
      "Business Intelligence Dashboard",
      "Data Management Software",
    ],
  ],
  [
    "ds-trading-finance",
    "Trading & Finance",
    [
      "Trading Platform",
      "Forex Trading Dashboard",
      "Cryptocurrency Trading Software",
      "AI Trading Analysis Software",
      "Market Monitoring System",
    ],
  ],
  [
    "ds-specialized-industry-software",
    "Specialized Industry Software",
    [
      "Franchise Management System",
      "Agriculture Management Software",
      "Textile Management Software",
      "Garment Management Software",
      "Construction Management Software",
      "Automobile Workshop Management",
      "Fuel Station Management",
      "Travel Agency Management Software",
    ],
  ],
  [
    "ds-utility-software",
    "Utility Software",
    [
      "PDF Management Tool",
      "File Converter",
      "Backup & Restore Software",
      "Data Synchronization Tool",
      "System Monitoring Software",
      "Desktop Automation Tool",
    ],
  ],
  [
    "ds-ai-smart-solutions",
    "AI & Smart Solutions",
    [
      "AI Business Assistant",
      "AI Chatbot Desktop Application",
      "AI Data Analysis Tool",
      "Machine Learning Dashboard",
      "Predictive Analytics Software",
    ],
  ],
  [
    "ds-custom-desktop-solutions",
    "Custom Desktop Solutions",
    [
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
  ],
];

// The 4 top-level cards shown on the Pricing page. Click a card to reveal
// every real sub-category (and its own 5-tier pricing) that belongs to it.
export const PRICING_GROUPS: PricingGroup[] = [
  {
    slug: "graphic-design",
    label: "Graphic Design",
    icon: "logo",
    base: 25,
    subcategories: makeSubcategories(GRAPHIC_ENTRIES),
  },
  {
    slug: "web-development",
    label: "Web Develop and Design",
    icon: "code",
    base: 90,
    subcategories: makeSubcategories(WEB_ENTRIES),
  },
  {
    slug: "mobile-app-development",
    label: "Mobile App Develop and Design",
    icon: "phoneCode",
    base: 250,
    subcategories: makeSubcategories(MOBILE_ENTRIES),
  },
  {
    slug: "desktop-software",
    label: "Desktop Software",
    icon: "desktop",
    base: 300,
    subcategories: makeSubcategories(DESKTOP_ENTRIES),
  },
];

// Flattened list of every sub-category, kept for backward compatibility with
// code that expects a single flat array (e.g. the Firestore fallback).
export const PRICING_CATEGORIES: PricingCategory[] = PRICING_GROUPS.flatMap(
  (g) => g.subcategories
);

export type PricingTier = {
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  stars: number;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const TIER_NAMES = ["Starter", "Professional", "Business", "Premium", "Enterprise"] as const;

function roundPrice(n: number): number {
  if (n < 100) return Math.round(n / 5) * 5;
  if (n < 1000) return Math.round(n / 10) * 10;
  return Math.round(n / 25) * 25;
}

// Derives 5 distinct price points for a category from the group's base price
// and how many real services that category bundles — bigger categories with
// more services carry a higher starting price than smaller ones.
function tierPrices(base: number, itemCount: number): [string, string, string, string, string] {
  const factor = 1 + Math.min(itemCount, 20) / 25; // roughly 1.0 – 1.8x
  const starter = roundPrice(base * factor);
  const professional = roundPrice(starter * 2);
  const business = roundPrice(starter * 3.6);
  const premium = roundPrice(starter * 6);
  return [`$${starter}`, `$${professional}`, `$${business}`, `$${premium}`, "Custom"];
}

// Builds tier-appropriate feature lists straight from the category's real
// service list, so every package reflects the actual services on offer.
function tierFeatures(
  items: string[],
  label: string
): [string[], string[], string[], string[], string[]] {
  const n = items.length;
  const pick = (count: number) => items.slice(0, Math.min(count, n));
  const withMore = (arr: string[]) => {
    const remaining = n - arr.length;
    return remaining > 0 ? [...arr, `+${remaining} More ${label} Options`] : arr;
  };

  return [
    [...pick(1), "1 Revision", "Source Files", "Delivery in 3 Days", "Email Support"],
    [...withMore(pick(3)), "3 Revisions", "Source Files", "Priority Queue", "Delivery in 5 Days", "Chat Support"],
    [...withMore(pick(6)), "Unlimited Revisions", "Dedicated Specialist", "Priority Support", "Delivery in 7 Days"],
    [
      ...withMore(pick(10)),
      "Unlimited Revisions",
      "Dedicated Team",
      "Priority Support",
      "Performance Report",
      "Delivery in 10 Days",
    ],
    [
      `All ${n} ${label} Services`,
      "Unlimited Revisions",
      "Dedicated Account Manager",
      "SLA & Reporting",
      "Custom Requirements",
    ],
  ];
}

function buildTiers(config: {
  prices: [string, string, string, string, string];
  features: [string[], string[], string[], string[], string[]];
  priceNote?: string;
  enterpriseNote?: string;
}): PricingTier[] {
  const { prices, features } = config;
  const priceNote = config.priceNote ?? "One Time";
  const enterpriseNote = config.enterpriseNote ?? "Get a Quote";

  return TIER_NAMES.map((name, i) => ({
    name,
    price: prices[i],
    priceNote: name === "Enterprise" ? enterpriseNote : priceNote,
    badge: name === "Business" ? "MOST POPULAR" : undefined,
    stars: i + 1,
    features: features[i],
    cta: name === "Enterprise" ? "GET A QUOTE" : "ORDER NOW",
    highlighted: name === "Business",
  }));
}

export function getPricingTiers(slug: string): PricingTier[] {
  for (const group of PRICING_GROUPS) {
    const sub = group.subcategories.find((s) => s.slug === slug);
    if (sub) {
      const items = sub.items ?? [];
      return buildTiers({
        prices: tierPrices(group.base, items.length),
        features: tierFeatures(items, sub.label),
      });
    }
  }

  // Fallback for any slug not found above.
  const category = PRICING_CATEGORIES.find((c) => c.slug === slug);
  const label = category?.label ?? "Service";
  return buildTiers({
    prices: ["$49", "$99", "$179", "$299", "Custom"],
    features: [
      [`Basic ${label}`, "1 Revision", "Source Files", "Delivery in 3 Days", "Email Support"],
      [`Advanced ${label}`, "3 Revisions", "Source Files", "Priority Queue", "Delivery in 4 Days", "Chat Support"],
      [`Complete ${label}`, "Unlimited Revisions", "Source Files", "Strategy Session", "Priority Support", "Delivery in 5 Days"],
      [`Full ${label} Suite`, "Unlimited Revisions", "Dedicated Specialist", "Priority Support", "Performance Report", "Delivery in 7 Days"],
      [`Enterprise ${label}`, "Unlimited Revisions", "Dedicated Team", "SLA & Reporting", "Priority Support", "Custom Requirements"],
    ],
  });
}
