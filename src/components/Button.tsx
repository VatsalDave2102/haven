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
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
