import {
  Dashboard,
  Settings,
  People,
  Email,
  BarChart,
  Security,
  Edit,
  Image,
  Article,
  Store,
  Payment,
  FilterList,
  CheckCircle,
  Speed,
  CloudUpload,
  Notifications,
  Timeline,
  Lock,
  Public,
  LocalShipping,
  Phone,
  Map,
  AdminPanelSettings,
  ContactMail,
  Brush,
  ShoppingCart,
} from '@mui/icons-material';

export interface ColorScheme {
  primary: string;
  secondary: string;
  gradient: string;
  light: string;
  glow: string;
}

export interface ColorPalette {
  admin: ColorScheme;
  studio: ColorScheme;
  shop: ColorScheme;
  contact: ColorScheme;
}

export interface Benefit {
  icon: React.ReactElement;
  title: string;
  desc: string;
}

export interface FeatureSection {
  id: string;
  icon: React.ReactElement;
  badge: string;
  title: string;
  description: string;
  previewDescription: string;
  benefits: Benefit[];
  route: string;
  colorScheme: keyof ColorPalette;
  previewTags: string[];
}

export interface TechFeature {
  icon: React.ReactElement;
  title: string;
  desc: string;
}

// Modern color palette with sophisticated gradients
export const colors: ColorPalette = {
  admin: {
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Purple
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    light: 'rgba(99, 102, 241, 0.1)',
    glow: 'rgba(99, 102, 241, 0.2)',
  },
  studio: {
    primary: '#ec4899', // Pink
    secondary: '#f43f5e', // Rose
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    light: 'rgba(236, 72, 153, 0.1)',
    glow: 'rgba(236, 72, 153, 0.2)',
  },
  shop: {
    primary: '#14b8a6', // Teal
    secondary: '#06b6d4', // Cyan
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    light: 'rgba(20, 184, 166, 0.1)',
    glow: 'rgba(20, 184, 166, 0.2)',
  },
  contact: {
    primary: '#f59e0b', // Amber
    secondary: '#f97316', // Orange
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    light: 'rgba(245, 158, 11, 0.1)',
    glow: 'rgba(245, 158, 11, 0.2)',
  },
};

// Feature sections data
export const featureSections: FeatureSection[] = [
  {
    id: 'admin',
    icon: <AdminPanelSettings />,
    badge: 'Admin Panel',
    title: 'Admin Dashboard',
    description:
      'Powerful administration panel with real-time analytics, user management, and comprehensive system controls. Monitor your platform with detailed insights and manage all aspects from one place.',
    previewDescription:
      'Complete admin control center with real-time monitoring, user management, and advanced analytics. Everything you need to manage your platform efficiently.',
    benefits: [
      {
        icon: <Dashboard />,
        title: 'Comprehensive Dashboard',
        desc: 'Real-time metrics, charts, and insights at a glance',
      },
      {
        icon: <People />,
        title: 'User Management',
        desc: 'Full CRUD operations for managing team members and roles',
      },
      {
        icon: <BarChart />,
        title: 'Analytics & Reports',
        desc: 'Detailed analytics with interactive charts and data visualization',
      },
      {
        icon: <Settings />,
        title: 'System Configuration',
        desc: 'Customize settings, notifications, and system preferences',
      },
      {
        icon: <Security />,
        title: 'Role-Based Security',
        desc: 'Granular permissions and access control for enhanced security',
      },
    ],
    route: '/admin',
    colorScheme: 'admin',
    previewTags: ['Dashboard', 'Users', 'Analytics'],
  },
  {
    id: 'studio',
    icon: <Brush />,
    badge: 'Content Studio',
    title: 'Sanity Studio',
    description:
      'Headless CMS powered by Sanity.io for creating, managing, and publishing structured content. Rich editing experience with real-time collaboration and version control.',
    previewDescription:
      'Professional content management system with intuitive editing, media library, and version control. Create and publish content with ease.',
    benefits: [
      {
        icon: <Edit />,
        title: 'Visual Content Editor',
        desc: 'Rich text editing with real-time preview and formatting',
      },
      {
        icon: <Image />,
        title: 'Media Management',
        desc: 'Upload, organize, and optimize images and documents',
      },
      {
        icon: <Article />,
        title: 'Structured Content',
        desc: 'Create blog posts, articles, and pages with custom schemas',
      },
      {
        icon: <CloudUpload />,
        title: 'Cloud-Based',
        desc: 'Access your content from anywhere with automatic backups',
      },
      {
        icon: <Timeline />,
        title: 'Version Control',
        desc: 'Track changes and revert to previous versions easily',
      },
    ],
    route: '/studio',
    colorScheme: 'studio',
    previewTags: ['Editor', 'Media', 'Content'],
  },
  {
    id: 'shop',
    icon: <ShoppingCart />,
    badge: 'E-commerce',
    title: 'E-commerce Shop',
    description:
      'Full-featured online shop with product catalog, shopping cart, and secure checkout. Browse services, manage orders, and enjoy a seamless shopping experience.',
    previewDescription:
      'Modern e-commerce platform with product catalog, cart management, and secure checkout. Multi-currency support and advanced filtering included.',
    benefits: [
      {
        icon: <Store />,
        title: 'Product Catalog',
        desc: 'Browse services with detailed descriptions and pricing',
      },
      {
        icon: <FilterList />,
        title: 'Advanced Filters',
        desc: 'Filter by category, price, features, and more',
      },
      {
        icon: <Payment />,
        title: 'Multi-Currency',
        desc: 'Support for USD, EUR, GBP with real-time conversion',
      },
      {
        icon: <ShoppingCart />,
        title: 'Shopping Cart',
        desc: 'Add items, manage quantities, and checkout seamlessly',
      },
      {
        icon: <LocalShipping />,
        title: 'Order Management',
        desc: 'Track orders and manage delivery preferences',
      },
    ],
    route: '/shop',
    colorScheme: 'shop',
    previewTags: ['Products', 'Cart', 'Checkout'],
  },
  {
    id: 'contact',
    icon: <ContactMail />,
    badge: 'Get in Touch',
    title: 'Contact System',
    description:
      'Professional contact page with form validation, location information, and interactive map. Get in touch easily and receive prompt responses.',
    previewDescription:
      'Professional contact system with validated forms, interactive maps, and instant notifications. Make it easy for customers to reach you.',
    benefits: [
      {
        icon: <Email />,
        title: 'Contact Form',
        desc: 'Validated form with real-time feedback and error handling',
      },
      {
        icon: <Map />,
        title: 'Location Map',
        desc: 'Interactive map showing business location and directions',
      },
      {
        icon: <Phone />,
        title: 'Contact Details',
        desc: 'Phone, email, and address information readily available',
      },
      {
        icon: <Notifications />,
        title: 'Instant Notifications',
        desc: 'Receive immediate email notifications for new inquiries',
      },
      {
        icon: <CheckCircle />,
        title: 'Form Validation',
        desc: 'Smart validation ensures quality submissions',
      },
    ],
    route: '/contact',
    colorScheme: 'contact',
    previewTags: ['Form', 'Map', 'Info'],
  },
];

// Technology features
export const techFeatures: TechFeature[] = [
  {
    icon: <Speed />,
    title: 'Lightning Fast',
    desc: 'Next.js 15 with App Router and React Server Components',
  },
  {
    icon: <Public />,
    title: 'Internationalized',
    desc: 'Full i18n support with 4 languages (EN, DE, ES, FR)',
  },
  {
    icon: <Lock />,
    title: 'Secure & Reliable',
    desc: 'Enterprise-grade security with role-based access control',
  },
];
