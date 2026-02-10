import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { RotateCcw, Check, X, Info } from 'lucide-react';
import { Theme } from '../../App';

interface CardData {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const MOCK_CARDS: CardData[] = [
  {
    id: 1,
    question: "What is the primary purpose of the React 'useEffect' hook?",
    answer: "To perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
    category: "React Core",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "Explain the concept of 'Hoisting' in JavaScript.",
    answer: "Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.",
    category: "JavaScript",
    difficulty: "Hard"
  },
  {
    id: 3,
    question: "What is the difference between 'flex-direction: row' and 'row-reverse'?",
    answer: "Row lays out items from left to right (in LTR), while row-reverse lays them out from right to left.",
    category: "CSS Layout",
    difficulty: "Easy"
  },
  {
    id: 4,
    question: "What does the 'A' stand for in 'AJAX'?",
    answer: "Asynchronous. Asynchronous JavaScript And XML.",
    category: "Web Fundamentals",
    difficulty: "Easy"
  }
];

export function FlashcardDeck({ theme }: { theme: Theme }) {
  const [cards, setCards] = useState(MOCK_CARDS);
  const [swipedCards, setSwipedCards] = useState<number[]>([]);
  
  // SRS Stats
  const dailyGoal = 20;
  const reviewedCount = swipedCards.length;
  const progress = (reviewedCount / dailyGoal) * 100;

  const handleSwipe = (id: number, direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on card ${id}`);
    setSwipedCards([...swipedCards, id]);
    // Move card to back or remove
    setTimeout(() => {
      setCards((prev) => prev.filter(c => c.id !== id));
    }, 200);
  };

  return (
    <div className="h-full flex flex-col items-center">
      {/* SRS Progress Header */}
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-slate-200 dark:text-slate-800"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="175.9"
                strokeDashoffset={175.9 - (175.9 * progress) / 100}
                className="text-indigo-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
              {reviewedCount}/{dailyGoal}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Daily Review</h2>
            <p className="text-slate-500 text-sm">Keep up the streak!</p>
          </div>
        </div>
        
        <button className="text-sm font-medium text-indigo-500 hover:text-indigo-600">
          View Deck Stats
        </button>
      </div>

      {/* Deck Area */}
      <div className="flex-1 w-full max-w-md relative flex items-center justify-center min-h-[400px]">
        <AnimatePresence>
          {cards.map((card, index) => {
            // Only render top 3 cards for performance/visuals
            if (index > 2) return null;
            const isTop = index === 0;
            
            return (
              <Flashcard 
                key={card.id} 
                data={card} 
                index={index} 
                theme={theme}
                isTop={isTop}
                onSwipe={(dir) => handleSwipe(card.id, dir)}
              />
            );
          })}
          {cards.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="text-center p-8"
             >
               <h3 className="text-2xl font-bold mb-2">All Caught Up!</h3>
               <p className="text-slate-500">You've mastered your daily deck.</p>
               <button 
                 onClick={() => { setCards(MOCK_CARDS); setSwipedCards([]); }}
                 className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium"
               >
                 Review Again
               </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Controls / Legend */}
      {cards.length > 0 && (
        <div className="mt-8 flex gap-8 items-center text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
              <X size={16} />
            </div>
            <span>Review Later</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
              <Check size={16} />
            </div>
            <span>Mastered</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface FlashcardProps {
  data: CardData;
  index: number;
  theme: Theme;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

function Flashcard({ data, index, theme, isTop, onSwipe }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Visual cues for swipe direction
  const overlayRightOpacity = useTransform(x, [0, 100], [0, 0.4]);
  const overlayLeftOpacity = useTransform(x, [0, -100], [0, 0.4]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!isTop) return;
    
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ 
        x: isTop ? x : 0, 
        rotate: isTop ? rotate : 0,
        zIndex: 100 - index,
        scale: 1 - index * 0.05,
        y: index * 15,
        cursor: isTop ? 'grab' : 'default'
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute w-full h-80 perspective-1000"
    >
      <motion.div
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* Front */}
        <div 
          onClick={() => isTop && setIsFlipped(!isFlipped)}
          className={`absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col justify-between border ${
            theme === 'light'
              ? 'bg-white border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
              : 'bg-slate-800 border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.2)]'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
              {data.category}
            </span>
            <Info size={18} className="text-slate-300" />
          </div>
          
          <h3 className="text-2xl font-bold text-center leading-tight">
            {data.question}
          </h3>
          
          <div className="text-center text-sm text-slate-400 font-medium">
            Tap to flip
          </div>

          {/* Swipe Overlay Indicators */}
          <motion.div 
            style={{ opacity: overlayRightOpacity }}
            className="absolute inset-0 bg-emerald-500 rounded-3xl z-10 pointer-events-none flex items-center justify-center"
          >
            <Check size={64} className="text-white" />
          </motion.div>
          <motion.div 
            style={{ opacity: overlayLeftOpacity }}
            className="absolute inset-0 bg-red-500 rounded-3xl z-10 pointer-events-none flex items-center justify-center"
          >
             <X size={64} className="text-white" />
          </motion.div>
        </div>

        {/* Back */}
        <div 
          onClick={() => isTop && setIsFlipped(!isFlipped)}
          className={`absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col justify-between border ${
            theme === 'light'
              ? 'bg-slate-50 border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
              : 'bg-slate-900 border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.2)]'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        >
          <div className="flex justify-end">
             <RotateCcw size={18} className="text-slate-400" />
          </div>

          <div className="flex-1 flex items-center justify-center">
             <p className="text-lg text-center font-medium leading-relaxed">
               {data.answer}
             </p>
          </div>

          <div className="text-center text-xs text-slate-400 mt-4">
             {data.difficulty}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
