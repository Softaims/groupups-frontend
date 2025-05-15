import React from "react";

const TextInput = ({ label, type = "text", name, value, onChange, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#030d13] border ${
          error ? "border-red-500" : "border-[#024544]"
        } rounded-md focus:outline-none focus:ring-1 focus:ring-[#4aa6a4] text-white`}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default TextInput;
