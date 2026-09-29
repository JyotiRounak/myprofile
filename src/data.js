// Edit everything about your site here.
export const EMAIL = "you@example.com"; // TODO: replace
export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" }, // TODO
  { label: "GitHub", href: "https://github.com/your-handle" }, // TODO
];

export const NAV = [
  ["about", "About"],
  ["impact", "Impact"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["stack", "Stack"],
];

export const PERF = { legacyMs: 800, newMs: 50 };
export const STATS = [
  ["40–50%", "smaller JS bundle"],
  ["95%", "edge cache hit rate"],
  ["~10%", "conversion lift"],
  ["30%", "revenue increase"],
];

export const JOBS = [
  { company: "Accenture", role: "Team Lead, Frontend Engineering", when: "Jan 2025 – Present",
    text: "Lead a team of about 12 engineers. Own architecture and delivery of the QVC Product Detail Page migration, and mentor developers: three have been promoted." },
  { company: "Tata Consultancy Services", role: "Frontend / Full-Stack Engineer", when: "Jan 2023 – Jan 2025",
    text: "Built payment and product flows, including a Braintree checkout with Google Pay, PayPal and Apple Pay, backed by formal HLDs and state machines." },
  { company: "CodeClouds IT Solutions", role: "Frontend / Full-Stack Engineer", when: "Feb 2017 – Nov 2022",
    text: "Shipped client web apps across React and Node, growing from junior developer to a senior contributor over almost six years." },
];

export const PROJECTS = [
  { name: "QVC product detail page migration",
    text: "Rebuilt a high-traffic legacy AEM page in Next.js with edge caching and a shared component library. It went live in May 2025 and cut AEM licensing costs.",
    tags: ["Next.js", "Redux", "Edge caching", "AEM"], link: "" },
  { name: "DevTinder",
    text: "A full-stack MERN app with direct Razorpay API payments, Redis caching, AWS EC2 hosting and a GitHub Actions CI/CD pipeline.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis", "Razorpay", "AWS EC2"], link: "" }, // add repo/live link
];

export const STACK = [
  ["Frontend", ["React", "Next.js", "TypeScript", "Redux", "HTML & CSS"]],
  ["Backend", ["Node.js", "NestJS", "MongoDB", "Redis"]],
  ["Delivery", ["AWS EC2", "GitHub Actions", "Edge caching", "PCI DSS-aware payments"]],
  ["Practice", ["System design", "Component libraries", "Mentoring", "Performance budgets"]],
];
