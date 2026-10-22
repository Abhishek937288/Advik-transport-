/**
 * Fleet categories shown on the homepage, each with a truck image from
 * eichertrucksandbuses.com (light & medium duty range).
 */
export interface FleetCategory {
  name: string
  capacity: string
  use: string
  image: string
}

export const fleet: FleetCategory[] = [
  {
    name: "Sub 5 Ton",
    capacity: "Up to 1.2 t",
    use: "City deliveries, shop restocks and small loads",
    image: "/images/eicher/sub-5-ton.png",
  },
  {
    name: "Light Duty",
    capacity: "3.5 t · 14 ft",
    use: "Furniture, cartons and construction material",
    image: "/images/eicher/light-duty.png",
  },
  {
    name: "Closed Body",
    capacity: "6 t · 17 ft",
    use: "Packaged goods, appliances and electronics",
    image: "/images/eicher/closed-body.png",
  },
  {
    name: "Medium Duty",
    capacity: "8–12 t · 19–22 ft",
    use: "Machinery, industrial goods and bulk cargo",
    image: "/images/eicher/medium-duty.png",
  },
  {
    name: "Tipper",
    capacity: "Site deliveries",
    use: "Sand, aggregate and bricks to construction sites",
    image: "/images/eicher/tipper.png",
  },
]
