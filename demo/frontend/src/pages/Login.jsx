import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Eye, EyeOff, Trophy, User, Lock, ArrowLeft, Shield, Zap } from 'lucide-react';
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Demo credentials check
    if (formData.username === 'admin' && formData.password === 'admin123') {
      const adminUser = {
        id: 1,
        username: 'admin',
        email: 'admin@ipl.com',
        role: 'ADMIN'
      };
      const token = 'admin-token-' + Date.now();
      login(adminUser, token);
      toast.success('Welcome Admin! 🏏');
      navigate('/admin');
      setLoading(false);
      return;
    }
    
    if (formData.username === 'user' && formData.password === 'user123') {
      const regularUser = {
        id: 2,
        username: 'user',
        email: 'user@ipl.com',
        role: 'USER'
      };
      login(regularUser, 'user-token');
      toast.success('Welcome to IPL Teams! 🏏');
      navigate('/dashboard');
      setLoading(false);
      return;
    }

    // Check registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => 
      (u.username === formData.username || u.email === formData.username) && 
      u.password === formData.password
    );

    if (user) {
      const token = 'user-token-' + Date.now();
      login(user, token);
      toast.success(`Welcome ${user.username}! 🏏`);
      navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard');
      setLoading(false);
      return;
    }

    // If credentials don't match
    toast.error('Invalid credentials');
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Back to Home */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-orange-200 transition-colors z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <Trophy className="w-6 h-6" />
        <span className="font-semibold">IPL Teams</span>
      </motion.button>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/logos/ipl%20logo.png" alt="IPL" className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-blue-100">
              Sign in to your IPL Team Management account
            </p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Sign In
                </div>
              )}
            </motion.button>
          </form>

          {/* Additional Options */}
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4 text-sm">
              <Link 
                to="/register" 
                className="text-blue-200 hover:text-white transition-colors font-medium"
              >
                Create Account
              </Link>
              <span className="text-blue-300">|</span>
              <button className="text-blue-200 hover:text-white transition-colors font-medium">
                Forgot Password?
              </button>
            </div>

            {/* Security Notice */}
            <div className="flex items-center justify-center space-x-2 text-xs text-blue-200">
              <Shield className="w-4 h-4" />
              <span>Secured with enterprise-grade encryption</span>
            </div>
          </motion.div>
        </motion.div>



        {/* Features Preview */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span className="text-xs">Team Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-xs">Player Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Secure Platform</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;