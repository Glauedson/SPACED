import Badge from "@/components/ui/badge/badge";
import React from "react";

export type HeaderAlign = "left" | "center";

export interface HeaderProps {
  /** Background image URL. */
  backgroundImage?: string;
  /** Optional pill/badge rendered above the title. */
  pill?: React.ReactNode;
  /** Main title. */
  title: React.ReactNode;
  /** Supporting text rendered below the title. */
  description?: React.ReactNode;
  /** Free slot rendered after the description (buttons, stats, forms, etc). */
  children?: React.ReactNode;
  /** Content alignment. */
  align?: HeaderAlign;
  /** Whether to render a dark gradient over the background image for contrast. */
  overlay?: boolean;
  /** Minimum height of the header. */
  minHeight?: string;
  /** Extra classes for the container. */
  className?: string;
}

export default function Header({
  backgroundImage,
  pill,
  title,
  description,
  children,
  align = "left",
  overlay = true,
  minHeight = "420px",
  className = "",
}: HeaderProps) {
  const isCenter = align === "center";

  return (
    <header
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ minHeight }}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Dark gradient to keep text readable over the image */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-16 md:px-10 ${
          isCenter ? "items-center text-center" : "items-start text-left"
        }`}
        style={{ minHeight }}
      >
        {pill && (
          <Badge
            text={pill}
            variant="secondary"
           />
        )}

        {title && (
          <h1
            className={`font-extrabold font-syne uppercase leading-[0.95] text-text-primary ${
              isCenter ? "mx-auto" : ""
            }`}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              letterSpacing: "-0.01em",
              maxWidth: "20ch",
            }}
          >
            {title}
          </h1>
        )}

        {description && (
          <p
            className={`mt-5 text-sm leading-relaxed font-geist text-text-secondary md:text-base ${
              isCenter ? "mx-auto" : ""
            }`}
            style={{ maxWidth: "42ch" }}
          >
            {description}
          </p>
        )}

        {/* Free slot: buttons, stats, forms, anything the consumer needs */}
        {children && <div className="mt-8 w-full max-w-7xl">{children}</div>}
      </div>
    </header>
  );
}