import { forwardRef } from "react";

/**
 * Input component with label, error, and accessibility
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-semibold text-gray-700 mb-1.5 ${
              required
                ? 'after:content-["*"] after:ml-1 after:text-red-500'
                : ""
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
          w-full px-4 py-2 border rounded-lg shadow-sm transition-all duration-200
          placeholder:text-gray-400
          hover:border-gray-400
          focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300"
          }
        `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            `${error ? errorId : ""} ${helperText ? helperId : ""}`.trim() ||
            undefined
          }
          aria-required={required}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
