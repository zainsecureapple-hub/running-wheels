import type { LucideIcon } from "lucide-react";
import {
  Activity, Clock, FileText, Home, LayoutGrid, MapPin, Package, Plane, ShieldCheck,
  Tag, Thermometer, Truck, Calendar, Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ Services */
export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  points: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "same-day-delivery",
    title: "Same Day Delivery",
    short: "Dedicated collection and delivery, door to door, the same day.",
    long: "Your consignment travels directly from collection to drop-off with a dedicated driver and vehicle. No stops, no co-loading — just the fastest route between two addresses.",
    points: ["Collection within the hour of booking, subject to availability", "Direct, door-to-door transport with no co-loading", "Real-time updates through to proof of delivery"],
    icon: Truck,
  },
  {
    slug: "next-day-delivery",
    title: "Next-Day Delivery",
    short: "Book today and your consignment arrives the next working day.",
    long: "A dependable option when it doesn't have to be there in hours. We collect, carry and deliver on a schedule agreed with you.",
    points: ["Collection and delivery times agreed with you", "Suitable for parcels, pallets and bulky items", "Clear quotes based on distance and vehicle"],
    icon: Clock,
  },
  {
    slug: "parcel-delivery",
    title: "Parcel Delivery",
    short: "Collection and delivery of parcels for individuals and businesses.",
    long: "From a single parcel to a regular run for your business, our local team keeps every package moving safely and on time.",
    points: ["One-off or regular parcel collections", "Careful handling from pick-up to drop", "Flexible vehicle options to suit the load"],
    icon: Package,
  },
  {
    slug: "document-delivery",
    title: "Document Delivery",
    short: "Secure, signed-for delivery of contracts, legal papers and urgent paperwork.",
    long: "Time-critical paperwork needs a trusted pair of hands. We deliver documents securely, with confirmation on arrival.",
    points: ["Hand-delivered and signed for", "Ideal for legal, financial and medical paperwork", "Same-day and next-day options"],
    icon: FileText,
  },
  {
    slug: "multi-drop-delivery",
    title: "Multi-Drop Delivery",
    short: "Optimised routes for multiple stops, all in one run.",
    long: "One run, several stops. Ideal for businesses delivering to multiple customers, with routes planned to save time and cost.",
    points: ["Routes optimised around your drop list", "One driver and vehicle for the whole run", "Ideal for retail, wholesale and events"],
    icon: MapPin,
  },
  {
    slug: "full-and-half-day-rates",
    title: "Full & Half Day Rates",
    short: "A driver and vehicle on hand for flexible, urgent workloads.",
    long: "Hire a driver and vehicle for the day — or half of it — when your workload is unpredictable or you have lots of stops to cover.",
    points: ["Flexible booking for varied or urgent workloads", "A dedicated driver and vehicle at your disposal", "Simple half-day and full-day pricing"],
    icon: Calendar,
  },
  {
    slug: "removals",
    title: "Removals",
    short: "Help moving home or business items, with vehicle options to suit the job.",
    long: "Moving house or a small office? We plan and carry out moves of every size with care, with vehicles to match the volume.",
    points: ["Home and small-business moves", "Vehicle size matched to your volume", "Access and parking planned before the day"],
    icon: Home,
  },
  {
    slug: "temperature-controlled",
    title: "Temperature-Controlled",
    short: "Chilled, frozen or ambient goods kept safely in range.",
    long: "Goods that need to stay cold — or simply stay in range — travel in suitable vehicles so they arrive in perfect condition.",
    points: ["Chilled, frozen and ambient options", "Suited to food, pharmaceutical and medical goods", "Direct transport to limit time in transit"],
    icon: Thermometer,
  },
  {
    slug: "freight",
    title: "Freight",
    short: "Fast, reliable air cargo for urgent international shipments.",
    long: "When it has to cross borders quickly, we arrange fast, reliable air cargo for urgent international shipments.",
    points: ["Urgent international air cargo", "Collection and onward delivery arranged for you", "Quotes tailored to the consignment"],
    icon: Plane,
  },
];

