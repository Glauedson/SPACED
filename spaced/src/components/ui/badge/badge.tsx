import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    text: React.ReactNode;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
}

const badgeVariants = {
    default:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/[0.09] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm font-geist",

    secondary:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm",

    destructive:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-400",

    outline:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80",

    ghost:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-transparent bg-transparent px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70",

    link:
        "mb-5 inline-flex items-center gap-2 rounded-full border border-transparent bg-transparent px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white underline underline-offset-4",
};

export default function Badge({
    text,
    variant = "default",
    className,
}: BadgeProps) {
    return (
        <div className={twMerge(badgeVariants[variant], className)}>
            {text}
        </div>
    );
}