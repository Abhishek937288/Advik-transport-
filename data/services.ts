import type { Service } from "@/types"

/**
 * Transportation services offered by the business.
 *
 * Add or remove entries here — the homepage, the services page and the footer
 * all read from this single list. Individual service detail pages can be
 * introduced later by adding a route that uses `service.slug`.
 */
export const services: Service[] = [
  {
    slug: "local-goods-transportation",
    name: "Local Goods Transportation",
    shortDescription:
      "City-wide pickups and deliveries for shops, offices and households inside Mumbai, Navi Mumbai and Thane.",
    description:
      "Our local transportation service covers everyday cargo movement across the Mumbai Metropolitan Region. Whether it is a single carton, a shop restock or a multi-stop delivery run, we assign the right vehicle for the load and plan the route so your goods reach the destination within the agreed window.",
    icon: "truck",
    useCases: [
      "Shop and warehouse restocking",
      "Office and institutional supplies",
      "Retail distribution within the city",
      "Household and personal shifting",
    ],
    relatedVehicles: ["tata-ace", "pickup-truck", "14-ft-truck"],
    availability: "Local · Same day to next day",
  },
  {
    slug: "intercity-transportation",
    name: "Intercity Transportation",
    shortDescription:
      "Door-to-door movement of goods between cities with a dedicated vehicle for your consignment.",
    description:
      "Intercity transportation moves your consignment between cities with a vehicle dedicated to the load. We plan the dispatch, brief the driver on the pickup and drop points, and keep you updated by phone until the goods are delivered.",
    icon: "route",
    useCases: [
      "Business stock moving between cities",
      "Factory to warehouse transfers",
      "Supplier to distributor movement",
      "Branch transfers for retail chains",
    ],
    relatedVehicles: ["17-ft-truck", "19-ft-truck", "22-ft-truck"],
    availability: "Outstation · Maharashtra & nearby",
  },
  {
    slug: "full-truck-load",
    name: "Full Truck Load",
    shortDescription:
      "A complete truck dedicated to your goods, ideal for large consignments that fill the body.",
    description:
      "Full Truck Load (FTL) places the entire vehicle at your disposal. It is the most efficient option for consignments that fill the available load space, because your goods are not consolidated with another party's material.",
    icon: "truck-icon",
    useCases: [
      "Large consignments that fill a body",
      "Single consignor, single destination",
      "Factory and godown dispatches",
      "Relocation of heavy equipment",
    ],
    relatedVehicles: ["14-ft-truck", "17-ft-truck", "19-ft-truck", "22-ft-truck"],
    availability: "Local & Outstation",
  },
  {
    slug: "part-load-transportation",
    name: "Part Load Transportation",
    shortDescription:
      "Share vehicle space with other consignments to keep costs down for smaller loads.",
    description:
      "Part Load (LTL) transportation lets you pay for the space your goods actually need. Multiple consignments share one vehicle, each one separately packed, labelled and tracked by our team so that nothing is mixed up at the hub.",
    icon: "boxes",
    useCases: [
      "Smaller consignments and LTL cargo",
      "Frequent small business dispatches",
      "Multi-city distribution runs",
      "Cost-sensitive inter-city movement",
    ],
    relatedVehicles: ["17-ft-truck", "19-ft-truck", "22-ft-truck"],
    availability: "Local & Outstation",
  },
  {
    slug: "commercial-goods-transport",
    name: "Commercial Goods Transport",
    shortDescription:
      "Scheduled transport for retailers, dealers and distributors that need a dependable vehicle daily.",
    description:
      "We support commercial operations with regular, scheduled transport runs. Vehicles are assigned to recurring routes, so a shop, dealer or distributor can plan dispatches knowing a suitable vehicle is available on the agreed day.",
    icon: "building",
    useCases: [
      "Retail and dealer networks",
      "Daily scheduled dispatches",
      "Multi-stop commercial deliveries",
      "Vendor to customer movement",
    ],
    relatedVehicles: ["tata-ace", "pickup-truck", "14-ft-truck", "17-ft-truck"],
    availability: "Local · Scheduled or on demand",
  },
  {
    slug: "industrial-material-transport",
    name: "Industrial Material Transport",
    shortDescription:
      "Movement of machinery, spares and production material to and from industrial sites.",
    description:
      "Industrial material needs careful handling and the right body type. We transport machinery, machine spares, tools, packaging material and production stock for workshops, plants and warehouses across the region.",
    icon: "cog",
    useCases: [
      "Machinery and equipment movement",
      "Machine spares and consumables",
      "Factory stock and raw material",
      "Plant and workshop transfers",
    ],
    relatedVehicles: ["17-ft-truck", "19-ft-truck", "22-ft-truck", "container-truck"],
    availability: "Local & Outstation",
  },
  {
    slug: "construction-material-transport",
    name: "Construction Material Transport",
    shortDescription:
      "Site deliveries for sand, aggregates, bricks, cement, steel and building material.",
    description:
      "We support builders, contractors and civil work sites with regular deliveries of building material. Vehicles are dispatched to site as per your schedule, and drivers are familiar with site access, unloading points and safety norms.",
    icon: "hard-hat",
    useCases: [
      "Sand, aggregate and gravel supply",
      "Cement, bricks and blocks delivery",
      "TMT steel and structural material",
      "Site equipment and tool movement",
    ],
    relatedVehicles: ["14-ft-truck", "17-ft-truck", "19-ft-truck", "22-ft-truck"],
    availability: "Local · Outstation on request",
  },
  {
    slug: "regular-business-transportation",
    name: "Regular Business Transportation",
    shortDescription:
      "Dedicated vehicles on a fixed schedule for companies that move goods every day.",
    description:
      "For businesses that dispatch goods every day, we arrange dedicated vehicles on a fixed rotation. This keeps your dispatch cost predictable, your turnaround times consistent and your customers informed.",
    icon: "calendar-check",
    useCases: [
      "Daily dispatch schedules",
      "Dedicated vehicle arrangements",
      "Fixed route contracts",
      "Multi-city branch transfers",
    ],
    relatedVehicles: ["pickup-truck", "14-ft-truck", "17-ft-truck", "19-ft-truck"],
    availability: "Local · Contract or monthly",
  },
]

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug)
