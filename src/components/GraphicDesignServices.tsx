import ServiceCategoryMenu, {
  type ServiceCategory,
} from "@/components/ServiceCategoryMenu";

const CATEGORIES: ServiceCategory[] = [
  {
    title: "Logo & Branding",
    icon: <path d="M12 2l2.4 4.86L20 8l-4 3.9.94 5.5L12 15l-4.94 2.4L8 11.9 4 8l5.6-1.14L12 2z" />,
    items: [
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
  },
  {
    title: "Print Design",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    items: [
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
  },
  {
    title: "Marketing & Advertising",
    icon: <path d="M4 20V10M11 20V4M18 20v-7" />,
    items: [
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
  },
  {
    title: "Packaging Design",
    icon: <path d="M3 8l9-5 9 5-9 5-9-5zm0 0v9l9 5 9-5V8M12 13v9" />,
    items: [
      "Product Packaging Design",
      "Box Packaging Design",
      "Label Design",
      "Pouch Design",
      "Bottle Label Design",
      "Food Packaging Design",
      "Cosmetic Packaging Design",
      "Amazon Packaging Design",
    ],
  },
  {
    title: "Merchandise Design",
    icon: <path d="M8 4l2 2h4l2-2 3 3-2 2v11H5V9L3 7l3-3z" />,
    items: [
      "T-Shirt Design",
      "Hoodie Design",
      "Cap Design",
      "Mug Design",
      "Tote Bag Design",
      "Jersey Design",
      "Sticker Design",
      "Merchandise Collection Design",
    ],
  },
  {
    title: "Digital & Web Graphics",
    icon: <path d="M3 5h18M3 5v14h18V5M3 5l4 4M21 5l-4 4M12 9v10" />,
    items: [
      "Website Graphics",
      "Hero Banner Design",
      "Landing Page Graphics",
      "UI Graphics",
      "Dashboard Graphics",
      "App Store Screenshots",
      "Feature Illustrations",
    ],
  },
  {
    title: "UI/UX Design",
    icon: <rect x="4" y="3" width="16" height="18" rx="2" />,
    items: [
      "Website UI Design",
      "Mobile App UI Design",
      "Desktop Software UI Design",
      "Dashboard UI Design",
      "Admin Panel Design",
      "Landing Page UI",
      "Wireframe Design",
      "Prototype Design",
    ],
  },
  {
    title: "Illustration & Creative",
    icon: <path d="M4 19l1-4L15.5 4.5a1.5 1.5 0 012 2L7 17l-4 2zM13.5 6.5l2 2" />,
    items: [
      "Vector Illustration",
      "Character Illustration",
      "Mascot Design",
      "Icon Design",
      "Icon Pack Design",
      "Infographic Design",
      "Custom Illustrations",
      "Isometric Design",
    ],
  },
  {
    title: "Image Editing",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="1.5" />
        <circle cx="9" cy="10" r="2" />
        <path d="M3 16l5-4 4 3 4-5 5 6" />
      </>
    ),
    items: [
      "Photo Editing",
      "Background Removal",
      "Photo Retouching",
      "Color Correction",
      "Image Restoration",
      "Image Manipulation",
      "Product Photo Editing",
      "Beauty Retouching",
    ],
  },
  {
    title: "Presentation Design",
    icon: <path d="M3 4h18v12H3zM8 20h8M12 16v4" />,
    items: [
      "PowerPoint Presentation",
      "Pitch Deck Design",
      "Google Slides Design",
      "Keynote Presentation",
      "Business Proposal Design",
    ],
  },
  {
    title: "eCommerce Graphics",
    icon: (
      <>
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
        <path d="M2 3h3l2.6 12.6a1.5 1.5 0 001.5 1.4h8.3a1.5 1.5 0 001.5-1.2L21 7H6" />
      </>
    ),
    items: [
      "Amazon Listing Images",
      "Product Mockups",
      "Product Infographics",
      "Product Advertisement",
      "Store Banner Design",
      "Shopify Graphics",
    ],
  },
  {
    title: "Publishing",
    icon: <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5a2.5 2.5 0 00-2.5-2.5H4V5.5zM4 16v3a2 2 0 002 2h14" />,
    items: [
      "eBook Cover Design",
      "Kindle Cover Design",
      "Magazine Cover Design",
      "Journal Design",
      "Workbook Design",
    ],
  },
  {
    title: "Event & Promotional",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    items: [
      "Event Poster",
      "Event Flyer",
      "Conference Banner",
      "Stage Backdrop",
      "Trade Show Booth Graphics",
      "Wedding Card Design",
    ],
  },
  {
    title: "Print-Ready Files",
    icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 11-9-9 9 9 0 019 9z" />,
    items: [
      "CMYK/RGB Conversion",
      "High-Resolution Export",
      "Source Files (AI, PSD, SVG, EPS, PDF, CDR & more on request)",
    ],
  },
];

export default function GraphicDesignServices() {
  return (
    <ServiceCategoryMenu
      eyebrow="FULL SERVICE MENU"
      heading="Everything We Design"
      subheading="Explore our full design menu, organized by category — tap any category to see exactly what's included."
      categories={CATEGORIES}
    />
  );
}
