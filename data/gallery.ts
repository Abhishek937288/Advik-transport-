import type { GalleryItem } from "@/types"

/**
 * Gallery images.
 *
 * Every entry points to a file inside `public/images/gallery`. Drop real
 * photographs in the same folder (same file names, or update the `image`
 * field) and the gallery picks them up.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "fleet-line-up",
    title: "Fleet Ready for Dispatch",
    description:
      "Goods vehicles lined up at the yard before the morning dispatch.",
    category: "Vehicles",
    image: "/images/gallery/fleet-line-up.jpg",
    imageAlt: "Goods carrier trucks parked in a row at the transport yard",
  },
  {
    id: "loading-cargo",
    title: "Loading Cargo",
    description: "Goods being loaded and secured for the next leg of the journey.",
    category: "Loading",
    image: "/images/gallery/loading-cargo.jpg",
    imageAlt: "Workers loading packed cargo into a closed body truck",
  },
  {
    id: "unloading-site",
    title: "Unloading at Site",
    description: "Careful unloading of consignment material at a customer site.",
    category: "Deliveries",
    image: "/images/gallery/unloading-site.jpg",
    imageAlt: "Goods being unloaded from a truck at a delivery site",
  },
  {
    id: "warehouse-stock",
    title: "Warehouse Stock",
    description: "Pallets and cartons staged for dispatch inside the godown.",
    category: "Warehouse",
    image: "/images/gallery/warehouse-stock.jpg",
    imageAlt: "Pallets and cartons arranged inside a warehouse",
  },
  {
    id: "highway-transport",
    title: "On the Road",
    description: "A truck in transit on an intercity highway run.",
    category: "Transportation Work",
    image: "/images/gallery/highway-transport.jpg",
    imageAlt: "Goods truck travelling on a highway during an intercity trip",
  },
  {
    id: "tata-ace-delivery",
    title: "City Deliveries",
    description: "Compact vehicles handling quick city-level drop-offs.",
    category: "Vehicles",
    image: "/images/gallery/tata-ace-delivery.jpg",
    imageAlt: "Small goods vehicle making a city delivery",
  },
  {
    id: "loading-bay",
    title: "Loading Bay Operations",
    description: "Vehicles being loaded side by side during a busy dispatch window.",
    category: "Loading",
    image: "/images/gallery/loading-bay.jpg",
    imageAlt: "Multiple trucks being loaded at a yard loading bay",
  },
  {
    id: "delivery-handover",
    title: "Delivery Handover",
    description: "Goods handed over and checked against the consignment list.",
    category: "Deliveries",
    image: "/images/gallery/delivery-handover.jpg",
    imageAlt: "Consignment being checked and handed over at the destination",
  },
  {
    id: "office-team",
    title: "Dispatch Desk",
    description: "The team coordinating pickups, routes and vehicle assignments.",
    category: "Warehouse",
    image: "/images/gallery/office-team.jpg",
    imageAlt: "Transport company dispatch team working at the office",
  },
  {
    id: "industrial-load",
    title: "Industrial Consignment",
    description: "Heavy machinery and industrial material ready for dispatch.",
    category: "Transportation Work",
    image: "/images/gallery/industrial-load.jpg",
    imageAlt: "Industrial machinery loaded on a truck for transport",
  },
  {
    id: "night-dispatch",
    title: "Evening Dispatch",
    description: "Late evening dispatches scheduled for next-day delivery.",
    category: "Transportation Work",
    image: "/images/gallery/night-dispatch.jpg",
    imageAlt: "Truck leaving the yard during an evening dispatch",
  },
  {
    id: "container-yard",
    title: "Container Yard",
    description: "Container bodies staged for full truck load consignments.",
    category: "Vehicles",
    image: "/images/gallery/container-yard.jpg",
    imageAlt: "Container trucks parked in a container yard",
  },
]

export const galleryCategories = [
  "Vehicles",
  "Loading",
  "Deliveries",
  "Warehouse",
  "Transportation Work",
] as const

export const getGalleryItemById = (id: string) =>
  galleryItems.find((item) => item.id === id)
