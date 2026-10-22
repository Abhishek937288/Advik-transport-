import {
  Anchor,
  Box,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  ClipboardList,
  Clock,
  Cog,
  Container,
  Factory,
  Gauge,
  Handshake,
  HardHat,
  Headset,
  Layers,
  MapPin,
  MessageCircle,
  Monitor,
  Package,
  Route,
  ShieldCheck,
  Sofa,
  Truck,
  UserCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import type { IconName } from "@/types"

/**
 * Central icon registry.
 *
 * Data files reference icons by name so that they stay free of JSX. Add a new
 * entry here (and to the `IconName` type) to use another icon from the data
 * layer.
 */
export const iconMap: Record<IconName, LucideIcon> = {
  truck: Truck,
  route: Route,
  package: Package,
  warehouse: Boxes,
  factory: Factory,
  "hard-hat": HardHat,
  briefcase: Briefcase,
  building: Building2,
  "shield-check": ShieldCheck,
  "user-check": UserCheck,
  handshake: Handshake,
  clock: Clock,
  wallet: Wallet,
  "map-pin": MapPin,
  headset: Headset,
  "truck-icon": Container,
  boxes: Box,
  cog: Cog,
  sofa: Sofa,
  monitor: Monitor,
  "clipboard-list": ClipboardList,
  "calendar-check": CalendarCheck,
  calculator: Calculator,
  layers: Layers,
  anchor: Anchor,
}

export const getIcon = (name: IconName): LucideIcon => iconMap[name] ?? Truck

/** Optional extra icon names used by components directly. */
export const extraIcons = { MessageCircle, Gauge }
