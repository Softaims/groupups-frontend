import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
const TextInput = ({ label, type = "text", name, value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-[#030d13] border ${
            error ? "border-red-500" : "border-[#024544]"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-[#4aa6a4] text-white pr-10`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default TextInput;
