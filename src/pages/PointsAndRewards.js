import React from 'react';
import {
  Target, 
  Gift, 
  DollarSign, 
  BrainCircuit, 
  CornerDownLeft, 
  Star, 
  ShoppingCart,
  BookOpen,
  Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PointsAndRewards = () => {
  const { points = 0, addPoints } = useAuth();

  // Mock data for "Ways to Earn" based on dashboard images
  const earningActivities = [
    { id: 1, type: "Lesson", icon: "Book", name: "Stock Market Fundamentals", points: 50 },
    { id: 2, type: "Quiz", icon: "Brain", name: "RSI Technical Quiz", points: 150 },
    { id: 3, type: "Prediction", icon: "BarChart", name: "Daily Market Prediction", points: 100 },
  ];

  // Mock data for "Vouchers"
  const vouchers = [
    { id: 1, name: "Amazon Pay Gift Card", value: "₹500", cost: 500, color: "from-orange-500 to-yellow-500" },
    { id: 2, name: "Google Play Store", value: "₹250", cost: 250, color: "from-blue-500 to-emerald-500" },
    { id: 3, name: "Swiggy / Zomato", value: "₹200", cost: 200, color: "from-rose-500 to-pink-500" },
    { id: 4, name: "Premium Algo-Signals", value: "1 Month", cost: 1000, color: "from-[#00E599] to-emerald-700" },
  ];

  const progressPercent = Math.min(100, (points / 2000) * 100);
  const ptsToNext = Math.max(0, 2000 - points);

  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans pb-20 selection:bg-[#00E599]/30">
      
      {/* ================= POINTS DASHBOARD HEADER ================= */}
      <section className="pt-12 px-6 md:px-10 max-w-6xl mx-auto mb-16">
        <div className="bg-[#0D1117] border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Your Points Dashboard</h2>
            <p className="text-slate-500 max-w-md text-sm md:text-base leading-relaxed">
              Earn points by learning, predicting, and engaging. Climb the leaderboard to unlock premium features.
            </p>
            <div className="mt-8 flex items-center gap-4">
               <div className="h-2 w-48 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E599] shadow-[0_0_10px_#00E599]"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                 {ptsToNext > 0 ? `${ptsToNext} pts to Level Up` : 'Max level reached'}
               </span>
            </div>
          </div>

          <div className="relative z-10 text-center md:text-right">
            <p className="text-6xl md:text-8xl font-black text-amber-400 tracking-tighter leading-none mb-2">
              {points.toLocaleString()}
            </p>
             <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Total Points</p>
             <span className="bg-amber-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
               Level 3 — Analyst
             </span>
          </div>
        </div>
      </section>

      {/* ================= WAYS TO EARN ================= */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto mb-24">
        <div className="flex items-center gap-3 mb-10">
           <Trophy className="text-[#00E599]" size={24} />
           <h3 className="text-2xl font-black text-white tracking-tight uppercase">Ways to Earn</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {earningActivities.map((act) => (
            <div key={act.id} className="bg-[#0D1117] border border-slate-800 p-8 rounded-2xl group hover:border-[#00E599]/30 transition-all">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-[#1A1F26]">
                <DynamicIcon name={act.icon} className="text-slate-300 group-hover:text-[#00E599]" size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{act.type}</p>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{act.name}</h4>
              <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                 <span className="text-amber-400 font-black text-sm">{act.points} PTS</span>
                 <button
                   type="button"
                   onClick={() => addPoints(act.points)}
                   className="text-xs font-black text-white bg-slate-800 px-4 py-2 rounded-lg hover:bg-[#00E599] hover:text-black transition-all"
                 >
                   Claim
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REDEEM VOUCHERS ================= */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
           <Gift className="text-amber-400" size={24} />
           <h3 className="text-2xl font-black text-white tracking-tight uppercase">Redeem Vouchers</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vouchers.map((v) => (
            <div key={v.id} className="bg-[#0D1117] border border-slate-800 rounded-2xl overflow-hidden group hover:border-amber-400/30 transition-all">
               <div className={`h-32 bg-gradient-to-br ${v.color} flex items-center justify-center relative`}>
                  <ShoppingCart size={40} className="text-white/20" />
                  <p className="absolute bottom-4 left-4 text-2xl font-black text-white leading-none">{v.value}</p>
               </div>
               <div className="p-6">
                  <h4 className="text-sm font-bold text-white mb-1">{v.name}</h4>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Cost: {v.cost} Points</p>
                  <button className="w-full bg-amber-400 text-black text-xs font-black py-3 rounded-xl hover:bg-amber-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                    Redeem <CornerDownLeft size={14} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// Helper for dynamic icons
const DynamicIcon = ({ name, ...props }) => {
  if (name === "Book") return <BookOpen {...props} />;
  if (name === "Brain") return <BrainCircuit {...props} />;
  if (name === "BarChart") return <Target {...props} />;
  return <Star {...props} />;
};

export default PointsAndRewards;