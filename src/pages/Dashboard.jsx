import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import PasswordCard from '../components/PasswordCard';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import { Search, Plus, X, Menu, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Form State
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [category, setCategory] = useState('General');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const res = await api.get('/passwords');
      setPasswords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { website, email, password: passwordField, category };
    
    try {
      if (currentEdit) {
        await api.put(`/passwords/${currentEdit._id}`, payload);
      } else {
        await api.post('/passwords', payload);
      }
      fetchPasswords();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await api.delete(`/passwords/${id}`);
        fetchPasswords();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (pwd = null) => {
    if (pwd) {
      setCurrentEdit(pwd);
      setWebsite(pwd.website);
      setEmail(pwd.email);
      setPasswordField(pwd.password);
      setCategory(pwd.category);
    } else {
      setCurrentEdit(null);
      setWebsite('');
      setEmail('');
      setPasswordField('');
      setCategory('General');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const filteredPasswords = passwords.filter(p => 
    p.website.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            <header className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Vault</h1>
                <p className="text-textMuted text-sm sm:text-base mt-1">Manage your digital life securely.</p>
              </div>
              <Button onClick={() => openModal()} className="h-11 w-full sm:w-auto justify-center">
                <Plus className="w-5 h-5" />
                Add Item
              </Button>
            </header>

            <div className="relative w-full max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by website or category..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPasswords.map(pwd => (
                <PasswordCard 
                  key={pwd._id} 
                  pwd={pwd} 
                  onEdit={openModal} 
                  onDelete={handleDelete} 
                />
              ))}
              {filteredPasswords.length === 0 && (
                <div className="col-span-full py-12 text-center text-textMuted glass rounded-2xl border-dashed px-4">
                  <p className="text-sm sm:text-base">No items found. Add your first password to get started.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="glass p-6 rounded-2xl w-full max-w-md relative z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  {currentEdit ? 'Edit Item' : 'New Item'}
                </h2>
                <button onClick={closeModal} className="p-2 text-textMuted hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Website / App Name" value={website} onChange={e => setWebsite(e.target.value)} required />
                <Input label="Email / Username" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input label="Password" type="text" value={passwordField} onChange={e => setPasswordField(e.target.value)} required />
                
                <div className="flex flex-col space-y-1 mb-4">
                  <label className="text-sm font-medium text-textMuted">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white [&>option]:bg-surface"
                  >
                    <option value="General">General</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Work">Work</option>
                    <option value="Finance">Finance</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="ghost" type="button" onClick={closeModal}>Cancel</Button>
                  <Button type="submit">{currentEdit ? 'Save Changes' : 'Add Item'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
