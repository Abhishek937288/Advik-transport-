import type { Vehicle } from "@/types"

/**
 * Commercial vehicles available for hire.
 *
 * Images live in `public/images/vehicles`. Replace the placeholder files with
 * real photographs of the fleet and nothing else needs to change.
 */
export const vehicles: Vehicle[] = [
  {
    slug: "tata-ace",
    name: "Tata Ace",
    capacity: "750 kg",
    capacityKg: 750,
    bodyType: "Open / Covered mini truck",
    suitableGoods: ["Small parcels", "Office supplies", "Furniture items", "Retail stock"],
    serviceType: "Local & Outstation",
    availability: "Available for local and outstation trips on advance notice.",
    image: "/images/vehicles/tata-ace.jpg",
    imageAlt: "Tata Ace mini goods carrier truck ready for dispatch",
    featured: true,
  },
  {
    slug: "pickup-truck",
    name: "Pickup Truck",
    capacity: "1,200 kg",
    capacityKg: 1200,
    bodyType: "Pickup body with canopy",
    suitableGoods: ["Packed cartons", "Hardware", "Packaged goods", "Small machinery"],
    serviceType: "Local & Outstation",
    availability: "Usually available on the same day for local destinations.",
    image: "/images/vehicles/pickup-truck.jpg",
    imageAlt: "Canopied pickup truck used for local goods transportation",
    featured: true,
  },
  {
    slug: "14-ft-truck",
    name: "14 Ft Truck",
    capacity: "3,500 kg",
    capacityKg: 3500,
    bodyType: "Open body / closed body",
    suitableGoods: ["Construction material", "Cement bags", "Bricks", "Furniture"],
    serviceType: "Local & Outstation",
    availability: "Suitable for local runs and short outstation routes.",
    image: "/images/vehicles/14-ft-truck.jpg",
    imageAlt: "14 feet closed body goods truck parked at a loading yard",
  },
  {
    slug: "17-ft-truck",
    name: "17 Ft Truck",
    capacity: "6,000 kg",
    capacityKg: 6000,
    bodyType: "Closed body container",
    suitableGoods: ["Packaged goods", "Industrial spares", "Hardware", "Appliances"],
    serviceType: "Local & Outstation",
    availability: "Commonly used for intercity and full truck load movements.",
    image: "/images/vehicles/17-ft-truck.jpg",
    imageAlt: "17 feet closed body truck used for intercity freight movement",
    featured: true,
  },
  {
    slug: "19-ft-truck",
    name: "19 Ft Truck",
    capacity: "8,000 kg",
    capacityKg: 8000,
    bodyType: "Container / open body",
    suitableGoods: ["Machinery", "Industrial goods", "Furniture", "Steel material"],
    serviceType: "Outstation",
    availability: "Booked mainly for intercity and outstation consignments.",
    image: "/images/vehicles/19-ft-truck.jpg",
    imageAlt: "19 feet container truck positioned for loading goods",
  },
  {
    slug: "22-ft-truck",
    name: "22 Ft Truck",
    capacity: "12,000 kg",
    capacityKg: 12000,
    bodyType: "Multi-axle container body",
    suitableGoods: ["Heavy machinery", "Industrial equipment", "Building material", "Bulk cargo"],
    serviceType: "Outstation",
    availability: "Requires advance booking due to vehicle availability.",
    image: "/images/vehicles/22-ft-truck.jpg",
    imageAlt: "22 feet multi axle truck carrying heavy industrial load",
  },
  {
    slug: "container-truck",
    name: "Container Truck",
    capacity: "20 ft container",
    capacityKg: 10000,
    bodyType: "20 ft container (FTL)",
    suitableGoods: ["Export consignments", "Palletised goods", "Warehouse transfers", "Factory dispatches"],
    serviceType: "Outstation",
    availability: "Available for full container loads on advance confirmation.",
    image: "/images/vehicles/container-truck.jpg",
    imageAlt: "Container truck being loaded with palletised goods at a warehouse",
  },
]

export const getVehicleBySlug = (slug: string) =>
  vehicles.find((vehicle) => vehicle.slug === slug)

export const getVehicleNamesBySlug = (slugs: string[]): string[] =>
  slugs
    .map((slug) => getVehicleBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name))