export const homeServiceSlugs = [
  "same-day-delivery", "full-and-half-day-rates", "parcel-delivery",
  "multi-drop-delivery", "temperature-controlled", "freight",
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------- Home content */
export const whyFeatures = [
  { icon: Clock, title: "24/7 Availability", text: "Over 60 local teams on hand round the clock, day or night, all year." },
  { icon: Zap, title: "60-Minute Collection", text: "We collect within the hour of booking and deliver the same day." },
  { icon: ShieldCheck, title: "Dedicated, No Co-loading", text: "Your consignment travels alone direct, secure and undamaged." },
  { icon: Activity, title: "Real-Time Updates", text: "Live status notifications from collection to proof of delivery." },
];

export const stats = [
  { value: "01", label: "UK Branch" },
  { value: "24/7", label: "Availability 365 days" },
  { value: "60 min", label: "Our Impact in Numbers" },
  { value: "85+", label: "Customer-First Service" },
];

export const industries = [
  "Retail & eCommerce", "Construction", "Aviation", "Hospitality", "Pharmaceutical & Medical",
  "Automotive", "Manufacturing", "Film & Production", "Events", "Marketing & Print",
  "Farming & Horticulture", "Art & Antiques", "Wholesale", "Utilities",
];

/** TODO(client): only the first answer exists in Figma; the rest are drafted — confirm wording. */
export const faqs = [
  {
    q: "What is a dedicated same day courier service?",
    a: "Your goods travel directly from collection to delivery with no stops and no co-loading — a dedicated driver and vehicle for every job.",
  },
  {
    q: "What is your fastest courier service?",
    a: "Our same-day service is our fastest option. We aim to collect within 60 minutes of booking and deliver direct, subject to availability and distance.",
  },
  {
    q: "How do I book a delivery?",
    a: "Send us an enquiry online with your collection and delivery details, or contact your local team. We'll confirm a quote and arrange collection with you.",
  },
  {
    q: "How much notice do you need?",
    a: "For urgent same-day jobs, as little as an hour. For multi-drop runs and removals, booking ahead helps us secure the right driver and vehicle.",
  },
  {
    q: "What can you transport?",
    a: "Parcels, documents, pallets, temperature-controlled goods and household or business items for removals. Tell us what you're moving and we'll advise on the right vehicle.",
  },
];

/* ------------------------------------------------------------ About content */
export const aboutWhy = [
  { icon: LayoutGrid, title: "Wide range of services", text: "Nine services, from same-day and next-day delivery to documents, multi-drop and removals." },
  { icon: Zap, title: "Urgent jobs covered", text: "Same-day and express courier options for time-sensitive deliveries, subject to availability." },
  { icon: MapPin, title: "Multi-drop routes", text: "One run, several stops. Ideal for businesses delivering to multiple customers." },
  { icon: Calendar, title: "Book ahead", text: "Reserve a collection slot in advance so your delivery fits your plans." },
  { icon: Home, title: "Removals support", text: "Help moving home or business items, with vehicle options to suit the job." },
  { icon: Tag, title: "Tailored quotes", text: "Every quote is based on your job: journey, consignment size and vehicle needed." },
];

export const aboutPoints = [
  "One local team from enquiry to delivery",
  "Quotes based on your job, distance and vehicle",
  "Collection and delivery times agreed with you",
];

/* ------------------------------------------------------------- Team content */
/** TODO(client): sample team from Figma — replace names, roles and photos. */
export const team = [
  { name: "Callum Reid", role: "Operations Manager", bio: "Keeps every booking on track, from the first enquiry to the final drop-off.", image: "/images/team-1.png" },
  { name: "Fiona MacLeod", role: "Customer Service Lead", bio: "Your first point of contact for quotes, bookings and any questions along the way.", image: "/images/team-2.png" },
  { name: "Jamie Stewart", role: "Senior Driver", bio: "Handles same-day and multi-drop runs, making sure every delivery arrives safely.", image: "/images/team-3.png" },
  { name: "Ross Davidson", role: "Removals Specialist", bio: "Plans and carries out home and business moves with care, big or small.", image: "/images/team-4.png" },
];
