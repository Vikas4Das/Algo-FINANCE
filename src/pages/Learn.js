import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  ShieldCheck, 
  BarChart3, 
  LineChart, 
  MonitorPlay, 
  CalendarDays, 
  Play, 
  BrainCircuit, 
  ArrowRight,
  Hexagon,
  Cpu,
  Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';

// ================= PLACEHOLDER DATA =================
// Note: You said you updated the backend, but the frontend needs dynamic data. 
// For this single-page demonstration, I'm embedding data. You should replace this
// section with a `useEffect` hook that makes an API call (e.g., using axios) 
// to fetch your real backend data.

const coursesData = [
  {
    icon: <BarChart3 size={32} className="text-blue-400" />,
    level: "BEGINNER",
    title: "Stock Market Fundamentals",
    description: "Learn how markets work, understand P/E ratios, market cap, and basic trading concepts.",
    lessons: 8,
    time: 45,
    pts: 400,
    theme: "blue"
  },
  {
    icon: <LineChart size={32} className="text-rose-400" />,
    level: "INTERMEDIATE",
    title: "Technical Analysis",
    description: "RSI, MACD, Bollinger Bands - master the tools professional traders use daily.",
    lessons: 12,
    time: 120,
    pts: 600,
    theme: "rose"
  },
  {
    icon: <ShieldCheck size={32} className="text-amber-400" />,
    level: "INTERMEDIATE",
    title: "Risk Management",
    description: "Portfolio diversification, stop-loss strategies, position sizing, and hedging techniques.",
    lessons: 10,
    time: 90,
    pts: 500,
    theme: "amber"
  }
];

const videosData = [
  {
    id: 1,
    title: "Understanding Order Flow Analysis",
    category: "Trading Strategies",
    duration: "18:45",
    pts: 50,
    thumbnail: "https://images.unsplash.com/photo-1611974780755-961d0f81400d?q=80&w=400"
  },
  {
    id: 2,
    title: "Mastering Options Spreads",
    category: "Derivatives",
    duration: "25:32",
    pts: 80,
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400"
  },
  {
    id: 3,
    title: "How to Read an Earnings Report",
    category: "Fundamental Analysis",
    duration: "12:15",
    pts: 30,
    thumbnail: "https://images.unsplash.com/photo-1612178902645-4547d8737d0c?q=80&w=400"
  }
];

const eventsData = [
  {
    day: "15",
    month: "OCT",
    title: "Algo Finance Grand Opening Workshop",
    type: "Webinar",
    time: "10:00 AM EST",
    location: "Online (Zoom)",
    pts: 200
  },
  {
    day: "22",
    month: "OCT",
    title: "Live Q&A: Post-Fed Meeting Market Analysis",
    type: "Workshop",
    time: "4:00 PM EST",
    location: "Online (Google Meet)",
    pts: 100
  }
];

