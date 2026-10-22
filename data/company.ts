import type {
  GoodsCategory,
  MissionValue,
  ProcessStep,
  WhyChooseUsItem,
} from "@/types"

/** Categories of goods the business regularly transports. */
export const goodsCategories: GoodsCategory[] = [
  {
    name: "Industrial Goods",
    description: "Finished goods, components and production material.",
    icon: "factory",
  },
  {
    name: "Machinery",
    description: "Machines, equipment and machine spares.",
    icon: "cog",
  },
  {
    name: "Construction Materials",
    description: "Sand, aggregate, cement, bricks and steel.",
    icon: "hard-hat",
  },
  {
    name: "Packaged Goods",
    description: "Cartons, sacks and retail-packed consignments.",
    icon: "package",
  },
  {
    name: "Commercial Products",
    description: "Distributor stock and multi-stop business deliveries.",
    icon: "building",
  },
  {
    name: "Furniture",
    description: "Office, showpiece and household furniture.",
    icon: "sofa",
  },
  {
    name: "Electronics",
    description: "Electronics, appliances and IT equipment.",
    icon: "monitor",
  },
  {
    name: "General Cargo",
    description: "Any general consignment within a safe handling limit.",
    icon: "boxes",
  },
]

/** Reasons customers choose the business. */
export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Reliable Transportation",
    description:
      "Vehicles are assigned only after confirming availability, and the dispatch is planned before it is committed.",
    icon: "shield-check",
  },
  {
    title: "Experienced Drivers",
    description:
      "Our drivers know the industrial areas, market roads and site access points across the region.",
    icon: "user-check",
  },
  {
    title: "Safe Goods Handling",
    description:
      "Goods are packed, tied and secured properly before the vehicle moves, and handled carefully at both ends.",
    icon: "handshake",
  },
  {
    title: "Transparent Pricing",
    description:
      "You get a clear quote for the vehicle, route and loading requirements before the vehicle is dispatched.",
    icon: "wallet",
  },
  {
    title: "Timely Service",
    description:
      "We plan the dispatch window around your requirement and keep you informed about the status.",
    icon: "clock",
  },
  {
    title: "Local & Outstation Service",
    description:
      "The same team handles short-haul city deliveries as well as intercity and interstate consignments.",
    icon: "map-pin",
  },
  {
    title: "Customer Support",
    description:
      "A single point of contact answers your calls and updates you until the consignment is delivered.",
    icon: "headset",
  },
  {
    title: "Multiple Vehicle Options",
    description:
      "From a mini truck to a 22 ft container, the vehicle is matched to the load and the road.",
    icon: "truck",
  },
]

/** The four step process shown on the homepage. */
export const processSteps: ProcessStep[] = [
  {
    title: "Contact Us",
    description:
      "Call, WhatsApp or fill the enquiry form with your requirement. There is no online booking — you speak to the team directly.",
    icon: "headset",
  },
  {
    title: "Share Goods & Route Details",
    description:
      "Tell us the goods type, approximate weight, pickup point, delivery point and preferred date.",
    icon: "clipboard-list",
  },
  {
    title: "Get Vehicle & Price Confirmation",
    description:
      "We recommend the right vehicle for the load and share a clear price for the route.",
    icon: "calculator",
  },
  {
    title: "Goods Pickup & Transportation",
    description:
      "The vehicle is dispatched, the goods are loaded securely and delivered to the destination.",
    icon: "truck",
  },
]

/** Mission, vision and values used on the About page. */
export const missionAndVision: MissionValue[] = [
  {
    title: "Our Mission",
    description:
      "To move every consignment safely and on schedule, with honest pricing and clear communication from the first phone call to the final delivery.",
    icon: "route",
  },
  {
    title: "Our Vision",
    description:
      "To be the transport partner that businesses across Maharashtra prefer for their regular goods movement.",
    icon: "building",
  },
]

export const companyValues: MissionValue[] = [
  {
    title: "Safety First",
    description:
      "Goods are secured properly and vehicles are checked before every dispatch.",
    icon: "shield-check",
  },
  {
    title: "Honest Pricing",
    description:
      "The quote you are given is the price you are charged for the agreed work.",
    icon: "wallet",
  },
  {
    title: "On-Time Planning",
    description:
      "Routes, loading slots and dispatch windows are planned before the vehicle moves.",
    icon: "clock",
  },
  {
    title: "Clear Communication",
    description:
      "You know who is handling your consignment and where it is, at any point of the journey.",
    icon: "headset",
  },
]

/** Short company history timeline (placeholder content). */
export const companyHistory: { year: string; title: string; description: string }[] =
  [
    {
      year: "2014",
      title: "The first truck",
      description:
        "The business started with a single goods carrier running local routes across Mumbai.",
    },
    {
      year: "2017",
      title: "Moving out of Mumbai",
      description:
        "Outstation operations opened up to Pune, Nashik and the surrounding districts.",
    },
    {
      year: "2020",
      title: "A wider fleet",
      description:
        "Mini trucks, 14 ft bodies and container trucks were added to serve different load sizes.",
    },
    {
      year: "2024",
      title: "Regular business partnerships",
      description:
        "Scheduled dispatch arrangements became a significant part of the business.",
    },
  ]
