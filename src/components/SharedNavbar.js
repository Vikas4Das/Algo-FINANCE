import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hexagon, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SharedNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, points } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  // Enhanced helper for active link styling
  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#00E599] font-bold" 
      : "text-slate-400 hover:text-white transition-colors";
  };

  return (
    <nav className="bg-[#080808] border-b border-white/5 px-6 md:px-10 h-20 flex items-center justify-between sticky top-0 bg-[#080808]/85 backdrop-blur-xl z-50 relative">
      
      {/* ================= LEFT SIDE: LOGO ================= */}
      <div className="z-10 flex-shrink-0">
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 hover:opacity-80 transition-opacity">
          <span className="text-[#00E599]">Algo</span>
          <span className="text-white">Finance</span>
        </Link>
      </div>

      {/* ================= CENTER: NAVIGATION (ABSOLUTELY CENTERED) ================= */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/learn" className={isActive('/learn')}>Learn</Link>
        <Link to="/playground" className={isActive('/playground')}>Playground</Link>
        <Link to="/news" className={isActive('/news')}>News</Link>
        <Link to="/portfolio" className={isActive('/portfolio')}>Portfolio</Link>
        
        {/* Enhanced AI Advisor Badge with Sparkles */}
        <Link 
          to="/advisor" 
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-300 ${
            location.pathname === '/advisor'
            ? "bg-[#00E599]/10 border-[#00E599]/50 text-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.1)]"
            : "bg-slate-800/40 border-slate-700/60 text-white hover:bg-slate-800 hover:border-[#00E599]/50 hover:text-[#00E599]"
          }`}
        >
          <Sparkles size={14} className={location.pathname === '/advisor' ? "animate-pulse" : ""} />
          AI Advisor
        </Link>
      </div>

      {/* ================= RIGHT SIDE: POINTS & AUTH / USER ================= */}
      <div className="flex items-center gap-4 z-10">
        
        {/* Points Pill (Converted to Link for Rewards) */}
        <Link 
          to="/rewards" 
          className="group hidden sm:flex items-center gap-2 bg-[#12161A] border border-slate-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-inner hover:border-amber-400/40 transition-all duration-300"
        >
          <Hexagon size={14} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
          <span className="text-amber-400 tracking-wide">
            {points?.toLocaleString() || 0}{' '}
            <span className="text-slate-500 font-medium group-hover:text-slate-300 transition-colors">pts</span>
          </span>
        </Link>
        
        {/* Subtle Divider */}
        <div className="w-px h-6 bg-slate-800 hidden sm:block mx-1"></div>

        {/* Auth Buttons / User info */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              <span className="hidden sm:inline">Welcome,&nbsp;</span>
              <span className="font-semibold text-white underline decoration-[#00E599]/60 underline-offset-4">
                {user?.name || user?.email || 'Trader'}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-300 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all border border-slate-700/60"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-slate-300 text-sm font-bold px-4 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all">
              Log In
            </Link>
            <Link 
              to="/register" 
              className="bg-[#00E599] text-[#080808] text-sm font-extrabold px-6 py-2.5 rounded-lg hover:bg-[#00c985] hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SharedNavbar;