import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut, Shield, X } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const navItemClass = ({ isActive }) => twMerge(clsx(
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
    isActive ? "bg-primary/10 text-primary font-medium" : "text-textMuted hover:bg-white/5 hover:text-text"
  ));

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={twMerge(
        "glass flex flex-col border-r border-white/10 shrink-0 transition-transform duration-300 ease-in-out z-50",
        "fixed inset-y-0 left-0 w-64 md:static md:h-screen md:sticky md:top-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Vaultify
            </h1>
          </div>
          
          {/* Close Menu Button on Mobile */}
          <button 
            onClick={onClose}
            className="md:hidden p-2 text-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 pb-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col">
            <span className="text-xs text-textMuted">Logged in as</span>
            <span className="text-sm font-medium truncate">{user?.username}</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink to="/dashboard" onClick={onClose} className={navItemClass}>
            <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/settings" onClick={onClose} className={navItemClass}>
            <Settings className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
