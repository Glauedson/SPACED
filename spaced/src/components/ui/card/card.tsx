import React from "react";
import { twMerge } from "tailwind-merge";

const cardVariants = {
    default: "rounded-xl border border-border bg-card-primary p-5",
    secondary: "rounded-xl border border-[#e5e7eb] bg-card-secondary p-5",
};

interface CardProps extends React.ComponentProps<"div"> {
    variant?: "default" | "secondary";
}

export function Card({
    className,
    variant = "default",
    ...props
}: CardProps) {
    return (
        <div
            className={twMerge(cardVariants[variant], className)}
            {...props}
        />
    );
}

interface CardHeaderProps extends React.ComponentProps<"div"> {
    variant?: "default" | "secondary";
}

const cardHeaderVariants = {
    default: "text-xs font-regular font-geist text-[#8b96a8]",
    secondary: "text-xs font-regular font-geist text-gray-500",
};

export function CardHeader({
    className,
    variant = "default",
    ...props
}: CardHeaderProps) {
    return (
        <div
            className={twMerge(cardHeaderVariants[variant], className)}
            {...props}
        />
    );
}