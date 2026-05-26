import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, Info, Menu } from 'lucide-react';
import Button from '../components/Button';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Navbar */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 glass border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Vaultify</span>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-textMuted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <header>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
              <p className="text-textMuted text-sm sm:text-base mt-1">Manage your account preferences.</p>
            </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              
              <section className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <User className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-textMuted">Username</label>
                    <div className="mt-1 font-medium text-white px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                      {user?.username}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-textMuted">Email Address</label>
                    <div className="mt-1 font-medium text-white px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </section>

              <section className="glass p-6 rounded-2xl border border-red-500/20">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/10">
                  <Shield className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold text-white">Security Area</h2>
                </div>
                
                <p className="text-textMuted text-sm mb-4">
                  For your protection, changing your master password will require you to re-authenticate all your active sessions.
                </p>
                <Button variant="danger" disabled>Change Master Password</Button>
                <p className="text-xs text-textMuted mt-3 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Feature coming soon
                </p>
              </section>

            </div>

            <div className="space-y-6">
              <div className="glass p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10">
                <h3 className="font-semibold text-white mb-2">Pro Features Active</h3>
                <p className="text-sm text-textMuted mb-4">You are currently using the enterprise-grade encrypted vault.</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-center gap-2">✓ Unlimited Passwords</li>
                  <li className="flex items-center gap-2">✓ Advanced Encryption</li>
                  <li className="flex items-center gap-2">✓ Multi-device Sync</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);
};

export default Settings;
