"use client"

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
      className={
        `${sizeClasses[size]} ${roundedClass} font-semibold bg-[#FFB84D] text-gray-900 ` +
        `${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffc266] hover:shadow-[0_0_30px_rgba(255,184,77,0.3)] active:scale-[0.97] cursor-pointer'} ` +
        `transition-all duration-300 shadow-lg ${className}`
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
