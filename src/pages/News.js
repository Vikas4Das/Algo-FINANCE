import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Newspaper, BrainCircuit, TrendingUp, TrendingDown, Clock, Tag, ArrowRight, Twitter, Linkedin, Command, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// ================= FALLBACK DATA =================
// This ensures your UI stays beautiful even if the backend fetch fails during a demo.
const fallbackNewsData = [
  {
    source: 'Reuters',
    timeAgo: '2h ago',
    sentiment: 'Bullish',
    headline: 'Fed Signals Potential Rate Pause Amid Cooling Inflation Data',
    summary: 'Federal Reserve officials hinted at halting rate hikes as CPI data shows easing inflationary pressures, boosting market sentiment.',
    impactPercentage: 78,
    assets: ['SPY', 'QQQ', 'TLT'],
  },
  {
    source: 'Bloomberg',
    timeAgo: '4h ago',
    sentiment: 'Bullish',
    headline: 'NVIDIA Earnings Beat Estimates by 40% on AI Chip Demand',
    summary: 'Surging demand for AI accelerators drove NVIDIA to record quarterly revenues, sending the stock up 12% in after-hours trading.',
    impactPercentage: 92,
    assets: ['NVDA', 'AMD', 'SMCI'],
  },
  {
    source: 'ET',
    timeAgo: '5h ago',
    sentiment: 'Bullish',
    headline: 'India GDP Growth Beats Expectations at 7.2%',
    summary: "India's economy grew at 7.2% in Q3, beating estimates of 6.8%, driven by strong manufacturing and services sector.",
    impactPercentage: 85,
    assets: ['NIFTY', 'SENSEX', 'BANKNIFTY'],
  },
  {
    source: 'Mint',
    timeAgo: '6h ago',
    sentiment: 'Bullish',
    headline: 'RBI Keeps Repo Rate Unchanged at 6.5%',
    summary: 'Reserve Bank of India maintained its benchmark repo rate at 6.5% citing ongoing inflation concerns while supporting growth.',
    impactPercentage: 72,
    assets: ['NIFTY', 'PSU Banks', 'Realty'],
  },
  {
    source: 'CNBC',
    timeAgo: '10h ago',
    sentiment: 'Bearish',
    headline: 'Oil Prices Drop 5% on Surprise OPEC+ Production Increase',
    summary: 'Crude oil tumbled after OPEC+ nations agreed to increase production by 2 million barrels per day starting next month, erasing recent gains.',
    impactPercentage: 68,
    assets: ['XLE', 'XOM', 'CVX'],
  },
  {
    source: 'MarketWatch',
    timeAgo: '1d ago',
    sentiment: 'Bearish',
    headline: 'Treasury Yields Hit 5% as Strong Jobs Data Dampens Rate Cut Hopes',
    summary: 'Bond yields surged across the curve after the latest non-farm payrolls report showed unexpected strength in the labor market, defying recession fears.',
    impactPercentage: 90,
    assets: ['TLT', 'IEF', 'SHY'],
  },
];

