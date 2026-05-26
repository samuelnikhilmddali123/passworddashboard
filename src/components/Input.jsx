import React from 'react';

const Input = ({ label, type = "text", ...props }) => {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      {label && <label className="text-sm font-medium text-textMuted">{label}</label>}
      <input
        type={type}
        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-gray-500 transition-all duration-300"
        {...props}
      />
    </div>
  );
};

export default Input;
