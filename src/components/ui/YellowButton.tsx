"use client"

import { useState } from "react";

interface YellowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
  fullRounded?: boolean;
  disabled?: boolean;
}

export default function YellowButton({
  children,
  onClick,
  type = "button",
  className = "",
  size = "md",
  fullRounded = true,
  disabled = false
}: YellowButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-2.5 text-base",
    lg: "px-10 py-3.5 text-base"
  };

  const roundedClass = fullRounded ? "rounded-full" : "rounded-2xl";

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={
        `${sizeClasses[size]} ${roundedClass} font-semibold bg-[#FFB84D] text-gray-900 ` +
        `${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffc266] active:scale-[0.97] cursor-pointer'} ` +
        `transition-all duration-300 ${className}`
      }
      style={{
        boxShadow: isPressed
          ? '0 2px 10px rgba(255,184,77,0.2)'
          : disabled
            ? 'none'
            : '0 4px 20px rgba(255,184,77,0.25), 0 0 40px rgba(255,184,77,0.1)',
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
