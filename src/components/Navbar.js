import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react'; // Using this for the little points icon!

const Navbar = () => {
  return (
    <nav className="bg-[#080808] border-b border-slate-800/60 px-6 h-16 flex items-center justify-between font-sans">
      
      {/* Left Side: Logo & Main Links */}
      <div className="flex items-center gap-10">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter">
          <span className="text-[#00E599]">Algo</span>
          <span className="text-white">Finance</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/learn" className="hover:text-white transition-colors">Learn</Link>
          <Link to="/playground" className="hover:text-white transition-colors">Playground</Link>
          <Link to="/news" className="hover:text-white transition-colors">News</Link>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          
          {/* AI Advisor Badge */}
          <Link to="/advisor" className="bg-[#1A1F26] text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-slate-700 transition-colors">
            AI Advisor
          </Link>
          
          {/* Zero Points Text */}
          <span className="text-amber-400 font-bold tracking-wide">
            0 Points
          </span>
        </div>
      </div>

      {/* Right Side: User Actions */}
      <div className="flex items-center gap-4">
        
        {/* Points Pill (Right side) */}
        <div className="hidden sm:flex items-center gap-2 bg-[#1A1F26] border border-slate-700/50 px-3 py-1.5 rounded-full text-sm font-bold">
          <Hexagon size={14} className="text-slate-300" />
          <span className="text-amber-400">1,240 pts</span>
        </div>

        {/* Log In Button */}
        <Link to="/login" className="text-white text-sm font-bold px-5 py-2 rounded-lg border border-transparent hover:border-slate-700 hover:bg-[#1A1F26] transition-all">
          Log In
        </Link>
        
        {/* Sign Up Button */}
        <Link to="/register" className="bg-[#00E599] text-black text-sm font-bold px-5 py-2 rounded-lg hover:bg-[#00c985] transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;