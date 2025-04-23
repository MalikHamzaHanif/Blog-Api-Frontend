import React, { useId } from 'react';

function Select({ label, options = [], className, ...props }, ref) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200 text-sm bg-white ${className}`}
      >
        {options.length <= 0 ? (
          <option disabled>No Options</option>
        ) : (
          options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
