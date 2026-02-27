import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Activity, 
  BrainCircuit, 
  RefreshCw,
  PieChart as PieIcon,
  User,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

import AIModelTrainer from '../components/AIModelTrainer';

// Your core portfolio data
const initialHoldings = [
  { ticker: 'AAPL', name: 'Apple Inc.', shares: 15, value: 2735, change: 1.2, isPos: true, color: '#00E599', strategy: 'HOLD', reason: 'Strong ecosystem lock-in, wait for AI integration news.' },
  { ticker: 'MSFT', name: 'Microsoft', shares: 8, value: 2993, change: 0.8, isPos: true, color: '#3B82F6', strategy: 'BUY', reason: 'Cloud dominance and OpenAI partnership driving growth.' },
  { ticker: 'NVDA', name: 'NVIDIA', shares: 5, value: 3062, change: 3.4, isPos: true, color: '#A78BFA', strategy: 'BUY', reason: 'GPU demand for LLM training remains at record highs.' },
  { ticker: 'TSLA', name: 'Tesla', shares: 10, value: 2487, change: -2.1, isPos: false, color: '#F43F5E', strategy: 'SELL', reason: 'High volatility and weakening news sentiment in EV sector.' },
  { ticker: 'AMZN', name: 'Amazon', shares: 4, value: 725, change: -1.2, isPos: false, color: '#F59E0B', strategy: 'HOLD', reason: 'Retail margins stabilizing, AWS growth is the key metric.' },
];

const Portfolio = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowFullAnalysis(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFullAnalysis(true);
    }, 2500);
  };

  const chartData = initialHoldings.map(h => ({ name: h.ticker, value: h.value, color: h.color }));

  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans p-6 md:p-10 selection:bg-[#00E599]/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#00E599] uppercase mb-4">
            <Activity size={16} />
            <span>Portfolio Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Your wealth, analyzed</h1>
          <p className="text-slate-400 max-w-2xl text-lg">Real-time asset tracking and LLM-driven strategic auditing.</p>
        </header>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl shadow-xl">
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-2">Total Value</p>
            <p className="text-4xl font-black text-white tracking-tighter mb-2">$48,320</p>
            <p className="text-xs font-bold text-[#00E599]">▲ +12.4% YTD</p>
          </div>
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl shadow-xl">
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-2">Risk Score</p>
            <p className="text-4xl font-black text-amber-500 tracking-tighter mb-2">6.2/10</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Moderate Growth Profile</p>
          </div>
          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl shadow-xl">
            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-2">AI Confidence</p>
            <p className="text-4xl font-black text-blue-400 tracking-tighter mb-2">92%</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Based on Sentiment Data</p>
          </div>
        </div>

        {/* Main Grid: Holdings & Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-[#0D1117] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="text-xl font-bold text-white">Asset Inventory</h3>
              <RefreshCw size={18} className={`text-slate-600 cursor-pointer hover:text-white ${isAnalyzing ? 'animate-spin' : ''}`} />
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-500 uppercase font-bold tracking-widest border-b border-slate-800/50">
                  <th className="px-8 py-4">Ticker</th>
                  <th className="px-8 py-4">Quantity</th>
                  <th className="px-8 py-4 text-right">Market Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {initialHoldings.map((stock) => (
                  <tr key={stock.ticker} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center font-black text-white border border-slate-700 group-hover:border-[#00E599]">
                          {stock.ticker[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white tracking-tight">{stock.ticker}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">{stock.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-400">{stock.shares} Units</td>
                    <td className="px-8 py-5 text-right">
                      <p className="font-bold text-white">${stock.value.toLocaleString()}</p>
                      <p className={`text-xs font-bold ${stock.isPos ? 'text-[#00E599]' : 'text-rose-500'}`}>
                        {stock.isPos ? '▲' : '▼'} {stock.change}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-8 uppercase tracking-widest">
              <PieIcon size={18} className="text-[#00E599]" />
              <span>Diversification</span>
            </div>
            <div className="h-64 w-full mb-8 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0D1117', border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <p className="text-xl font-black text-white tracking-tighter">77% Tech</p>
              </div>
            </div>
            <button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="w-full bg-[#00E599] text-black font-black py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,229,153,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? <RefreshCw className="animate-spin" size={18}/> : <BrainCircuit size={18}/>}
              {isAnalyzing ? "Processing Tensors..." : "Run LLM Deep Audit"}
            </button>
          </div>
        </div>

        {/* ================= DYNAMIC LLM FULL PROFILE ANALYSIS ================= */}
        {showFullAnalysis && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-[#0D1117] border-2 border-[#00E599]/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,153,0.05)]">
              
              {/* Profile Analysis Header */}
              <div className="bg-[#00E599]/10 p-8 border-b border-[#00E599]/20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#00E599] flex items-center justify-center text-[#080808]">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Trader Profile: <span className="text-[#00E599]">Strategic Alpha</span></h3>
                    <p className="text-slate-400 text-sm">LLM Analysis ID: AN-942-X8</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Efficiency</p>
                    <p className="text-lg font-black text-white">88%</p>
                  </div>
                  <div className="text-center px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Risk Rating</p>
                    <p className="text-lg font-black text-amber-400">Moderate</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Share Strategic Breakdown */}
              <div className="p-8">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                  <Zap size={16} className="text-[#00E599]" /> 
                  Dynamic Asset Recommendations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {initialHoldings.map((h) => (
                    <div key={h.ticker} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-white text-xl">{h.ticker}</span>
                          <span className="text-[10px] text-slate-500 font-bold px-2 py-0.5 border border-slate-800 rounded uppercase">{h.name}</span>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border ${
                          h.strategy === 'BUY' ? 'bg-[#00E599]/10 text-[#00E599] border-[#00E599]/30' :
                          h.strategy === 'SELL' ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' :
                          'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {h.strategy}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-slate-800 pl-4">
                        "{h.reason}"
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                        {h.strategy === 'BUY' ? <ArrowUpRight size={12} className="text-[#00E599]"/> : 
                         h.strategy === 'SELL' ? <ArrowDownRight size={12} className="text-rose-500"/> : 
                         <Minus size={12}/>}
                        Target Weight Adjustment: {h.strategy === 'BUY' ? '+5%' : h.strategy === 'SELL' ? '-10%' : 'None'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                   <p className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={16}/> 
                     LLM Executive Summary
                   </p>
                   <p className="text-slate-300 text-sm leading-relaxed">
                     Your overall portfolio health is stable, but current concentration in Tech (77%) makes you vulnerable to sector-specific drawdowns. The LLM suggests harvesting profits from TSLA to fund a larger position in MSFT, which currently shows stronger institutional support and lower relative volatility.
                   </p>
                </div>
              </div>

            </div>
          </div>
        )}

        <AIModelTrainer />

      </div>
    </div>
  );
};

export default Portfolio;