import React, { useState, useEffect, useMemo } from 'react';
import {
  Target,
  TrendingUp,
  TrendingDown,
  Cpu,
  Activity,
  Hexagon,
  Zap,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Base tickers – prices will be updated dynamically
const TICKER_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'AMZN', 'GOOG', 'META', 'JPM'];
const COMPANY_NAMES = {
  AAPL: 'Apple Inc.',
  TSLA: 'Tesla Inc.',
  MSFT: 'Microsoft Corp.',
  NVDA: 'NVIDIA Corp.',
  AMZN: 'Amazon.com Inc.',
  GOOG: 'Alphabet (Google)',
  META: 'Meta Platforms',
  JPM: 'JPMorgan Chase',
};

// Generate random walk for price series
const randomWalk = (start, steps, volatility = 1.5) => {
  const out = [];
  let v = start;
  for (let i = 0; i <= steps; i++) {
    out.push(v);
    v = v + (Math.random() - 0.48) * volatility;
    v = Math.max(v, start * 0.85);
  }
  return out;
};

// Build chart data from price arrays
const buildChartData = (pastPrices, predPrices, currentPrice) => {
  const past = pastPrices.map((p, i) => ({
    time: i === pastPrices.length - 1 ? 'Current' : `Day -${pastPrices.length - 1 - i}`,
    price: Math.round(p * 100) / 100,
  }));
  const pred = predPrices.map((p, i) => ({
    time: i === 0 ? 'Current' : `Day +${i} (Pred)`,
    price: Math.round(p * 100) / 100,
  }));
  if (pred[0]?.time === 'Current') pred[0].price = currentPrice;
  return { pastPriceData: past, aiPredictionData: pred };
};

// AI model donut – Buy / Hold / Sell distribution
const getModelDonutData = (buyProb, sellProb) => {
  const hold = 100 - buyProb - sellProb;
  return [
    { name: 'Buy', value: buyProb, color: '#00E599' },
    { name: 'Hold', value: Math.max(0, hold), color: '#3B82F6' },
    { name: 'Sell', value: sellProb, color: '#F43F5E' },
  ];
};

