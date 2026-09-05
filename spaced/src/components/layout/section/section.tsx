import { twMerge } from "tailwind-merge";

interface SectionProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={twMerge('bg-background w-full px-6 md:px-12 flex items-center justify-center', className)}
    >
        <div className="max-w-7xl w-full">
            {children}
        </div>
    </section>
  );
}