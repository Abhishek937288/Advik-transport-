import type { FaqItem } from "@/types"

/**
 * Frequently asked questions.
 *
 * The same list powers the accordion on the homepage, the dedicated FAQ page
 * and the structured FAQ content in the page metadata.
 */
export const faqs: FaqItem[] = [
  {
    question: "How do I book a vehicle?",
    answer:
      "There is no online booking on this website. Call us, send a WhatsApp message or fill in the enquiry form on the contact page. We discuss your goods, pickup and drop locations and the preferred date, then confirm a vehicle and a price for you directly.",
    category: "Booking",
  },
  {
    question: "How do I get a transportation quote?",
    answer:
      "Share the type of goods, approximate weight, pickup point, delivery point and the date you need the vehicle. We come back with a recommended vehicle size and a price. Quotes are usually confirmed the same working day.",
    category: "Booking",
  },
  {
    question: "Which locations do you serve?",
    answer:
      "We primarily serve Mumbai, Navi Mumbai and Thane for local transportation, and Pune, Nashik, Satara, Kolhapur and Goa for outstation work. If your route is not listed, contact us — we frequently arrange vehicles for nearby destinations as well.",
    category: "Coverage",
  },
  {
    question: "What types of goods do you transport?",
    answer:
      "We move general commercial cargo such as packaged goods, industrial material, machinery, construction material, furniture, electronics, hardware and household goods. Fragile, hazardous and temperature-sensitive materials are handled only after a discussion about the specific handling requirements.",
    category: "Coverage",
  },
  {
    question: "Do you provide outstation transportation?",
    answer:
      "Yes. Outstation services are available across Maharashtra and to Goa for full truck load and part load consignments. For outstation movements we confirm the vehicle, driver and schedule before dispatch and share the expected timing with you.",
    category: "Coverage",
  },
  {
    question: "Can transportation be scheduled in advance?",
    answer:
      "Yes, advance scheduling is preferred for larger vehicles and outstation trips. Mention your preferred date and time while speaking to us and we will hold a vehicle for that slot, subject to availability.",
    category: "Booking",
  },
  {
    question: "How is the transportation price calculated?",
    answer:
      "The price depends on the vehicle type, the distance of the route, the nature and weight of the goods, loading and unloading requirements, and any waiting time at the pickup or drop point. We share a clear written quote before the vehicle is dispatched.",
    category: "Pricing",
  },
  {
    question: "Which vehicle should I choose?",
    answer:
      "If you are unsure, share your load details with us and we will recommend the right vehicle. A Tata Ace handles up to about 750 kg, a 17 ft truck up to about 6 tonnes, and a 22 ft truck or container up to about 12 tonnes. Choosing a vehicle larger than required increases cost, while a smaller one may need two trips.",
    category: "Vehicles",
  },
  {
    question: "Is the goods insured during transit?",
    answer:
      "Goods are moved on a customer-acceptance basis. If you need formal transit insurance for a consignment, please tell us in advance so it can be arranged separately before dispatch.",
    category: "General",
  },
  {
    question: "How do I track my consignment?",
    answer:
      "This website does not provide online tracking. Our team keeps you updated by phone during the journey and you can call the driver or our office at any time for the current status.",
    category: "General",
  },
]

export const faqCategories = Array.from(
  new Set(faqs.map((faq) => faq.category).filter(Boolean)),
) as string[]