const PlaygroundPage = () => {
  const [selectedStockTicker, setSelectedStockTicker] = useState('AAPL');
  const [userPrediction, setUserPrediction] = useState(null);
  const [confidenceLevel, setConfidenceLevel] = useState(70);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic ticker data (prices and % change)
  const [tickers, setTickers] = useState(() =>
    TICKER_SYMBOLS.map((t) => {
      const base = 80 + Math.random() * 400;
      return {
        ticker: t,
        price: base,
        change: 0,
        isPositive: true,
      };
    })
  );

  // AI model metrics (TensorFlow-style)
  const [modelMetrics, setModelMetrics] = useState({
    accuracy: 87,
    confidence: 91,
    buyProb: 58,
    sellProb: 22,
    signal: 'BUY',
    epochs: 32,
    status: 'Active',
  });

  // Store previous prices for rate analysis (price history for selected ticker)
  const [priceHistory, setPriceHistory] = useState(() => ({}));

  // Update ticker prices and % change periodically – dynamic rate
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((s) => {
          const prevPrice = s.price;
          const delta = (Math.random() - 0.48) * 3.2;
          const newPrice = Math.max(50, prevPrice + delta);
          const changePct = ((newPrice - prevPrice) / prevPrice) * 100;
          return {
            ...s,
            price: newPrice,
            change: changePct,
            isPositive: changePct >= 0,
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Keep short price history per ticker for rate analyze
  useEffect(() => {
    const t = tickers.find((x) => x.ticker === selectedStockTicker);
    if (!t) return;
    const key = t.ticker;
    setPriceHistory((h) => {
      const list = (h[key] || []).slice(-29);
      list.push({ price: t.price, ts: Date.now() });
      return { ...h, [key]: list };
    });
  }, [tickers, selectedStockTicker]);

  // Simulate model metrics moving slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setModelMetrics((m) => ({
        ...m,
        accuracy: Math.min(95, Math.max(82, m.accuracy + (Math.random() > 0.5 ? 1 : -1))),
        confidence: Math.min(96, Math.max(85, m.confidence + (Math.random() > 0.5 ? 1 : -1))),
        buyProb: Math.min(75, Math.max(40, m.buyProb + (Math.random() > 0.5 ? 2 : -2))),
        sellProb: Math.min(35, Math.max(15, m.sellProb + (Math.random() > 0.5 ? 1 : -1))),
        signal: m.buyProb >= m.sellProb ? 'BUY' : 'SELL',
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentTicker = useMemo(
    () => tickers.find((t) => t.ticker === selectedStockTicker) || tickers[0],
    [tickers, selectedStockTicker]
  );

  const priceFormatted = `$${currentTicker.price.toFixed(2)}`;
  const changeFormatted = `${currentTicker.change >= 0 ? '+' : ''}${currentTicker.change.toFixed(2)}%`;

  // Dynamic chart data for selected stock
  const chartData = useMemo(() => {
    const base = currentTicker.price;
    const pastPrices = randomWalk(base * 0.92, 14, base * 0.008);
    pastPrices[pastPrices.length - 1] = base;
    const predPrices = randomWalk(base, 7, base * 0.012).map((p) => Math.max(p, base * 0.97));
    return buildChartData(pastPrices, predPrices, base);
  }, [currentTicker.price, selectedStockTicker]);

  const modelDonutData = useMemo(
    () => getModelDonutData(modelMetrics.buyProb, modelMetrics.sellProb),
    [modelMetrics.buyProb, modelMetrics.sellProb]
  );

  // Dynamic rate analyze from price history
  const rateAnalyze = useMemo(() => {
    const list = priceHistory[selectedStockTicker] || [];
    if (list.length < 2) {
      return {
        ratePerMin: currentTicker.change,
        trend: currentTicker.isPositive ? 'Up' : 'Down',
        volatility: '—',
        sessionHigh: currentTicker.price,
        sessionLow: currentTicker.price,
        ticks: list.length,
      };
    }
    const prices = list.map((p) => p.price);
    const latest = prices[prices.length - 1];
    const older = prices[Math.max(0, prices.length - 6)];
    const ratePerMin = older ? ((latest - older) / older) * 100 : currentTicker.change;
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((s, p) => s + (p - avg) ** 2, 0) / prices.length;
    const vol = Math.sqrt(variance) / (avg || 1) * 100;
    let volatility = 'Low';
    if (vol > 0.4) volatility = 'High';
    else if (vol > 0.15) volatility = 'Medium';
    const sessionHigh = Math.max(...prices);
    const sessionLow = Math.min(...prices);
    let trend = 'Sideways';
    if (list.length >= 5) {
      const recent = prices.slice(-5);
      const first = recent[0];
      const last = recent[recent.length - 1];
      if ((last - first) / (first || 1) > 0.002) trend = 'Up';
      else if ((last - first) / (first || 1) < -0.002) trend = 'Down';
    } else if (ratePerMin > 0) trend = 'Up';
    else if (ratePerMin < 0) trend = 'Down';
    return {
      ratePerMin,
      trend,
      volatility,
      sessionHigh,
      sessionLow,
      ticks: list.length,
    };
  }, [priceHistory, selectedStockTicker, currentTicker.price, currentTicker.change, currentTicker.isPositive]);

  const handleSubmitPrediction = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#00E599]/30">
      
      {/* ================= AI BUY/SELL PREDICTION MODEL SECTION ================= */}
      <section className="bg-[#0B0F13] border-b border-slate-800/60 py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30">
              <Cpu size={22} className="text-[#00E599]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                AI Buy / Sell Prediction Model
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5">
                TensorFlow-style inference engine • Real-time signals
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <Activity size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">{modelMetrics.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donut – Buy / Hold / Sell */}
            <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                Model output distribution
              </p>
              <div className="w-full h-52 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelDonutData}
                      innerRadius={48}
                      outerRadius={68}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {modelDonutData.map((entry, index) => (
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
                      formatter={(value) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <span
                    className={`text-lg font-black tracking-tighter ${
                      modelMetrics.signal === 'BUY' ? 'text-[#00E599]' : 'text-rose-400'
                    }`}
                  >
                    {modelMetrics.signal}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    Signal
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-2 flex-wrap justify-center">
                {modelDonutData.map((d) => (
                  <span
                    key={d.name}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name} {d.value}%
                  </span>
                ))}
              </div>
            </div>

            {/* TensorFlow-style metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Accuracy
                </p>
                <p className="text-2xl font-black text-[#00E599] tracking-tight">
                  {modelMetrics.accuracy}%
                </p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Confidence
                </p>
                <p className="text-2xl font-black text-violet-400 tracking-tight">
                  {modelMetrics.confidence}%
                </p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Epochs
                </p>
                <p className="text-2xl font-black text-amber-400 tracking-tight">
                  {modelMetrics.epochs}
                </p>
              </div>
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Signal
                </p>
                <p
                  className={`text-xl font-black tracking-tight ${
                    modelMetrics.signal === 'BUY' ? 'text-[#00E599]' : 'text-rose-400'
                  }`}
                >
                  {modelMetrics.signal}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-4 bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Inference engine</span>
                <span className="text-xs font-mono text-[#00E599]">live predictions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HEADER ================= */}
      <section className="bg-slate-950 border-b border-slate-800/60 py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#00E599] uppercase mb-4">
              <Target size={18} />
              <span>Stock Prediction Playground</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Beat the AI.<br /> <span className="text-[#00E599]">Earn points.</span>
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl text-lg leading-relaxed">
              Make predictions, compare with our ML model, see real outcomes. Earn points for accuracy.
            </p>
          </div>
          <div className="w-full md:w-72 rounded-2xl bg-[#0D1117] border border-slate-800 p-6 flex flex-col items-center justify-center text-center">
            <BarChart3 size={40} className="text-[#00E599]/80 mb-3" />
            <span className="font-bold text-white">Dynamic data</span>
            <p className="text-xs text-slate-500 mt-1">Prices & charts update in real time. AI model drives buy/sell signals.</p>
          </div>
        </div>
      </section>

      {/* ================= STOCK TICKERS BAR (dynamic) ================= */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto py-8 border-b border-slate-800/60">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {tickers.map((stock) => (
            <button
              key={stock.ticker}
              onClick={() => setSelectedStockTicker(stock.ticker)}
              className={`bg-[#0D1117] border p-4 rounded-xl min-w-[100px] flex flex-col items-center justify-center transition-all duration-300 ${
                selectedStockTicker === stock.ticker
                  ? 'border-[#00E599]/50 shadow-[0_0_20px_rgba(0,229,153,0.15)]'
                  : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <p className="text-xs text-slate-500 font-bold tracking-wider mb-1 uppercase">
                {stock.ticker}
              </p>
              <p className="text-lg font-bold text-white mb-1">
                ${stock.price.toFixed(2)}
              </p>
              <p
                className={`text-xs font-bold ${
                  stock.isPositive ? 'text-[#00E599]' : 'text-rose-500'
                }`}
              >
                {stock.isPositive ? '▲' : '▼'} {stock.change >= 0 ? '+' : ''}
                {stock.change.toFixed(2)}%
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ================= MAIN: GRAPH + PREDICTION WIDGET ================= */}
      <section className="py-16 px-6 md:px-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0D1117] border border-slate-800/60 p-8 rounded-2xl flex flex-col">
          <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-6 gap-4">
            <div>
              <p className="text-[#00E599] text-xs font-bold tracking-widest uppercase mb-1">
                Selected stock
              </p>
              <h2 className="text-2xl font-black text-white leading-tight tracking-tighter mb-2">
                {COMPANY_NAMES[selectedStockTicker] || selectedStockTicker}
              </h2>
              <span className="bg-[#1A1F26] text-slate-300 text-xs font-bold px-2.5 py-1 rounded border border-slate-700/60">
                AI Advisor Model
              </span>
            </div>
            <div className="text-right flex flex-col items-end flex-shrink-0">
              <p className="text-slate-400 text-sm font-medium mb-1">Current price</p>
              <p className="text-3xl font-black text-white leading-none tracking-tighter mb-1">
                {priceFormatted}
              </p>
              <p
                className={`text-sm font-bold ${
                  currentTicker.isPositive ? 'text-[#00E599]' : 'text-rose-500'
                }`}
              >
                {currentTicker.isPositive ? '▲' : '▼'} {changeFormatted}
              </p>
            </div>
          </div>

          {/* Dynamic rate analyze */}
          <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
              Dynamic rate analyze
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Live price</p>
                <p className="text-lg font-black text-white tabular-nums">${currentTicker.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Rate (recent)</p>
                <p className={`text-lg font-black tabular-nums ${rateAnalyze.ratePerMin >= 0 ? 'text-[#00E599]' : 'text-rose-500'}`}>
                  {rateAnalyze.ratePerMin >= 0 ? '+' : ''}{rateAnalyze.ratePerMin.toFixed(3)}%
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Trend</p>
                <p className={`text-lg font-bold ${
                  rateAnalyze.trend === 'Up' ? 'text-[#00E599]' : rateAnalyze.trend === 'Down' ? 'text-rose-500' : 'text-slate-400'
                }`}>
                  {rateAnalyze.trend}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Volatility</p>
                <p className={`text-lg font-bold ${
                  rateAnalyze.volatility === 'High' ? 'text-amber-400' : rateAnalyze.volatility === 'Medium' ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {rateAnalyze.volatility}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-4 flex gap-6 text-xs">
                <span className="text-slate-500">Session high <span className="text-white font-bold">${rateAnalyze.sessionHigh.toFixed(2)}</span></span>
                <span className="text-slate-500">Session low <span className="text-white font-bold">${rateAnalyze.sessionLow.toFixed(2)}</span></span>
                <span className="text-slate-500">Ticks <span className="text-white font-bold">{rateAnalyze.ticks}</span></span>
              </div>
            </div>
          </div>

          <div className="flex-grow h-72 w-full bg-slate-950/80 border border-slate-700/60 rounded-xl p-4 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#1A1F26" />
                <XAxis dataKey="time" stroke="#52525B" tick={{ fontSize: 10 }} />
                <YAxis stroke="#52525B" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    background: '#1A1F26',
                    border: '1px solid #52525B',
                    borderRadius: '8px',
                    color: '#E4E4E7',
                    fontSize: '12px',
                  }}
                  cursor={{ stroke: '#00E599', strokeWidth: 1 }}
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                />
                <Line
                  data={chartData.pastPriceData}
                  type="monotone"
                  dataKey="price"
                  stroke="#00E599"
                  strokeWidth={2}
                  dot={false}
                  name="Past"
                />
                <Line
                  data={chartData.aiPredictionData}
                  type="monotone"
                  dataKey="price"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="AI Pred"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prediction widget – new style */}
        <div className="bg-[#0D1117] border border-slate-800/60 p-8 rounded-2xl flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase mb-3">
              <Zap size={18} className="text-amber-400" />
              <span>Your prediction</span>
            </div>
            <p className="text-lg font-bold text-white mb-2 leading-tight">
              Will <span className="text-[#00E599]">{selectedStockTicker}</span> go{' '}
              <span className="text-[#00E599]">UP</span> or <span className="text-rose-400">DOWN</span>{' '}
              in the next 7 days?
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Compare with the AI model signal above. Earn points for correct predictions.
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setUserPrediction('UP')}
              className={`flex-1 flex justify-center items-center gap-2 py-4 rounded-xl font-bold transition-all border-2 ${
                userPrediction === 'UP'
                  ? 'bg-[#00E599]/10 text-[#00E599] border-[#00E599]'
                  : 'bg-[#1A1F26] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              <TrendingUp size={20} /> BULL
            </button>
            <button
              onClick={() => setUserPrediction('DOWN')}
              className={`flex-1 flex justify-center items-center gap-2 py-4 rounded-xl font-bold transition-all border-2 ${
                userPrediction === 'DOWN'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500'
                  : 'bg-[#1A1F26] border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              <TrendingDown size={20} /> BEAR
            </button>
          </div>

          <div className="mb-8">
            <p className="text-slate-400 text-sm font-medium mb-3">
              Confidence: <span className="text-white font-bold">{confidenceLevel}%</span>
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#00E599]"
            />
          </div>

          <button
            onClick={handleSubmitPrediction}
            disabled={!userPrediction}
            className="flex items-center justify-center gap-2 w-full bg-[#00E599] text-[#080808] text-sm font-black px-6 py-4 rounded-xl hover:bg-[#00c985] hover:shadow-[0_0_30px_rgba(0,229,153,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <Hexagon size={18} />
            {submitted ? 'Prediction recorded (+100 pts)' : 'Submit prediction (+100 pts)'}
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-800/60 pt-12 pb-8 px-6 bg-[#080808] mt-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-slate-600">
          <p>© 2024 Algo Finance Playground. All rights reserved.</p>
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

export default PlaygroundPage;
