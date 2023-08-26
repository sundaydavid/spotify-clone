import React from "react";

const TextInput = ({
  label,
  labelClassName,
  placeholder,
  className,
  value,
  setValue,
}) => {
  return (
    <div className={`textInpuDiv flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-gray-300 border-solid rounded placeholder-gray-500"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
