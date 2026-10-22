import type { ServiceArea, Route } from "@/types"

/**
 * Areas and routes served.
 *
 * Add a city or a route by appending to the arrays below — the service areas
 * page, the homepage section and the route enquiry links all update
 * automatically.
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    region: "Mumbai Metropolitan Region",
    description:
      "Our home base. We run daily pickups and deliveries across the island city and the eastern and western suburbs for shops, warehouses, builders and offices.",
    localities: [
      "Andheri East & West",
      "Bandra",
      "Borivali",
      "Chembur",
      "Dadar",
      "Goregaon",
      "Kurla",
      "Malad",
      "Powai",
      "Sion",
      "Thane",
      "Vile Parle",
    ],
    serviceType: "Local",
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    region: "Navi Mumbai",
    description:
      "Daily goods movement to and from Navi Mumbai, including Turbhe, Kharghar, Vashi, Nerul, Taloja and Panvel, with vehicles available for short-haul and intercity loads.",
    localities: [
      "Belapur",
      "Kharghar",
      "Nerul",
      "Panvel",
      "Taloja",
      "Turbhe",
      "Vashi",
      "Airoli",
    ],
    serviceType: "Local",
  },
  {
    slug: "thane",
    name: "Thane",
    region: "Thane & surrounding",
    description:
      "Regular transportation services for the Thane belt, including Bhiwandi, Kalyan, Dombivli and the surrounding industrial corridors.",
    localities: [
      "Bhiwandi",
      "Dombivli",
      "Kalyan",
      "Kurla",
      "Ulhasnagar",
      "Wagle Estate",
    ],
    serviceType: "Local",
  },
  {
    slug: "pune",
    name: "Pune",
    region: "Pune",
    description:
      "Intercity and outstation freight to Pune, covering Pimpri, Chinchwad, Hinjewadi, Bhosari, Yerawada and the surrounding MIDC areas.",
    localities: [
      "Bhosari",
      "Chinchwad",
      "Hinjewadi",
      "Khadki",
      "Pimpri",
      "Sanaswadi",
      "Shirpur",
      "Yerawada",
    ],
    serviceType: "Outstation",
  },
  {
    slug: "nashik",
    name: "Nashik",
    region: "Nashik",
    description:
      "Regular outstation consignments to Nashik and the surrounding industrial belt, including Ambad, Sinnar and the wine and food processing clusters.",
    localities: ["Ambad", "Dindori", "Igatpuri", "Ozar", "Sinnar", "Nashik Road"],
    serviceType: "Outstation",
  },
  {
    slug: "satara",
    name: "Satara",
    region: "Satara & Wai",
    description:
      "Outstation transportation to Satara, Wai and the surrounding belt for factories, dealerships and agricultural businesses.",
    localities: ["Karad", "Koregaon", "Peth", "Satara", "Wai"],
    serviceType: "Outstation",
  },
  {
    slug: "kolhapur",
    name: "Kolhapur",
    region: "Kolhapur",
    description:
      "Long-haul outstation services to Kolhapur and nearby districts for industrial plants, engineering units and retail distributors.",
    localities: ["Ichalkaranji", "Kadegaon", "Kolhapur", "Panhala", "Sangli Road"],
    serviceType: "Outstation",
  },
  {
    slug: "goa",
    name: "Goa",
    region: "Goa",
    description:
      "Interstate outstation movement to Goa for hospitality, retail and construction supply chains, with return loads planned where possible.",
    localities: ["Bardez", "Canacona", "Margao", "Panaji", "Vasco"],
    serviceType: "Outstation",
  },
]

export const routes: Route[] = [
  {
    slug: "mumbai-to-pune",
    from: "Mumbai",
    to: "Pune",
    distance: "150 km",
    duration: "4 – 5 hours",
    note: "A frequently booked intercity route with daily availability.",
  },
  {
    slug: "mumbai-to-nashik",
    from: "Mumbai",
    to: "Nashik",
    distance: "170 km",
    duration: "4 – 5 hours",
    note: "Popular for industrial and FMCG consignments.",
  },
  {
    slug: "mumbai-to-satara",
    from: "Mumbai",
    to: "Satara",
    distance: "280 km",
    duration: "7 – 8 hours",
    note: "Common route for factory and dealership dispatches.",
  },
  {
    slug: "mumbai-to-kolhapur",
    from: "Mumbai",
    to: "Kolhapur",
    distance: "350 km",
    duration: "8 – 9 hours",
    note: "Suitable for engineering and retail consignments.",
  },
  {
    slug: "mumbai-to-goa",
    from: "Mumbai",
    to: "Goa",
    distance: "590 km",
    duration: "14 – 15 hours",
    note: "Interstate outstation service with planned return loads.",
  },
]

export const getRouteBySlug = (slug: string) =>
  routes.find((route) => route.slug === slug)

export const getServiceAreaBySlug = (slug: string) =>
  serviceAreas.find((area) => area.slug === slug)
