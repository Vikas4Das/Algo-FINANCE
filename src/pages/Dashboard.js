import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name || user?.email || 'Trader';

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-400 uppercase tracking-[0.25em] mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {displayName}&apos;s Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Here is your simulated market summary and learning progress.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
          <Plus size={20} /> New Paper Trade
        </button>
      </div>
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"><Wallet className="text-blue-400" size={24} /></div>
            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-sm font-bold border border-emerald-400/20">
              <ArrowUpRight size={16} className="mr-1" /> +2.4%
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Buying Power</h3>
          <p className="text-3xl font-bold text-white">$100,000.00</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"><Activity className="text-emerald-400" size={24} /></div>
            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-sm font-bold border border-emerald-400/20">
              <ArrowUpRight size={16} className="mr-1" /> +$450.00
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Today's P/L</h3>
          <p className="text-3xl font-bold text-white">+$450.00</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -z-10 group-hover:bg-purple-500/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"><TrendingUp className="text-purple-400" size={24} /></div>
            <span className="flex items-center text-rose-400 bg-rose-400/10 px-2 py-1 rounded-md text-sm font-bold border border-rose-400/20">
              <ArrowDownRight size={16} className="mr-1" /> -1
            </span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">Active Positions</h3>
          <p className="text-3xl font-bold text-white">3 Assets</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Performance History</h2>
            <select className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors">
              <option>1W</option>
              <option>1M</option>
              <option>1Y</option>
              <option>ALL</option>
            </select>
          </div>
          <div className="h-80 w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/50">
            <TrendingUp className="text-slate-600 mb-4" size={48} />
            <p className="text-slate-400 text-lg font-medium">Recharts Graph Integrating Next! 📈</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-700">
              <div>
                <p className="font-bold text-white">Bought AAPL</p>
                <p className="text-xs text-slate-400 mt-1">Today, 10:24 AM</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-rose-400">-$1,500.00</p>
                <p className="text-xs text-slate-400 mt-1">10 Shares</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-700">
              <div>
                <p className="font-bold text-white">Sold TSLA</p>
                <p className="text-xs text-slate-400 mt-1">Yesterday, 2:15 PM</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-400">+$2,100.00</p>
                <p className="text-xs text-slate-400 mt-1">10 Shares</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;