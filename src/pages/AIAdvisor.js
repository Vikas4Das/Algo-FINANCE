import React, { useState, useRef, useEffect } from 'react';
import { 
  BotMessageSquare, 
  Sparkles, 
  BrainCircuit, 
  CornerDownLeft, 
  LoaderCircle, 
  User, 
  Zap,
  ArrowRight
} from 'lucide-react';

const AIAdvisorPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Neural Link established. I've indexed your portfolio weights and playground history. How can I assist your strategy today?",
      isStreaming: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  // 🔄 Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  // --- HUMAN-LIKE STREAMING EFFECT ---
  const streamText = (fullText) => {
    let currentText = "";
    const words = fullText.split(" ");
    let i = 0;

    // Push an empty AI message to start the stream
    setMessages(prev => [...prev, { sender: 'ai', text: "", isStreaming: true }]);

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += words[i] + " ";
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = currentText;
          return updated;
        });
        i++;
      } else {
        clearInterval(interval);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].isStreaming = false;
          return updated;
        });
      }
    }, 50); // Speed of "human" typing (50ms per word)
  };

  // --- REAL-TIME LLM LOGIC ENGINE ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText, isStreaming: false }]);
    setInputValue("");
    setIsAiTyping(true);

    // Simulated Thinking Delay (1.2 seconds)
    setTimeout(() => {
      setIsAiTyping(false);
      
      let response = "";
      // Contextual Response Logic - Mimics Human Learning
      if (userText.toLowerCase().includes("portfolio")) {
        response = "Analyzing your 77% Tech concentration. Given the current SENSEX volatility, I recommend a 5% hedge into defensive assets. Your current risk score of 6.2 is manageable but requires monitoring.";
      } else if (userText.toLowerCase().includes("learn") || userText.toLowerCase().includes("topic")) {
        response = "I see you're focusing on 'Stock Market Fundamentals'. Based on your progress, the neural net suggests exploring 'Technical Indicators' next to boost your playground accuracy.";
      } else {
        response = `Processing "${userText}" through the AlgoFinance neural net. Market sentiment for related assets is currently Bullish (+14%). Would you like a 7-day volatility simulation?`;
      }

      streamText(response);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-slate-300 font-sans selection:bg-[#00E599]/30">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="bg-slate-950 border-b border-slate-800/60 py-16 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div>
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#00E599] uppercase mb-4">
              <Zap size={18} className="fill-[#00E599]" />
              <span>Real-Time LLM Advisor</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Human-Centric<br /> <span className="text-[#00E599]">Financial Intelligence</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl text-lg leading-relaxed">
              Experience zero-latency strategy re-calibration. Our LLM learns from your activity across the learning modules and playground performance.
            </p>
          </div>
          <div className="hidden lg:flex w-72 h-72 bg-slate-900/50 border border-slate-800 rounded-full items-center justify-center relative shadow-2xl">
              <div className="absolute inset-0 border-2 border-dashed border-[#00E599]/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
              <BrainCircuit size={80} className="text-slate-700" />
          </div>
        </div>
      </section>

      {/* ================= CHAT TERMINAL ================= */}
      <section className="py-12 px-4 md:px-10 max-w-5xl mx-auto mb-20 relative">
        <div className="bg-[#0D1117] border border-slate-800 rounded-3xl flex flex-col h-[650px] shadow-2xl overflow-hidden backdrop-blur-sm transition-all hover:border-slate-700">
          
          {/* Status Bar */}
          <div className="p-5 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#1A1F26] rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
                  <Sparkles size={18} className="text-[#00E599]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0D1117] animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">AlgoFinance Neural-Net</h3>
                <p className="text-[10px] text-slate-500 font-bold tracking-tight">V3.5 • ACTIVE LEARNING ENABLED</p>
              </div>
            </div>
          </div>

          {/* Messages Area with Streaming Logic */}
          <div className="flex-grow p-6 md:p-10 space-y-6 overflow-y-auto scroll-smooth bg-gradient-to-b from-[#0D1117] to-[#080808]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border shadow-lg ${
                  msg.sender === 'ai' ? 'bg-slate-900 border-slate-700' : 'bg-[#00E599] border-[#00E599]'
                }`}>
                  {msg.sender === 'ai' ? <Sparkles size={16} className="text-[#00E599]"/> : <User size={16} className="text-black" />}
                </div>
                
                <div className={`group relative p-5 rounded-2xl max-w-[85%] md:max-w-lg text-[13px] leading-relaxed transition-all shadow-md ${
                  msg.sender === 'ai' 
                  ? 'bg-slate-900/80 border border-slate-800 text-slate-300 rounded-tl-none' 
                  : 'bg-[#00E599] text-black font-semibold rounded-tr-none'
                }`}>
                  <p>{msg.text}</p>
                  {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-[#00E599] animate-pulse align-middle"></span>}
                </div>
              </div>
            ))}
            
            {/* Thinking Animation */}
            {isAiTyping && (
              <div className="flex gap-4 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <Sparkles size={16} className="text-[#00E599]"/>
                </div>
                <div className="flex items-center gap-2 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl rounded-tl-none">
                  <div className="w-1.5 h-1.5 bg-[#00E599] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#00E599] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#00E599] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Corrected Input Form */}
          <form onSubmit={handleSendMessage} className="p-6 bg-[#0D1117] border-t border-slate-800 flex items-center gap-4 relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your strategy, news sentiment, or concepts..."
              className="flex-grow bg-[#080808] border border-slate-800/80 rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00E599]/40 transition-all shadow-inner"
            />
            <button 
              type="submit"
              className="p-4 bg-[#00E599] text-black rounded-2xl hover:bg-[#00c985] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#00E599]/20"
            >
              <CornerDownLeft size={20} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AIAdvisorPage;