const alertSimulatedData = {
  source: 'AlgoFinance AI Terminal',
  headline: '🚨 UNUSUAL OPTIONS ACTIVITY DETECTED: Massive call buying in TSLA ahead of earnings call.',
  sentiment: 'Bullish',
  impactPercentage: 95
};

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for the Pop-up Alert System
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);

  // 1. DYNAMIC FETCHING LOGIC
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use environment variable for API URL, fallback to empty string for demo mode
        const API_URL = process.env.REACT_APP_API_URL || '';
        
        if (API_URL) {
          const res = await axios.get(`${API_URL}/api/news`);
          if (res.data && res.data.length > 0) {
            setNews(res.data);
          } else {
            setNews(fallbackNewsData);
          }
        } else {
          // No backend configured, use fallback demo data
          setNews(fallbackNewsData);
        }
      } catch (err) {
        console.log("Backend not connected or route missing, using UI fallback data for demo.");
        setNews(fallbackNewsData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 2. LIVE POP-UP ALERT LOGIC
  useEffect(() => {
    // Simulate a live breaking news alert firing 3 seconds after the page loads
    const alertTimer = setTimeout(() => {
      setAlertData(alertSimulatedData);
      setShowAlert(true);
    }, 3000);

    // Auto-hide the alert after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowAlert(false);
    }, 13000);

    return () => {
      clearTimeout(alertTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#080808] flex items-center justify-center text-[#00E599] font-bold text-xl">Loading AI Market Intelligence...</div>;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans selection:bg-[#00E599]/30 relative overflow-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="bg-slate-950 border-b border-slate-800/60 py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#00E599] uppercase mb-4">
              <Newspaper size={18} />
              <span>Real-Time Market Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              News → <br /> <span className="text-[#00E599]">Market impact</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl text-lg leading-relaxed">
              Our ML model analyzes every headline for sentiment and quantifies its expected market impact in real time.
            </p>
          </div>
          <div className="w-full md:w-80 h-80 bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-600 hover:border-[#00E599]/30 hover:bg-[#1A1F26] transition-all">
             <BrainCircuit size={64} className="mb-4 opacity-50"/>
             <span className="font-bold text-xl">System Status</span>
             <p className="text-sm mt-2 leading-relaxed text-[#00E599] font-bold">AI Sentiment Engine is ONLINE and monitoring global feeds.</p>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC NEWS MODULES GRID ================= */}
      <section id="news" className="py-20 px-6 md:px-10 max-w-6xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((article, index) => (
            <div key={index} className="bg-[#0D1117] border border-slate-800/60 p-8 rounded-2xl relative flex flex-col group hover:border-[#00E599]/30 hover:shadow-[0_0_30px_rgba(0,229,153,0.05)] transition-all duration-300">
              
              {/* Top Row: Source, Time, Sentiment */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <span className="font-bold text-slate-400">{article.source}</span>
                    <span className="flex items-center gap-1 text-xs"> <Clock size={12}/> {article.timeAgo} </span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-full border shadow-inner ${article.sentiment === 'Bullish' ? 'text-[#00E599] bg-[#00E599]/10 border-[#00E599]/20' : 'text-rose-500 bg-rose-500/10 border-rose-500/20' }`}>
                  {article.sentiment === 'Bullish' ? <TrendingUp size={14} className="opacity-70" /> : <TrendingDown size={14} className="opacity-70" />}
                  <span>{article.sentiment}</span>
                </div>
              </div>

              {/* Headline & Summary */}
              <div className="flex-grow">
                <h3 className="text-2xl font-black text-white leading-snug mb-4 tracking-tighter group-hover:text-[#00E599] transition-colors">{article.headline}</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-6">{article.summary}</p>
              </div>

              {/* Dynamic Impact progress bar */}
              <div className="mb-6 pt-6 border-t border-slate-800/60">
                <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Impact</span>
                  <span className="text-white">{article.impactPercentage}%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full appearance-none relative overflow-hidden">
                   <div className={`absolute top-0 left-0 h-1 rounded-full transition-all duration-1000 ${article.sentiment === 'Bullish' ? 'bg-[#00E599]' : 'bg-rose-500' }`} style={{ width: `${article.impactPercentage}%` }}></div>
                </div>
              </div>

              {/* Affected assets tags */}
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500 pt-6 border-t border-slate-800/60">
                <Tag size={16} className="text-slate-600"/>
                {article.assets?.map(asset => (
                    <span key={asset} className="bg-[#1A1F26] text-slate-300 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-700/60 group-hover:bg-[#1A1F26] group-hover:border-[#00E599]/40 transition-all">
                        {asset}
                    </span>
                ))}
              </div>
              
              <button className="absolute bottom-6 right-8 p-2 rounded-full text-slate-600 hover:text-[#00E599] hover:bg-slate-800/60 transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LIVE POP-UP ALERT SYSTEM ================= */}
      {/* This popup slides in from the bottom right seamlessly using Tailwind transitions */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-all duration-700 transform ${
          showAlert ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#080808]/95 backdrop-blur-xl border border-rose-500/50 p-5 rounded-2xl shadow-[0_10px_40px_rgba(244,63,94,0.15)] w-80 md:w-96 flex flex-col gap-3">
          
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest">
              {/* Pulsing red dot animation */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              Breaking AI Alert
            </div>
            <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <h4 className="text-white font-bold text-sm leading-snug">{alertData?.headline}</h4>
          
          <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-800">
             <span className="text-xs font-medium text-slate-500">{alertData?.source} • Just now</span>
             <button className="text-xs font-bold text-[#00E599] hover:text-white transition-colors flex items-center gap-1">
                Analyze <ArrowRight size={12}/>
             </button>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800/60 pt-16 pb-8 px-6 bg-[#080808]">
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

export default NewsPage;