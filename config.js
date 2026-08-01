/* ==========================================================================
   BOOSTORA SITE CONFIG
   Edit everything here — name, links, pricing, FAQ, testimonials, socials.
   The page reads this file at load time and fills itself in automatically.
   ========================================================================== */

const SITE_CONFIG = {

  /* ---------- Identity ---------- */
  site: {
    name: "Boostora",
    tagline: "Fast, secure Discord server boosting.",
    metaDescription: "Boostora offers affordable Discord server boosts with fast delivery, crypto payments, and friendly support through Boostora.",
    year: "2026",
  },

  /* ---------- Hero ---------- */
  hero: {
    eyebrow: "Fast • Secure • Crypto",
    headlineLine1: "Boost your Discord",
    headlineLine2: "in minutes.",
    subtext: "Affordable Discord server boosts delivered in as little as 5 minutes. Join our Boostora server, open a ticket, and we'll handle the rest.",
    primaryCta: {
      label: "Join Boostora",
      href: "https://discord.gg/boostora"
    },
    secondaryCta: {
      label: "View Pricing",
      href: "#pricing"
    },
  },

  /* ---------- Nav CTA ---------- */
  navCta: {
    label: "Join Boostora",
    href: "https://discord.gg/boostora"
  },

  /* ---------- Social / contact links ---------- */
  socialLinks: [
    {
      type: "discord",
      label: "Boostora",
      href: "https://discord.gg/boostora"
    },
    {
      type: "website",
      label: "Website",
      href: "#"
    },
  ],

  /* ---------- Pricing ---------- */
  pricing: [
    {
      name: "14 Boosts",
      description: "A great option for smaller servers or quick upgrades.",
      price: "$6",
      priceNote: "one-time",
      features: [
        "14 Discord Server Boosts",
        "Delivery in 5m–1h",
        "Crypto payment",
        "Friendly support"
      ],
      cta: {
        label: "Buy Now",
        href: "https://discord.gg/boostora"
      },
      highlighted: false,
    },
    {
      name: "30 Boosts",
      description: "Perfect for maximizing your server's boost level.",
      price: "$15",
      priceNote: "one-time",
      features: [
        "30 Discord Server Boosts",
        "Delivery in 5m–1h",
        "Crypto payment",
        "Priority package",
        "Friendly support"
      ],
      cta: {
        label: "Buy Now",
        href: "https://discord.gg/boostora"
      },
      highlighted: true,
      badge: "Best Value",
    },
  ],

  /* ---------- FAQ ---------- */
  faq: [
    {
      question: "Is it safe?",
      answer: "Yes. Simply disable onboarding or any anti-raid verification bots before placing your order so the boosts can be applied without issues."
    },
    {
      question: "How do I order?",
      answer: "Join the Boostora server, create a support ticket, and tell us which boost package you'd like to purchase."
    },
    {
      question: "How long does delivery take?",
      answer: "Most orders are completed within 5 minutes to 1 hour. Delays may occur if we're temporarily offline."
    },
    {
      question: "What happens after payment?",
      answer: "Once we're available, our boosting bots join your server and apply the purchased boosts automatically."
    },
  ],

  /* ---------- Testimonials ---------- */
  testimonials: [
    {
      quote: "Ordering was straightforward and the boosts arrived much faster than I expected.",
      name: "Server Owner",
      role: "Placeholder",
      initials: "SO"
    },
    {
      quote: "Communication was clear throughout the process. Easy to replace with real feedback later.",
      name: "Community Admin",
      role: "Placeholder",
      initials: "CA"
    },
    {
      quote: "A smooth experience from opening the ticket to receiving the boosts.",
      name: "Discord Moderator",
      role: "Placeholder",
      initials: "DM"
    },
  ],

  /* ---------- Contact ---------- */
  contact: {
    eyebrow: "Get Started",
    heading: "Ready to boost your server?",
    subtext: "Join our Boostora server, create a ticket, and we'll help you choose the right package.",
  },

  /* ---------- Footer ---------- */
  footer: {
    credit: {
      name: "Spinzi",
      href: "https://spinzi.netlify.app"
    },
  },
};