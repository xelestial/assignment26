'use client';

import { useId } from 'react';
import type { ComponentType, SVGProps } from 'react';

type InputProps = {
  name: string;
  type: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Input({ name, type, label, Icon }: InputProps) {
  const id = useId();
  return (
    <label htmlFor={id} className="block">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          id={id}
          name={name}
          type={type}
          required
          placeholder={label}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </label>
  );
}
