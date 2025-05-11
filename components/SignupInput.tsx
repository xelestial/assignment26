'use client';
import { useId } from "react";

type InputProps = {
  name: string;
  type: string;
  label: string;
};

export default function Input({ name, type, label }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-400 font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        className="w-full border rounded text-gray-400 px-3 py-2"
      />
    </div>
  );
}
