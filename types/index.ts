import type { LucideIcon } from "lucide-react"

/** Names of the Lucide icons that can be referenced from the data files. */
export type IconName =
  | "truck"
  | "route"
  | "package"
  | "warehouse"
  | "factory"
  | "hard-hat"
  | "briefcase"
  | "building"
  | "shield-check"
  | "user-check"
  | "handshake"
  | "clock"
  | "wallet"
  | "map-pin"
  | "headset"
  | "truck-icon"
  | "boxes"
  | "cog"
  | "sofa"
  | "monitor"
  | "clipboard-list"
  | "calendar-check"
  | "calculator"
  | "layers"
  | "anchor"

export interface NavLink {
  title: string
  href: string
}

/** Brand glyphs that are not part of the Lucide icon set. */
export type SocialIconName = "facebook" | "instagram" | "linkedin"

export interface SocialLink {
  label: string
  href: string
  icon: SocialIconName
}

export interface BusinessStat {
  label: string
  value: string
  description?: string
}

export interface Service {
  /** Stable slug, used for anchors, links and analytics. */
  slug: string
  name: string
  shortDescription: string
  description: string
  icon: IconName
  /** Real-world situations this service is a good fit for. */
  useCases: string[]
  /** Slugs of related vehicles from `data/vehicles.ts`. */
  relatedVehicles: string[]
  /** Human readable service coverage, e.g. "Local & outstation". */
  availability: string
}

export type VehicleServiceType = "Local" | "Outstation" | "Local & Outstation"

export interface Vehicle {
  slug: string
  name: string
  /** Approximate load capacity. */
  capacity: string
  /** Approximate payload weight in kilograms. */
  capacityKg: number
  bodyType: string
  suitableGoods: string[]
  serviceType: VehicleServiceType
  availability: string
  image: string
  imageAlt: string
  featured?: boolean
}

export interface ServiceArea {
  slug: string
  name: string
  region: string
  description: string
  /** Areas and localities covered inside this city. */
  localities: string[]
  serviceType: "Local" | "Outstation"
}

export interface Route {
  slug: string
  from: string
  to: string
  distance: string
  duration: string
  note: string
}

export interface Testimonial {
  name: string
  company: string
  role?: string
  review: string
  rating: number
  /** Placeholder reviews are clearly labelled in the UI. */
  isPlaceholder: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category?: string
}

export type GalleryCategory =
  | "Vehicles"
  | "Loading"
  | "Deliveries"
  | "Warehouse"
  | "Transportation Work"

export interface GalleryItem {
  id: string
  title: string
  description: string
  category: GalleryCategory
  image: string
  imageAlt: string
}

export interface GoodsCategory {
  name: string
  description: string
  icon: IconName
}

export interface WhyChooseUsItem {
  title: string
  description: string
  icon: IconName
}

export interface ProcessStep {
  title: string
  description: string
  icon: IconName
}

export interface MissionValue {
  title: string
  description: string
  icon: IconName
}

export type { LucideIcon }
