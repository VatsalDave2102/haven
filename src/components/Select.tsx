import React, { forwardRef, useId } from "react";

interface Props {
  options: string[];
  label: string;
}

const Select = forwardRef<
  HTMLSelectElement,
  Props & React.SelectHTMLAttributes<HTMLSelectElement>
>(function Input({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-primary dark:text-secondary font-semibold"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-sm bg-white dark:bg-slate-800 text-primary dark:text-white outline-none duration-200 border border-gray-200 focus:ring-4 focus:ring-pink-400 ring-inset w-full block cursor-pointer ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="rounded-sm">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
