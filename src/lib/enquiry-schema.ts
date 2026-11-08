import { z } from "zod";

const optional = z.string().trim().max(500).optional().or(z.literal(""));

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  company: optional,
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a contact telephone number")
    .max(30)
    .regex(/^[+()\d\s-]+$/, "Use digits, spaces, + or - only"),
  service: z.string().trim().min(1, "Select a service"),
  collectionAddress: z.string().trim().min(3, "Enter a collection address or postcode").max(300),
  deliveryAddress: z.string().trim().min(3, "Enter a delivery address or postcode").max(300),
  collectionDateTime: z.string().trim().min(1, "Choose a preferred collection date and time"),
  deliveryRequirement: optional,
  jobDetails: z.string().trim().min(5, "Tell us what we're moving").max(2000),
  stops: optional,
  routeDetails: optional,
  propertyType: optional,
  volume: optional,
  accessNotes: optional,
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can respond to your enquiry" }) }),
  /** Honeypot — real users never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
