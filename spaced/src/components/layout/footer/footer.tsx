import React from "react";
import { GithubLogoIcon, LinkedinLogoIcon, BehanceLogoIcon } from "@phosphor-icons/react"
import { logo } from "@assets/index";

// Data types for each footer link column
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Content for the three link columns (edit as needed)
const footerColumns: FooterColumn[] = [
  {
    title: "ENDPOINTS",
    links: [
      { label: "APOD", href: "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY" },
      { label: "Cycle Cals", href: "https://www.cyclecalcs.com/api.html" },
      { label: "Rastreador de NEOs", href: "https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY" },
      { label: "Posição da ISS", href: "http://api.open-notify.org/iss-now.json" },
    ],
  },
  {
    title: "SPACED",
    links: [
      { label: "Código da SPACED", href: "https://github.com/Glauedson/SPACED" },
      { label: "Como Contribuir", href: "https://github.com/Glauedson/SPACED" },
      { label: "Doar ao Projeto", href: "https://github.com/sponsors/Glauedson" },
      { label: "Design do Projeto", href: "https://www.behance.net/Glauedson" },
    ],
  },
  {
    title: "LINKS NASA",
    links: [
      { label: "NASA Open Data", href: "https://data.nasa.gov/" },
      { label: "Laboratórios JPL", href: "https://www.jpl.nasa.gov/" },
      { label: "Acordo Space Act", href: "https://www.nasa.gov/partnerships/current-space-act-agreements/" },
    ],
  },
];

// Social icons shown in the bottom bar
const socialLinks = [
  { icon: LinkedinLogoIcon, href: "https://www.linkedin.com/in/glauedson-carlos-89875b258/", label: "LinkedIn" },
  { icon: BehanceLogoIcon, href: "https://www.behance.net/Glauedson", label: "Behance" },
  { icon: GithubLogoIcon, href: "https://github.com/Glauedson", label: "GitHub" },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-background border-t border-border px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top section: logo/description + link columns */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Logo placeholder + description */}
          <div className="max-w-sm">
            <div className="mb-4 flex h-10 w-40 items-center justify-start">
              <img src={logo} />
            </div>

            <p className="description leading-relaxed">
              Explorando o universo através de dados, imagens e conhecimento científico.

              Um projeto independente criado para tornar a astronomia mais acessível, interativa e interessante.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 font-geist text-xs font-semibold tracking-wider text-text-primary">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        className="description transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-border" />

        {/* Bottom bar: copyright + social icons */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="description text-[13px]">
            © 2025 SPACED. Todos os direitos reservados. Dados integrados
            via NASA APIs.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-primary"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}