import React, { forwardRef, useId } from "react";

interface Props {
  label: string;
}

const Input = forwardRef<
  HTMLInputElement,
  Props & React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-primary font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={` ${className} px-3 py-2 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full focus:ring-2 focus:ring-pink-400 ring-inset`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
