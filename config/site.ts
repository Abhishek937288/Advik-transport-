import type { Metadata } from "next"

import type { BusinessStat, NavLink, SocialLink } from "@/types"

/**
 * ---------------------------------------------------------------------------
 * CENTRAL BUSINESS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every company-wide detail used across the website lives in this file.
 * Replace the placeholder values below with the real business information and
 * the whole site updates automatically. No component hard-codes business data.
 */

/** Phone number in international format, digits only (used for tel: links). */
const phoneRaw = "+919920427858"
const whatsappNumber = "919920427858"

export const siteConfig = {
  name: "Advik Transport",
  shortName: "Advik Transport",
  legalName: "Advik Transport",
  tagline: "Reliable Goods Transportation You Can Count On",
  description:
    "Advik Transport is a goods carrier based in Mumbai providing dependable local and outstation transport for businesses, warehouses, builders and households across Maharashtra.",
  foundedYear: 2014,

  /** Phone number as it should be displayed to visitors. */
  phone: "+91 99204 27858",
  /** Phone number in international format (digits only, no `+`). */
  phoneRaw,
  /** Phone number in international format including the `+` sign. */
  phoneHref: phoneRaw,

  /** WhatsApp number in international format (digits only, no `+`). */
  whatsapp: whatsappNumber,
  whatsappHref: `+${whatsappNumber}`,

  email: "info@adviktransport.in",
  emailHref: "mailto:info@adviktransport.in",

  address: {
    line1: "Gala No. 14, Transport Nagar",
    line2: "Andheri East, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400093",
    country: "India",
  },

  businessHours: {
    weekdays: "Monday – Saturday: 7:00 AM – 9:00 PM",
    sunday: "Sunday: Available on call for urgent requirements",
  },

  /** Primary operating area, used in copy and structured data. */
  primaryArea: "Mumbai, Navi Mumbai & Thane",
  region: "Maharashtra",
  country: "India",
  currency: "INR",

  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: "facebook",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: "instagram",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "linkedin",
    },
  ] satisfies SocialLink[],

  navLinks: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Vehicles", href: "/vehicles" },
    { title: "Service Areas", href: "/service-areas" },
    { title: "Gallery", href: "/gallery" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  footerServices: [
    { title: "Local Goods Transportation", href: "/services#local-goods-transportation" },
    { title: "Intercity Transportation", href: "/services#intercity-transportation" },
    { title: "Full Truck Load", href: "/services#full-truck-load" },
    { title: "Part Load Transportation", href: "/services#part-load-transportation" },
    { title: "Industrial Material Transport", href: "/services#industrial-material-transport" },
    { title: "Construction Material Transport", href: "/services#construction-material-transport" },
  ] satisfies NavLink[],

  stats: [
    {
      value: "10+",
      label: "Years of Experience",
      description: "Serving businesses across Maharashtra since 2014.",
    },
    {
      value: "5,000+",
      label: "Deliveries Completed",
      description: "Goods moved locally, intercity and outstation.",
    },
    {
      value: "20+",
      label: "Vehicles in Fleet",
      description: "From mini trucks to 22 ft container trucks.",
    },
    {
      value: "50+",
      label: "Service Locations",
      description: "Across Mumbai, Navi Mumbai, Thane and Pune.",
    },
  ] satisfies BusinessStat[],
} as const

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adviktransport.in"

/** Formats a phone number for display, e.g. `+91 99204 27858`. */
export const formatPhone = (phone: string) => phone

/** Full postal address as a single line. */
export const formatAddress = () => {
  const { line1, line2, city, state, postalCode, country } = siteConfig.address
  return `${line1}, ${line2}, ${city}, ${state} - ${postalCode}, ${country}`
}

/**
 * Builds the metadata used by every page. Page-level metadata can override
 * any of these fields.
 */
export const buildMetadata = ({
  title,
  description,
  path = "/",
}: {
  title: string
  description: string
  path?: string
}): Metadata => {
  const url = `${siteUrl}${path === "/" ? "" : path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
