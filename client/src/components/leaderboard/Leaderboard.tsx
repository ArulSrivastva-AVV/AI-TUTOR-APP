import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Zap, 
  Hexagon, 
  Shield, 
  User, 
  Medal,
  ChevronDown
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Theme } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// --- MOCK DATA ---

const MOCK_USERS = [
  { id: 1, name: "Sarah Connor", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", rank: 1, score: 12450, change: 'up', streak: 45, badges: 12, trend: [10, 20, 15, 30, 25, 40, 50] },
  { id: 2, name: "John Doe", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80", rank: 2, score: 11200, change: 'up', streak: 12, badges: 8, trend: [30, 25, 35, 30, 45, 40, 48] },
  { id: 3, name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", rank: 3, score: 10850, change: 'down', streak: 8, badges: 10, trend: [50, 45, 40, 42, 38, 35, 30] },
  { id: 4, name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", rank: 4, score: 9500, change: 'up', streak: 5, badges: 5, trend: [10, 15, 20, 25, 28, 30, 35] },
  { id: 5, name: "You", avatar: "", rank: 15, score: 6200, change: 'same', streak: 12, badges: 3, trend: [10, 12, 12, 14, 15, 18, 20] },
  // ... more users would be here
];

const MOCK_BADGES = [
  { id: 1, name: "Early Riser", icon: "🌅", unlocked: true },
  { id: 2, name: "Bug Hunter", icon: "🐛", unlocked: true },
  { id: 3, name: "Code Ninja", icon: "🥷", unlocked: true },
  { id: 4, name: "Mastermind", icon: "🧠", unlocked: false },
  { id: 5, name: "Night Owl", icon: "🦉", unlocked: false },
];

export function Leaderboard({ theme }: { theme: Theme }) {
  const [filterTime, setFilterTime] = useState<'Daily' | 'Weekly' | 'All-Time'>('Weekly');
  const [filterGroup, setFilterGroup] = useState<'Global' | 'Classroom' | 'Friends'>('Global');
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Trigger level up demo
  const triggerLevelUp = () => {
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 4000);
  };

  return (
    <div className="h-full flex flex-col gap-6 relative">
      <AnimatePresence>
        {showLevelUp && <LevelUpOverlay theme={theme} />}
      </AnimatePresence>

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Leaderboard
            <button onClick={triggerLevelUp} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors" title="Demo Level Up">
              Demo Level Up
            </button>
          </h2>
          <p className="text-slate-500">Compete with scholars around the world.</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['Global', 'Classroom', 'Friends'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setFilterGroup(g)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterGroup === g
                  ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <span className="text-sm text-slate-500">Timeframe:</span>
           <div className="relative group z-20">
             <button className="flex items-center gap-1 text-sm font-semibold hover:text-indigo-500 transition-colors">
               {filterTime} <ChevronDown size={14} />
             </button>
             <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 hidden group-hover:block p-1">
               {(['Daily', 'Weekly', 'All-Time'] as const).map(t => (
                 <button
                   key={t}
                   onClick={() => setFilterTime(t)}
                   className="w-full text-left px-3 py-2 text-sm rounded hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                 >
                   {t}
                 </button>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0 overflow-hidden">
        
        {/* Left Column: Podium & List */}
        <div className="lg:col-span-2 flex flex-col min-h-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 relative">
          
          {/* Podium Section */}
          <div className="h-64 flex items-end justify-center gap-4 pb-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10">
            {/* 2nd Place */}
            <PodiumUser user={MOCK_USERS[1]} place={2} theme={theme} />
            {/* 1st Place */}
            <PodiumUser user={MOCK_USERS[0]} place={1} theme={theme} />
            {/* 3rd Place */}
            <PodiumUser user={MOCK_USERS[2]} place={3} theme={theme} />
          </div>

          {/* List Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
             {MOCK_USERS.slice(3).map((user) => (
               <LeaderboardItem key={user.id} user={user} theme={theme} />
             ))}
             {/* Add some fake users to enable scrolling */}
             {[...Array(10)].map((_, i) => (
                <div key={i + 10} className="flex items-center p-4 opacity-30">
                  <div className="w-8 text-center font-bold text-slate-400">{i + 6}</div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 mx-4" />
                  <div className="flex-1 h-4 bg-slate-200 rounded w-1/3" />
                  <div className="w-16 h-4 bg-slate-200 rounded" />
                </div>
             ))}
          </div>

          {/* Sticky "Me" Footer */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 border-t shadow-lg z-10 ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
             <div className="flex items-center justify-between text-sm text-slate-500 mb-2 px-2">
               <span>Your Rank</span>
               <span>4 slots away from Top 10</span>
             </div>
             <LeaderboardItem user={MOCK_USERS[4]} theme={theme} isMe />
          </div>
        </div>

        {/* Right Column: Gamification & Stats */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* AI Commentary */}
          <div className={`p-6 rounded-2xl relative overflow-hidden ${
             theme === 'light' 
               ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200' 
               : 'bg-gradient-to-br from-indigo-600 to-purple-800 text-white shadow-none'
          }`}>
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Zap size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur">
                   <Zap size={16} className="text-yellow-300 fill-yellow-300" />
                </div>
                <span className="font-bold text-sm tracking-wide uppercase opacity-90">AI Coach Update</span>
              </div>
              <p className="font-medium text-lg leading-snug">
                "You’ve climbed 50 spots today! At this rate, you'll master the 'React Hooks' repo by Friday."
              </p>
            </div>
          </div>

          {/* Badge Gallery */}
          <div className={`p-6 rounded-2xl border ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Badge Gallery</h3>
              <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                3/12 Unlocked
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {MOCK_BADGES.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className={`w-16 h-16 relative flex items-center justify-center transition-transform group-hover:scale-110 ${
                    badge.unlocked ? '' : 'grayscale opacity-50'
                  }`}>
                    {/* Hexagon Shape SVG */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                      <polygon 
                        points="50 1 95 25 95 75 50 99 5 75 5 25" 
                        fill={badge.unlocked ? (theme === 'light' ? '#F0F9FF' : '#1e293b') : (theme === 'light' ? '#F1F5F9' : '#0f172a')}
                        stroke={badge.unlocked ? '#0EA5E9' : '#94A3B8'}
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="text-2xl relative z-10">{badge.icon}</span>
                  </div>
                  <span className="text-xs font-medium text-center truncate w-full">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function PodiumUser({ user, place, theme }: { user: any, place: number, theme: Theme }) {
  const isFirst = place === 1;
  
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: place * 0.1 }}
      className={`flex flex-col items-center ${isFirst ? '-mt-8 z-10' : ''}`}
    >
      <div className="relative">
        {isFirst && (
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 drop-shadow-lg"
          >
            <Crown size={32} fill="currentColor" />
          </motion.div>
        )}
        
        <div className={`rounded-full p-1 ${
          isFirst 
            ? 'bg-gradient-to-b from-yellow-300 to-yellow-600' 
            : place === 2 
              ? 'bg-gradient-to-b from-slate-300 to-slate-500' 
              : 'bg-gradient-to-b from-amber-600 to-amber-800'
        }`}>
          <div className={`rounded-full overflow-hidden border-2 border-white dark:border-slate-900 ${
            isFirst ? 'w-24 h-24' : 'w-20 h-20'
          }`}>
             <ImageWithFallback src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md border-2 border-white dark:border-slate-900 ${
          isFirst ? 'bg-yellow-500' : place === 2 ? 'bg-slate-400' : 'bg-amber-700'
        }`}>
          {place}
        </div>
      </div>

      <div className={`mt-6 text-center ${isFirst ? 'scale-110' : ''}`}>
        <div className="font-bold truncate max-w-[120px]">{user.name}</div>
        <div className="text-sm font-mono text-indigo-500 font-bold">{user.score.toLocaleString()}</div>
      </div>
      
      {/* 3D Platform Base Visual */}
      <div className={`mt-2 w-24 rounded-t-lg bg-gradient-to-b opacity-20 ${
         isFirst ? 'h-16 from-yellow-500 to-transparent' : place === 2 ? 'h-10 from-slate-500 to-transparent' : 'h-6 from-amber-600 to-transparent'
      }`} />
    </motion.div>
  );
}

function LeaderboardItem({ user, theme, isMe }: { user: any, theme: Theme, isMe?: boolean }) {
  const [nudged, setNudged] = useState(false);

  const handleNudge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNudged(true);
    setTimeout(() => setNudged(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className={`flex items-center gap-4 p-3 rounded-xl border transition-all group ${
        isMe 
          ? theme === 'light' 
            ? 'bg-indigo-50 border-indigo-200' 
            : 'bg-indigo-900/20 border-indigo-900/50'
          : theme === 'light'
            ? 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
            : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
      }`}
    >
      <div className="w-8 text-center font-bold text-slate-400 font-mono text-lg">
        {user.rank}
      </div>
      
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
          {user.avatar ? (
            <ImageWithFallback src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-bold">
               {user.name.charAt(0)}
             </div>
          )}
        </div>
        {/* Hover Mini-Profile (Simplified via Tooltip approach for now) */}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
           <span className="font-bold truncate">{user.name}</span>
           {isMe && <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-bold uppercase">You</span>}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
           <span className="flex items-center gap-1">
             <Shield size={10} /> {user.badges} Badges
           </span>
           <span>•</span>
           <span className="flex items-center gap-1">
             <TrendingUp size={10} className="text-emerald-500" /> +12%
           </span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="w-24 h-8 hidden sm:block">
        <LineChart width={96} height={32} data={user.trend.map((val: number, i: number) => ({ val, i }))}>
          <Line 
            type="monotone" 
            dataKey="val" 
            stroke={user.change === 'up' ? '#10B981' : user.change === 'down' ? '#EF4444' : '#64748B'} 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
          />
        </LineChart>
      </div>
      
      <div className="text-right min-w-[80px]">
        <div className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
          {user.score.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400">XP</div>
      </div>

      {/* Nudge Button */}
      {!isMe && (
        <button 
          onClick={handleNudge}
          className={`p-2 rounded-full transition-all ${
            nudged 
              ? 'bg-yellow-100 text-yellow-600 scale-110' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-yellow-500'
          }`}
          title="Nudge"
        >
          <Zap size={18} className={nudged ? 'fill-current' : ''} />
        </button>
      )}
    </motion.div>
  );
}

function LevelUpOverlay({ theme }: { theme: Theme }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`relative z-10 p-12 rounded-3xl text-center max-w-lg w-full overflow-hidden ${
          theme === 'light' ? 'bg-white' : 'bg-slate-900'
        }`}
      >
        {/* Background Rays Animation */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(99,102,241,0.1)_20deg,transparent_40deg,rgba(99,102,241,0.1)_60deg,transparent_80deg,rgba(99,102,241,0.1)_100deg,transparent_120deg,rgba(99,102,241,0.1)_140deg,transparent_160deg,rgba(99,102,241,0.1)_180deg,transparent_200deg,rgba(99,102,241,0.1)_220deg,transparent_240deg,rgba(99,102,241,0.1)_260deg,transparent_280deg,rgba(99,102,241,0.1)_300deg,transparent_320deg,rgba(99,102,241,0.1)_340deg,transparent_360deg)] pointer-events-none"
        />

        <div className="relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 flex items-center justify-center shadow-xl shadow-yellow-200 dark:shadow-yellow-900/50">
              <Medal size={48} className="text-white" />
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2"
          >
            LEVEL UP!
          </motion.h2>
          
          <p className="text-slate-500 font-medium text-lg mb-8">You reached Level 13</p>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
              <div className="text-xs text-slate-500 uppercase font-bold">Memory</div>
              <div className="text-xl font-bold text-emerald-500">+5%</div>
            </div>
            <div className={`p-4 rounded-xl ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
              <div className="text-xs text-slate-500 uppercase font-bold">Focus</div>
              <div className="text-xl font-bold text-indigo-500">+12%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
