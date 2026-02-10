import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, ArrowRight, CheckCircle, XCircle, Zap } from 'lucide-react';
import { Theme } from '../../App';

interface Question {
  id: number;
  type: 'multiple-choice' | 'code-completion';
  text: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: "Which method is used to update state based on the previous state in React?",
    options: [
      "setState(newValue)",
      "setState(prev => prev + 1)",
      "updateState(newValue)",
      "this.state = newValue"
    ],
    correctAnswer: 1,
    explanation: "Using the functional form of setState ensures you are working with the most up-to-date state value, avoiding race conditions."
  },
  {
    id: 2,
    type: 'code-completion',
    text: "Complete the hook to run a side effect only once on mount.",
    codeSnippet: "useEffect(() => {\n  console.log('Mounted');\n}, [___]);",
    options: ["null", "undefined", "true", ""], // Empty string is the answer visual representation roughly
    correctAnswer: 3, // It's effectively index 3 for the empty array concept in this mock
    explanation: "An empty dependency array [] tells React to run the effect only once after the initial render."
  }
];

export function QuizInterface({ theme }: { theme: Theme }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = MOCK_QUESTIONS[currentQIndex];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === question.correctAnswer) {
      setScore(prev => prev + 100);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQIndex < MOCK_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      // End of quiz
      alert("Quiz Complete! Score: " + score);
      setCurrentQIndex(0);
      setScore(0);
      setIsAnswered(false);
      setShowExplanation(false);
      setSelectedOption(null);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      {/* Battle Pass Header */}
      <div className={`mb-8 p-6 rounded-2xl ${
        theme === 'light' ? 'bg-white shadow-sm' : 'bg-slate-800'
      }`}>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="text-amber-500" />
              <span>Season 4: Architect</span>
            </h2>
            <p className="text-slate-500 text-sm">Level 12 • 2,450 XP to next tier</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold font-mono text-indigo-500">{score}</div>
            <div className="text-xs uppercase font-bold text-slate-400">Current XP</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${(currentQIndex / MOCK_QUESTIONS.length) * 100 + 10}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
          {/* Ticks */}
          {[20, 40, 60, 80].map(p => (
            <div key={p} className="absolute top-0 bottom-0 w-0.5 bg-white/30" style={{ left: `${p}%` }} />
          ))}
          {/* Loot Box Icons at intervals */}
          <div className="absolute top-0 bottom-0 right-4 flex items-center">
            <Star size={10} className="text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className={`flex-1 p-8 rounded-3xl relative overflow-hidden ${
            theme === 'light'
              ? 'bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]'
              : 'bg-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]'
          }`}
        >
           <div className="mb-6">
             <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 block">
               Question {currentQIndex + 1} of {MOCK_QUESTIONS.length}
             </span>
             <h3 className="text-2xl font-bold mb-4">{question.text}</h3>
             
             {question.codeSnippet && (
               <pre className={`p-4 rounded-xl font-mono text-sm mb-6 overflow-x-auto ${
                 theme === 'light' ? 'bg-slate-900 text-slate-50' : 'bg-black text-emerald-400'
               }`}>
                 {question.codeSnippet}
               </pre>
             )}
           </div>

           <div className="space-y-3">
             {question.options.map((opt, idx) => {
               // Determine state styling
               let stateClass = '';
               if (isAnswered) {
                 if (idx === question.correctAnswer) stateClass = 'bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
                 else if (idx === selectedOption) stateClass = 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-400 opacity-50';
                 else stateClass = 'opacity-50 grayscale';
               } else {
                 stateClass = theme === 'light' 
                   ? 'bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-white' 
                   : 'bg-slate-900 border-slate-700 hover:border-indigo-500 hover:bg-slate-800';
               }

               return (
                 <button
                   key={idx}
                   onClick={() => handleAnswer(idx)}
                   disabled={isAnswered}
                   className={`w-full p-4 rounded-xl border-2 text-left transition-all font-medium flex justify-between items-center ${stateClass}`}
                 >
                   <span className={question.type === 'code-completion' && idx === 3 ? "italic text-slate-400" : ""}>
                      {question.type === 'code-completion' && idx === 3 ? "[] (Empty Array)" : opt}
                   </span>
                   {isAnswered && idx === question.correctAnswer && <CheckCircle size={20} className="text-emerald-500" />}
                   {isAnswered && idx === selectedOption && idx !== question.correctAnswer && <XCircle size={20} className="text-red-500" />}
                 </button>
               );
             })}
           </div>

           {/* Feedback / Explanation Pop-up */}
           <AnimatePresence>
             {showExplanation && (
               <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className={`mt-6 p-4 rounded-xl border-l-4 ${
                   selectedOption === question.correctAnswer 
                     ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20' 
                     : 'bg-amber-50 border-amber-500 dark:bg-amber-900/20'
                 }`}
               >
                 <div className="flex gap-3">
                   <div className="mt-1">
                     <Zap size={18} className={selectedOption === question.correctAnswer ? "text-emerald-500" : "text-amber-500"} />
                   </div>
                   <div>
                     <h4 className="font-bold text-sm mb-1">
                       {selectedOption === question.correctAnswer ? "Correct!" : "Review this concept:"}
                     </h4>
                     <p className="text-sm opacity-80">{question.explanation}</p>
                   </div>
                 </div>
                 
                 <div className="mt-4 flex justify-end">
                   <button 
                     onClick={nextQuestion}
                     className="px-6 py-2 bg-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-600 flex items-center gap-2"
                   >
                     Next Challenge <ArrowRight size={16} />
                   </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
