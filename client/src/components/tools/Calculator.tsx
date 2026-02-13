import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator as CalcIcon, X, Copy, RotateCcw } from 'lucide-react';
import { Theme } from '../../App';

export function Calculator({ theme }: { theme: Theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<string | null>(null);
  const [lastOp, setLastOp] = useState<string | null>(null);

  const handlePress = (val: string) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const calculate = () => {
    try {
      // Very unsafe eval for demo purposes only - in prod use math.js
      // eslint-disable-next-line no-eval
      const res = eval(display.replace('×', '*').replace('÷', '/'));
      setDisplay(String(res));
      setLastOp(display);
    } catch (e) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1000);
    }
  };

  const clear = () => {
    setDisplay('0');
    setLastOp(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    // Could add toast here
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x: 20, y: 20 }}
      className="absolute bottom-8 right-8 z-50"
    >
      <AnimatePresence mode='wait'>
        {!isOpen ? (
          <motion.button
            key="fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-indigo-300' 
                : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-900/50'
            }`}
          >
            <CalcIcon size={24} />
          </motion.button>
        ) : (
          <motion.div
            key="calc"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`w-72 p-4 rounded-3xl backdrop-blur-xl border shadow-2xl overflow-hidden cursor-default ${
              theme === 'light'
                ? 'bg-white/90 border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                : 'bg-slate-900/90 border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sci-Calc</span>
              <div className="flex gap-2">
                 <button onClick={copyToClipboard} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400" title="Snap to Clipboard">
                   <Copy size={14} />
                 </button>
                 <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-full hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 text-slate-400">
                   <X size={14} />
                 </button>
              </div>
            </div>

            {/* Display */}
            <div className={`mb-4 p-4 rounded-2xl text-right overflow-hidden ${
              theme === 'light' ? 'bg-slate-100' : 'bg-slate-950'
            }`}>
              <div className="text-xs text-slate-400 h-4">{lastOp}</div>
              <div className="text-3xl font-mono font-medium tracking-tight truncate">
                {display}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-2">
              {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'sin', '='].map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === 'C') clear();
                    else if (btn === '=') calculate();
                    else if (btn === 'sin') { setDisplay(prev => `Math.sin(${prev})`); }
                    else handlePress(btn);
                  }}
                  className={`h-12 rounded-xl text-sm font-medium transition-colors active:scale-95 flex items-center justify-center ${
                    btn === '=' 
                      ? 'bg-indigo-500 text-white col-span-1'
                      : btn === 'C'
                        ? 'bg-red-100 text-red-500 dark:bg-red-900/30'
                        : ['÷', '×', '-', '+'].includes(btn)
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                          : theme === 'light'
                            ? 'bg-white border border-slate-100 hover:bg-slate-50 text-slate-600'
                            : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
