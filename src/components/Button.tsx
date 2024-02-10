import React from "react";

interface Props {
  bgColor?: string;
  textColor?: string;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<
  Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, bgColor, textColor, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-sm font-semibold ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
