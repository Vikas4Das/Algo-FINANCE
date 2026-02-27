import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hexagon, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Newspaper, 
  BarChart2, 
  Bot, 
  Twitter, 
  Linkedin, 
  Command 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans selection:bg-[#00E599]/30">
      
      {/* ================= HERO SECTION ================= */}
      <section className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          Learn. Predict.<br />
          <span className="text-[#00E599] italic font-serif tracking-normal">Profit.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          The unified ecosystem that bridges financial education, 
          real-time market intelligence, and AI-driven advisory 
          into one platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/learn" className="bg-[#00E599] text-black font-bold px-8 py-3.5 rounded-lg hover:bg-[#00c985] transition-colors flex items-center justify-center gap-2">
            Start Learning <ArrowRight size={18} />
          </Link>
          <Link to="/playground" className="bg-transparent border border-slate-700 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#1A1F26] transition-colors">
            Try Playground
          </Link>
        </div>
      </section>

      {/* ================= MARKET TICKERS ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-wrap justify-between gap-6 shadow-2xl">
          <div>
            <p className="text-xs text-slate-500 font-bold tracking-wider mb-1">SENSEX</p>
            <p className="text-xl font-bold text-white">78,456.32</p>
            <p className="text-xs text-[#00E599] font-bold mt-1">▲ +1.24%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold tracking-wider mb-1">NIFTY 50</p>
            <p className="text-xl font-bold text-white">23,892.15</p>
            <p className="text-xs text-[#00E599] font-bold mt-1">▲ +1.18%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold tracking-wider mb-1">NIFTY BANK</p>
            <p className="text-xl font-bold text-white">51,234.67</p>
            <p className="text-xs text-[#00E599] font-bold mt-1">▲ +0.89%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold tracking-wider mb-1">NIFTY IT</p>
            <p className="text-xl font-bold text-white">35,678.90</p>
            <p className="text-xs text-rose-500 font-bold mt-1">▼ -0.45%</p>
          </div>
        </div>
      </section>

      {/* ================= PLATFORM STATS ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-32 border-b border-slate-800/50 pb-20">
        <div className="flex flex-wrap justify-between items-center text-center gap-8">
          <div>
            <p className="text-4xl md:text-5xl font-black text-[#00E599] tracking-tighter mb-2">24K+</p>
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Active Learners</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-[#00E599] tracking-tighter mb-2">98%</p>
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Prediction Accuracy</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-[#00E599] tracking-tighter mb-2">150+</p>
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Finance Courses</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-black text-[#00E599] tracking-tighter mb-2">∞</p>
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Points to Earn</p>
          </div>
        </div>
      </section>

      {/* ================= MODULES GRID ================= */}
      <section className="px-6 max-w-6xl mx-auto mb-32">
        <div className="mb-12">
          <p className="text-[#00E599] text-xs font-bold tracking-widest uppercase mb-4">Platform Modules</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Everything you need<br />in one place.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">+50 pts/lesson</span>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <BookOpen className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Finance Learning</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Structured courses from basics to advanced trading strategies with AI-guided assessments.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">+100 pts/prediction</span>
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
              <Target className="text-rose-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Stock Playground</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Paper-trade and predict stock movements. Compare with AI predictions and earn points.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">+20 pts/read</span>
            <div className="w-12 h-12 bg-slate-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-500/20 transition-colors">
              <Newspaper className="text-slate-300" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">News Intelligence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Real-time news sentiment analysis showing direct market impact with visual indicators.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">+30 pts/analysis</span>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
              <BarChart2 className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Portfolio Analyzer</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Deep portfolio insights: allocation, risk exposure, performance attribution in one dashboard.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">+10 pts/query</span>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Bot className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Advisor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Personalized strategy suggestions powered by your portfolio, news feed, and predictions.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl relative hover:border-slate-600 transition-colors group">
            <span className="absolute top-6 right-6 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Earn & Redeem</span>
            <div className="w-12 h-12 border border-slate-500 rounded-xl flex items-center justify-center mb-6 group-hover:border-slate-400 transition-colors">
              <Hexagon className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Points & Rewards</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Earn points across all modules. Climb leaderboards and unlock premium features.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800/60 pt-16 pb-8 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter mb-4 block">
              <span className="text-[#00E599]">Algo</span>
              <span className="text-white">Finance</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              The unified ecosystem that bridges financial education, real-time market intelligence, and AI-driven advisory into one platform.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/learn" className="hover:text-[#00E599] transition-colors">Learn</Link></li>
              <li><Link to="/playground" className="hover:text-[#00E599] transition-colors">Playground</Link></li>
              <li><Link to="/news" className="hover:text-[#00E599] transition-colors">News</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#00E599] transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/advisor" className="hover:text-[#00E599] transition-colors">AI Advisor</Link></li>
              <li><Link to="/points" className="hover:text-[#00E599] transition-colors">Points</Link></li>
              <li><Link to="/help" className="hover:text-[#00E599] transition-colors">Help Center</Link></li>
              <li><Link to="/blog" className="hover:text-[#00E599] transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-[#00E599] transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-[#00E599] transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-[#00E599] transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-[#00E599] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/60 text-xs text-slate-600">
          <p>© 2024 Algo Finance. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Twitter size={16} className="hover:text-slate-400 cursor-pointer transition-colors" />
            <Linkedin size={16} className="hover:text-slate-400 cursor-pointer transition-colors" />
            <Command size={16} className="hover:text-slate-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;