import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedBorderButton: React.FC<AnimatedBorderButtonProps> = ({
  variant = "secondary",
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <div className="relative group">
      {/* Animated border background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF69B4] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* Button */}
      <Button
        variant={variant}
        className={cn(
          "relative w-full bg-gray-200 dark:bg-black text-black dark:text-white",
          "hover:bg-gray-100 dark:hover:bg-neutral-900",
          "transition-all duration-200",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export default AnimatedBorderButton; 