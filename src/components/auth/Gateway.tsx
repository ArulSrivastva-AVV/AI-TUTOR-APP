import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, Check } from 'lucide-react';
import { Theme } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Images
import abstractImg from "figma:asset/c70d8883995e.jpg"; // Placeholder reference logic, using URL found earlier
// Wait, I need to use the URL I found earlier, but I can't put https URL directly in figma:asset imports unless I download it or just use the img tag with the URL since I'm in a web environment. 
// The instructions say "Use the special figma:asset import scheme... incorrect: import img from '../imports/figma:asset...'"
// BUT I found the image via Unsplash tool, so I should use the URL directly in the src.
// I will just use the URL directly in a constant.

const ABSTRACT_IMAGE = "https://images.unsplash.com/photo-1763927348348-1215d06a5d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGFic3RyYWN0JTIwZ2VvbWV0cmljJTIwc2hhcGVzJTIwYmx1ZSUyMHdoaXRlJTIwY2xlYW58ZW58MXx8fHwxNzcwNjk0NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface GatewayProps {
  onLogin: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

export function Gateway({ onLogin, theme, toggleTheme }: GatewayProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('password');
      }, 800);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'light' ? 'bg-[#F0F4F8]' : 'bg-[#0F172A]'}`}>
      {/* Left Side - Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-indigo-900/20 z-10" />
        <ImageWithFallback 
          src={ABSTRACT_IMAGE} 
          alt="Abstract 3D Shape" 
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-4"
          >
            Knowledge Growth
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-white/80"
          >
            Experience an adaptive ecosystem that evolves with your learning pace.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <button 
          onClick={toggleTheme}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-md p-8 rounded-3xl ${
            theme === 'light'
              ? 'bg-white/80 backdrop-blur shadow-[20px_20px_60px_#d1d5db,-20px_-20px_60px_#ffffff]'
              : 'bg-slate-800/80 backdrop-blur shadow-[20px_20px_60px_#0b101d,-20px_-20px_60px_#27344b]'
          }`}
        >
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
              Welcome to Acharya
            </h1>
            <p className="text-slate-500">Sign in to continue your flow.</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 justify-center">
              <SocialButton icon={<Chrome size={20} />} label="Google" theme={theme} />
              <SocialButton icon={<Github size={20} />} label="GitHub" theme={theme} />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${theme === 'light' ? 'bg-white text-slate-500' : 'bg-slate-800 text-slate-400'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={step === 'email' ? handleSubmitEmail : handleLogin}>
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={step === 'password'}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all ${
                      theme === 'light'
                        ? 'bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                        : 'bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-900'
                    } ${step === 'password' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {step === 'password' && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
                    >
                      <Check size={20} />
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {step === 'password' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden relative"
                    >
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all ${
                          theme === 'light'
                            ? 'bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
                            : 'bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-900'
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-indigo-200'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-900/50'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {step === 'email' ? 'Continue' : 'Sign In'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SocialButton({ icon, label, theme }: { icon: React.ReactNode, label: string, theme: Theme }) {
  return (
    <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all hover:-translate-y-0.5 ${
      theme === 'light'
        ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
        : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
