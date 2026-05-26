import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Edit, Trash2, Globe, Check } from 'lucide-react';
import Button from './Button';

const PasswordCard = ({ pwd, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pwd.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>

      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">{pwd.website}</h3>
            <span className="text-xs px-2 py-1 bg-white/5 rounded-md text-textMuted border border-white/5">
              {pwd.category}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(pwd)} className="p-2 text-textMuted hover:text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(pwd._id)} className="p-2 text-textMuted hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 z-10 mt-2">
        <div className="flex flex-col">
          <span className="text-xs text-textMuted mb-1">Email / Username</span>
          <div className="text-sm font-medium bg-black/20 p-2 rounded-lg border border-white/5">
            {pwd.email}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-textMuted mb-1">Password</span>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium bg-black/20 p-2 rounded-lg border border-white/5 flex-1 font-mono tracking-wider">
              {showPassword ? pwd.password : '••••••••••••'}
            </div>
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/5 text-textMuted hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button 
              onClick={handleCopy}
              className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors border border-primary/20 relative"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
