import React, { useId } from 'react';

function Input({ label, type, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type || "text"}
        {...props}
        ref={ref}
        className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200 text-sm ${className}`}
      />
    </div>
  );
}

export default React.forwardRef(Input);
