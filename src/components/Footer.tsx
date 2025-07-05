interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg", 
    alt: "Library Management System",
    title: "LibraryFlow", 
    url: "/", 
  },
  tagline = "Your world of books, at your fingertips.", 
  menuItems = [
    {
      title: "Library",
      links: [
        { text: "About Us", url: "/about" }, 
        { text: "Contact", url: "/contact" }, 
        { text: "Support", url: "/support" }, 
        { text: "Team", url: "/team" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Browse Books", url: "/allBooks" }, 
        { text: "Add a Book", url: "/add-book" }, 
        { text: "Borrow History", url: "/borrow-history" }, 
        { text: "FAQs", url: "/faq" }, 
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "Blog", url: "/blog" }, 
        { text: "Community", url: "/community" }, 
        { text: "Feedback", url: "/feedback" }, 
      ],
    },
    {
      title: "Legal", 
      links: [
        { text: "Privacy Policy", url: "/privacy-policy" },
        { text: "Terms of Service", url: "/terms-of-service" }, 
        { text: "Cookie Policy", url: "/cookie-policy" }, 
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} LibraryFlow. All rights reserved.`, 
  bottomLinks = [
    { text: "Sitemap", url: "/sitemap" }, 
    { text: "Accessibility", url: "/accessibility" }, 
  ],
}: Footer2Props) => {
  return (
    <section className="py-32 bg-lib-orange text-lib-gray">
      <div className="max-w-[85%] mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <a href={logo.url}>
                  <img
                    src='/logo.png'
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10"
                  />
                </a>
                <p className="text-xl font-semibold">{logo.title}</p>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-lib-white
                 text-lg">{section.title}</h3>
                <ul className="space-y-4 ">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-bold"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-lib-white  md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };