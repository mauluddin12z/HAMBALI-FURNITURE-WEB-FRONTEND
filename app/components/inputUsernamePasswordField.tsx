import React from "react";

interface InputFieldProps {
  idFor: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isRequired: boolean;
  autocomplete: string;
}

export default function inputUsernamePasswordField({
  idFor,
  label,
  type,
  value,
  onChange,
  placeholder,
  isRequired,
  autocomplete,
}: InputFieldProps) {
  return (
    <>
      <label
        htmlFor={idFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        autoComplete={autocomplete}
      />
    </>
  );
}
