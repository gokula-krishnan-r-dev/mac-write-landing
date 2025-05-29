import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-block animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
};
