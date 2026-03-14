import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white shadow-md",
  secondary: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800",
  outline: "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-indigo-100",
  ghost: "hover:bg-gray-100 active:bg-gray-200 text-gray-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm min-h-[44px]",
  md: "px-4 py-3 text-base min-h-[52px]",
  lg: "px-6 py-4 text-lg min-h-[64px]",
  xl: "px-8 py-5 text-xl min-h-[80px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-2xl font-bold transition-all duration-150 select-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