// Question bank for Stock Market Fundamentals quiz.
// A random subset will be used each time the learner starts the quiz.
const stockFundamentalsQuizBank = [
  {
    id: 'q1',
    question: 'What does the P/E (price-to-earnings) ratio compare?',
    options: [
      'Company revenue to its share price',
      'Company earnings per share to its share price',
      'Company debt to its equity',
      'Dividend yield to its market cap',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'Market capitalization (market cap) is calculated as:',
    options: [
      'Share price × total shares outstanding',
      'Net income × dividend payout ratio',
      'Total assets − total liabilities',
      'Earnings per share × share price',
    ],
    correctIndex: 0,
  },
  {
    id: 'q3',
    question: 'Which order type guarantees execution but not price?',
    options: ['Limit order', 'Market order', 'Stop-limit order', 'Good-till-cancelled order'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    question: 'Which statement best describes a dividend?',
    options: [
      'A mandatory fee paid to the stock exchange',
      'A share of company profits paid to shareholders',
      'A penalty for selling shares early',
      'The cost of buying a stock on margin',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    question: 'Blue-chip stocks are typically known for:',
    options: [
      'Being highly speculative penny stocks',
      'Belonging to large, stable, and established companies',
      'Only existing in emerging markets',
      'Having the highest possible daily volatility',
    ],
    correctIndex: 1,
  },
];

// AI model donut chart data (training/validation/inference split – proportions)
const getModelChartData = () => [
  { name: 'Training', value: 42, color: '#00E599' },
  { name: 'Validation', value: 33, color: '#3B82F6' },
  { name: 'Inference', value: 25, color: '#A855F7' },
];

const LearnPage = () => {
  const { addPoints } = useAuth();
  const [activeCourse, setActiveCourse] = useState(null);
  const [answers, setAnswers] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [earned, setEarned] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  // TensorFlow-style model metrics (simulated live dashboard)
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 87,
    trainingProgress: 94,
    confidence: 91,
    epochs: 24,
    status: 'Active',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setModelMetrics((prev) => ({
        ...prev,
        accuracy: Math.min(99, Math.max(82, prev.accuracy + (Math.random() > 0.6 ? 1 : -1))),
        confidence: Math.min(98, Math.max(85, prev.confidence + (Math.random() > 0.5 ? 1 : -1))),
        trainingProgress: prev.trainingProgress >= 100 ? 100 : Math.min(100, prev.trainingProgress + 1),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const modelChartData = getModelChartData();

  const generateQuiz = () => {
    const shuffled = [...stockFundamentalsQuizBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const handleStartQuiz = (course) => {
    if (course.title !== 'Stock Market Fundamentals') {
      return;
    }
    setActiveCourse(course);
    setCurrentQuiz(generateQuiz());
    setAnswers({});
    setHasSubmitted(false);
    setEarned(0);
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeCourse || currentQuiz.length === 0) return;
    let correct = 0;
    currentQuiz.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });

    const passed = correct >= 2;
    setHasSubmitted(true);

    if (passed && earned === 0) {
      setEarned(activeCourse.pts);
      addPoints(activeCourse.pts);
    }
  };

  const quizScore = currentQuiz.reduce(
    (acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen font-sans selection:bg-[#00E599]/30">
      
      {/* ================= AI LEARN PREDICTION MODEL BOARD ================= */}
      <section className="bg-[#0B0F13] border-b border-slate-800/60 py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30">
              <Cpu size={22} className="text-[#00E599]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                AI Learn Prediction Model
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5">
                TensorFlow-style learning dashboard
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <Activity size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{modelMetrics.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut chart - model output distribution */}
            <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                Model output distribution
              </p>
              <div className="w-full h-56 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelChartData}
                      innerRadius={52}
                      outerRadius={72}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {modelChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0D1117',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span className="text-2xl font-black text-white tracking-tighter">
                    {modelMetrics.accuracy}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Accuracy
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-2 flex-wrap justify-center">
                {modelChartData.map((d) => (
                  <span key={d.name} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Metric cards - TensorFlow-like stats */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Accuracy
                </p>
                <p className="text-2xl font-black text-[#00E599] tracking-tight">{modelMetrics.accuracy}%</p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Training
                </p>
                <p className="text-2xl font-black text-blue-400 tracking-tight">{modelMetrics.trainingProgress}%</p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Confidence
                </p>
                <p className="text-2xl font-black text-violet-400 tracking-tight">{modelMetrics.confidence}%</p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Epochs
                </p>
                <p className="text-2xl font-black text-amber-400 tracking-tight">{modelMetrics.epochs}</p>
              </div>
              <div className="col-span-2 sm:col-span-4 bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Model status</span>
                <span className="text-xs font-mono text-[#00E599]">inference ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HEADER SECTION ================= */}
      <section className="bg-slate-950 border-b border-slate-800/60 py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#00E599] uppercase mb-4">
              <BrainCircuit size={18} />
              <span>Finance Academy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Build your<br /> <span className="text-[#00E599]">financial IQ</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl text-lg leading-relaxed">
              Unlock the secrets of the stock market. Master trading strategies, technical analysis, and risk management with guided assessments and interactive lessons.
            </p>
          </div>
          <div className="w-full md:w-80 h-80 bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-600">
             <BookOpen size={64} className="mb-4 opacity-50"/>
             <span className="font-bold text-xl">Courses Grid integration Next...</span>
             <p className="text-sm mt-2 leading-relaxed"> Structured courses from basics to advanced trading strategies with AI-guided assessments.</p>
          </div>
        </div>
      </section>

      {/* ================= 🎓 Structured Courses Grid ================= */}
      <section id="courses" className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-l-4 border-amber-400 pl-6">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Structured Courses</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md leading-relaxed">Complete courses from beginner to professional, based on proven market strategies.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-white transition-colors">
            Explore All Courses <ArrowRight size={18} />
          </button>
        </div>

        {/* Dynamic Courses Grid - Pixel Perfect based on image_8.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
          <div key={index} className="bg-[#0D1117] border border-slate-800/60 p-8 rounded-2xl relative flex flex-col group hover:border-[#00E599]/30 transition-all duration-300">
              
              {/* Top Row: Icon and Points badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-800/60 rounded-xl flex items-center justify-center border border-slate-700 group-hover:bg-[#1A1F26] group-hover:border-[#00E599]/40 transition-all">
                  {course.icon}
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20 shadow-inner">
                  <Hexagon size={14} className="opacity-70" />
                  <span>+{course.pts} PTS</span>
                </div>
              </div>

              {/* Course Title and difficulty */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 text-sm font-bold tracking-wider text-slate-500 mb-2 uppercase">
                    <span className={`text-xs px-2 py-0.5 rounded font-black ${course.level === 'BEGINNER' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' : 'bg-amber-500/10 text-amber-400 border border-amber-400/20' }`}>
                      {course.level}
                    </span>
                    <span>Finance Fundamentals</span>
                </div>
                <h3 className="text-2xl font-black text-white leading-tight mb-4 tracking-tighter group-hover:text-[#00E599] transition-colors">{course.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-6">{course.description}</p>
              </div>

              {/* Course Details */}
              <div className="flex items-center gap-6 pt-6 border-t border-slate-800/60 text-sm font-medium text-slate-500">
                <span>{course.lessons} lessons</span>
                <span>•</span>
                <span>{course.time} min</span>
              </div>
              <button
                type="button"
                onClick={() => handleStartQuiz(course)}
                className={`absolute bottom-6 right-6 p-2 rounded-full transition-colors ${
                  course.title === 'Stock Market Fundamentals'
                    ? 'text-slate-600 hover:text-[#00E599] hover:bg-slate-800/60'
                    : 'text-slate-700 cursor-not-allowed'
                }`}
                title={
                  course.title === 'Stock Market Fundamentals'
                    ? 'Start quiz'
                    : 'Quiz coming soon'
                }
              >
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= QUIZ PANEL FOR STOCK MARKET FUNDAMENTALS ================= */}
      {activeCourse && activeCourse.title === 'Stock Market Fundamentals' && (
        <section className="pb-24 px-6 md:px-10 max-w-4xl mx-auto">
          <div className="bg-[#0B0F13] border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl mt-8">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.25em] mb-2">
                  Quiz • +{activeCourse.pts} pts
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Stock Market Fundamentals Check
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-xl">
                  Answer at least 2 out of 3 questions correctly to earn your points.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveCourse(null);
                  setAnswers({});
                  setHasSubmitted(false);
                  setEarned(0);
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-300 underline underline-offset-4"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              {currentQuiz.map((q, idx) => (
                <div key={q.id} className="bg-[#0D1117] border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
                    Question {idx + 1}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-white mb-4">
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const selected = answers[q.id] === optIndex;
                      const isCorrect = hasSubmitted && q.correctIndex === optIndex;
                      const isWrong =
                        hasSubmitted && selected && q.correctIndex !== optIndex;

                      let optionClasses =
                        'w-full text-left text-sm rounded-xl border px-3 py-2.5 transition-all text-white';

                      if (!hasSubmitted) {
                        optionClasses += selected
                          ? ' border-emerald-400 bg-emerald-500/10 text-emerald-100'
                          : ' border-slate-800 bg-slate-900 hover:border-slate-600';
                      } else if (isCorrect) {
                        optionClasses +=
                          ' border-emerald-500 bg-emerald-500/10 text-emerald-100';
                      } else if (isWrong) {
                        optionClasses += ' border-rose-500 bg-rose-500/10 text-rose-100';
                      } else {
                        optionClasses += ' border-slate-800 bg-slate-900 text-white';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => !hasSubmitted && handleAnswerChange(q.id, optIndex)}
                          className={optionClasses}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">
              <div className="text-xs text-slate-400">
                {hasSubmitted ? (
                  <span>
                    You answered <span className="font-semibold text-white">{quizScore}</span> /{' '}
                    {currentQuiz.length} correctly.
                    {earned > 0 ? (
                      <span className="ml-2 text-emerald-400 font-semibold">
                        +{earned} pts added to your balance.
                      </span>
                    ) : (
                      <span className="ml-2 text-rose-400 font-semibold">
                        Score at least 2 to earn points.
                      </span>
                    )}
                  </span>
                ) : (
                  <span>Select an answer for each question, then submit to see your score.</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="w-full md:w-auto bg-[#00E599] text-[#080808] text-sm font-black px-8 py-3 rounded-xl hover:bg-[#00c985] hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] transition-all"
              >
                {hasSubmitted ? 'Check Again' : 'Submit Quiz'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= 📺 Video Modules Section ================= */}
      <section id="videos" className="bg-[#0B0F13] border-t border-slate-800 py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-l-4 border-rose-500 pl-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-rose-400 uppercase mb-2">
                <MonitorPlay size={18} />
                <span>Video Modules</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Quick Interactive Lessons</h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-lg">Watch focused, high-impact video sessions and earn points on your way to mastery.</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
              Explore Video Library <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosData.map(module => (
              <div key={module.id} className="bg-[#0D1117] border border-slate-800/60 rounded-xl group overflow-hidden transition-all duration-300 flex flex-col relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2 text-[11px] font-black text-amber-400 bg-slate-900 px-2.5 py-1 rounded-full border border-amber-400/20 z-10">
                    <Hexagon size={12}/>
                    <span>+{module.pts} PTS</span>
                  </div>
                  
                  <div className="aspect-[16/10] bg-slate-900 overflow-hidden relative">
                    <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 right-2 text-xs font-bold bg-black/70 text-white px-2 py-0.5 rounded tracking-wider">{module.duration}</span>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center"><Play size={20} className="text-white" fill="white" /></div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <span className="text-[11px] font-black text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">{module.category}</span>
                    <h4 className="text-lg font-bold text-white leading-snug group-hover:text-rose-400 transition-colors mb-2 tracking-tight">{module.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">Structured courses from basics to advanced trading strategies with AI-guided assessments.</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 🗓️ Event Schedule Section ================= */}
      <section id="events" className="py-24 px-6 md:px-10 max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 md:gap-0 border-l-4 border-[#00E599] pl-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-[#00E599] uppercase mb-2">
              <CalendarDays size={18} />
              <span>Event Details</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">Live Workshops & Webinars</h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-lg">Join live sessions, Q&As, and advanced strategy deep-dives with head analysts.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
            Register for Workshops <ArrowRight size={18} />
          </button>
        </div>

        <div className="space-y-6">
          {eventsData.map((event, index) => (
            <div key={index} className="bg-[#0D1117] border border-slate-800/60 p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 hover:border-[#00E599]/20 transition-all duration-300">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 flex flex-col justify-center items-center text-center bg-slate-900 border border-slate-800 p-2 rounded-lg text-[#00E599]">
                        <span className="text-xl font-extrabold tracking-tighter leading-none">{event.day}</span>
                        <span className="text-xs font-black uppercase tracking-wider">{event.month}</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                            <DynamicIcon type={event.type} />
                            <span>{event.type}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white tracking-tight mb-2 hover:text-[#00E599] transition-colors">{event.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-xl">Join live Q&As, post-earnings analyses, and advanced strategy deep-dives with head analysts.</p>
                        <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                           <span>🕒 {event.time}</span>
                           <span>•</span>
                           <span>🗺️ {event.location}</span>
                        </div>
                    </div>
                </div>
                
                <div className="text-right flex flex-col gap-4 items-end flex-shrink-0">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 bg-slate-900 px-3 py-1.5 rounded-full border border-amber-400/20 shadow-inner">
                    <Hexagon size={14} className="opacity-70" />
                    <span>+{event.pts} PTS</span>
                  </div>
                   <button className="bg-gradient-to-r from-[#00E599] to-[#00c985] text-black text-sm font-bold px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:-translate-y-0.5 transition-all">
                      Secure my spot
                   </button>
                </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ================= FOOTER ================= */}
       <footer className="border-t border-slate-800/60 pt-16 pb-8 px-6 bg-[#080808]">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-slate-600">
             <p>© 2024 Algo Finance Academy. All rights reserved.</p>
             <div className="flex gap-4">
                <span>Platform</span>
                <span>Resources</span>
                <span>Company</span>
             </div>
          </div>
       </footer>

    </div>
  );
};

const DynamicIcon = ({ type }) => {
  if (type === 'Webinar') return <MonitorPlay size={14} />;
  return <Target size={14} />;
};

export default LearnPage;