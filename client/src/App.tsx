import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  BrainCircuit, 
  Settings, 
  Sun, 
  Moon, 
  Globe,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Flame
} from 'lucide-react';
import { Gateway } from './components/auth/Gateway';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { AIChatbot } from './components/chat/AIChatbot';
import { QuizInterface } from './components/quiz/QuizInterface';
import { Calculator } from './components/tools/Calculator';
import { Leaderboard } from './components/leaderboard/Leaderboard';
import { SettingsPage } from './components/settings/SettingsPage';

// Types
export type View = 'dashboard' | 'flashcards' | 'ai-lab' | 'quizzes' | 'leaderboard' | 'settings';
export type Theme = 'light' | 'dark';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState('en');
  const [xp, setXp] = useState(65); // Mock XP percentage

  // Theme Logic
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!isAuthenticated) {
    return (
      <Gateway 
        onLogin={() => setIsAuthenticated(true)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#F0F4F8] text-slate-800' : 'bg-[#0F172A] text-slate-100'
    } overflow-hidden relative`}>
      
      {/* Global XP Bar */}
      <div className="absolute top-0 left-0 w-full h-1 z-50 bg-slate-200 dark:bg-slate-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${xp}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        />
      </div>

      {/* Top Header */}
      <header className={`h-16 flex items-center justify-between px-6 border-b transition-colors z-20 relative ${
        theme === 'light' 
          ? 'bg-white/80 border-slate-200 backdrop-blur-md' 
          : 'bg-slate-900/80 border-slate-800 backdrop-blur-md'
      }`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Acharya
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50">
             <Flame size={18} className="text-orange-500 fill-orange-500 animate-pulse" />
             <span className="text-sm font-bold text-orange-600 dark:text-orange-400">12</span>
          </div>

          {/* Language Toggle */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">
              <Globe size={18} />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
            {/* Simple Dropdown for demo */}
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 hidden group-hover:block p-1 z-50">
              {['en', 'es', 'ar', 'he'].map(lang => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-between"
                >
                  {lang.toUpperCase()}
                  {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors relative overflow-hidden"
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* User Profile / Logout */}
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Sidebar Command Center */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 80 }}
          className={`border-r h-full flex flex-col transition-colors z-10 ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <nav className="flex-1 py-6 px-3 space-y-2">
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('dashboard')}
              theme={theme}
            />
            <SidebarItem 
              icon={<Layers size={20} />} 
              label="Flashcards" 
              active={currentView === 'flashcards'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('flashcards')}
              theme={theme}
            />
            <SidebarItem 
              icon={<MessageSquare size={20} />} 
              label="AI Lab" 
              active={currentView === 'ai-lab'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('ai-lab')}
              theme={theme}
            />
            <SidebarItem 
              icon={<BrainCircuit size={20} />} 
              label="Quizzes" 
              active={currentView === 'quizzes'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('quizzes')}
              theme={theme}
            />
            <SidebarItem 
              icon={<Trophy size={20} />} 
              label="Leaderboard" 
              active={currentView === 'leaderboard'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('leaderboard')}
              theme={theme}
            />
          </nav>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800">
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              active={currentView === 'settings'} 
              isOpen={isSidebarOpen}
              onClick={() => setCurrentView('settings')}
              theme={theme}
            />
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full max-w-7xl mx-auto"
            >
              {currentView === 'dashboard' && <DashboardView theme={theme} onChangeView={setCurrentView} />}
              {currentView === 'flashcards' && <FlashcardDeck theme={theme} />}
              {currentView === 'ai-lab' && <AIChatbot theme={theme} />}
              {currentView === 'quizzes' && <QuizInterface theme={theme} />}
              {currentView === 'leaderboard' && <Leaderboard theme={theme} />}
              {currentView === 'settings' && (
                <SettingsPage 
                  theme={theme} 
                  toggleTheme={toggleTheme}
                  onLogout={() => setIsAuthenticated(false)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Calculator */}
        <Calculator theme={theme} />
      </div>
    </div>
  );
}

// Sub-components for App.tsx to keep it clean-ish
function SidebarItem({ icon, label, active, isOpen, onClick, theme }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group relative ${
        active 
          ? theme === 'light' 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100' 
            : 'bg-indigo-900/20 text-indigo-400 shadow-none'
          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      
      {isOpen && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}

      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className={`absolute left-0 w-1 h-8 rounded-r-full ${
            theme === 'light' ? 'bg-indigo-500' : 'bg-cyan-500'
          }`}
        />
      )}
    </button>
  );
}

function DashboardView({ theme, onChangeView }: any) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Welcome back, Scholar.</h2>
        <p className="text-slate-500 dark:text-slate-400">Your Focus Flow is at 85% today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Cards */}
        {[
          { title: 'Cards Mastered', value: '128', icon: <Layers className="text-emerald-500" />, action: () => onChangeView('flashcards') },
          { title: 'Study Streak', value: '12 Days', icon: <Flame className="text-orange-500" />, action: () => {} },
          { title: 'Quiz Average', value: '92%', icon: <BrainCircuit className="text-indigo-500" />, action: () => onChangeView('quizzes') },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            onClick={stat.action}
            className={`p-6 rounded-2xl cursor-pointer transition-shadow ${
              theme === 'light'
                ? 'bg-white shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
                : 'bg-slate-800 shadow-[8px_8px_16px_#0b101d,-8px_-8px_16px_#27344b]'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                +4%
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity / Graph Placeholder */}
        <div className={`p-6 rounded-2xl h-64 flex flex-col justify-between ${
           theme === 'light'
            ? 'bg-white shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
            : 'bg-slate-800 shadow-[inset_4px_4px_8px_#0b101d,inset_-4px_-4px_8px_#27344b]'
        }`}>
           <h3 className="font-semibold text-lg">Focus Activity</h3>
           <div className="flex-1 flex items-center justify-center text-slate-400 italic">
             Activity Graph Visualization
           </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Recommended Next Steps</h3>
          {[
            { title: "Review 'React Hooks'", subtitle: "24 cards due", color: "bg-orange-500" },
            { title: "AI Tutor Session", subtitle: "Continue 'System Architecture'", color: "bg-blue-500" },
            { title: "Daily Quiz", subtitle: "Topic: Data Structures", color: "bg-purple-500" }
          ].map((item, i) => (
             <div key={i} className={`flex items-center gap-4 p-4 rounded-xl ${
               theme === 'light' ? 'bg-white shadow-sm' : 'bg-slate-800'
             }`}>
               <div className={`w-2 h-12 rounded-full ${item.color}`} />
               <div>
                 <h4 className="font-bold">{item.title}</h4>
                 <p className="text-sm text-slate-500">{item.subtitle}</p>
               </div>
               <button className="ml-auto p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                 <ChevronRight size={20} />
               </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
