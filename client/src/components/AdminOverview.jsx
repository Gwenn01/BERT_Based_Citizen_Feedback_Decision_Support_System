import { useState, useEffect } from "react";
import {
  Smile,
  Frown,
  TrendingUp,
  Activity,
  BarChart2,
  Info,
  ClipboardList,
  MessageSquare,
  Download,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";

// --- 2. ICON HELPER ---
const getIcon = (name, size = 24) => {
  const icons = {
    Info: <Info size={size} />,
    ClipboardList: <ClipboardList size={size} />,
    ClipboardCheck: <ClipboardList size={size} />, // Fallback to ClipboardList
    Frown: <Frown size={size} />,
    MessageSquare: <MessageSquare size={size} />,
    BarChart: <BarChart2 size={size} />, // Mapping 'BarChart' to BarChart2
    Smile: <Smile size={size} />,
    TrendingUp: <TrendingUp size={size} />,
  };
  return icons[name] || <Activity size={size} />;
};

const KPICard = ({
  title,
  value,
  total,
  trend,
  iconName,
  variant,
  statusLabel,
  onSentimentSelect,
  isSentimentCard = false,
  activeSentiment, 
}) => {
  const colors = {
    green: "bg-green-50 text-green-600 ring-green-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    red: "bg-red-50 text-red-600 ring-red-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  const isPositive = trend.includes("+") || ["Moderate", "Stable", "Improving", "Optimal"].includes(trend);
  const trendColor = isPositive ? "bg-green-100/50 text-green-700" : "bg-red-100/50 text-red-700";

  return (
    <div className="group bg-white p-6 sm:p-7 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden relative flex flex-col justify-between min-h-60">
      
      {/* 1. Header & Icon Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ring-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colors[variant] || colors.blue}`}>
            {getIcon(iconName, 28)}
          </div>
          
          <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm border border-white/50 ${trendColor}`}>
            {trend}
          </div>
        </div>

        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
          {title}
        </p>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">
            {value}
          </span>
          {total && (
            <span className="text-sm font-bold text-slate-300 tabular-nums">{total}</span>
          )}
        </div>
      </div>

      {/* 2. Sentiment Controls Section (Premium Layout) */}
      <div className="relative z-10 mt-6">
        {isSentimentCard ? (
          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Filter Analysis</span>
                <span className="h-px flex-1 bg-slate-100 ml-3"></span>
             </div>
             
             <div className="grid grid-cols-3 gap-2">
            {["positive", "neutral", "negative"].map((type) => {
              const isActive = activeSentiment === type;
              
              // Dynamic Styles base sa State
              const typeColors = {
                positive: isActive 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100",
                neutral: isActive 
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-200" 
                  : "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100",
                negative: isActive 
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-200" 
                  : "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-100",
              };

              return (
                <button
                  key={type}
                  onClick={() => onSentimentSelect(type)}
                  className={`
                    relative py-2 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all duration-300 border
                    ${typeColors[type]}
                    ${isActive ? '-translate-y-0.5 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}
                  `}
                >
                  {type}
                </button>
              );
            })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {statusLabel || "Performance"}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
          </div>
        )}
      </div>

      {/* 3. Aesthetic Background Glow */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors duration-500 
        ${variant === 'green' ? 'bg-emerald-400' : variant === 'red' ? 'bg-rose-400' : 'bg-blue-400'} 
        group-hover:opacity-40`} 
      />
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
const AdminOverview = () => {
  const [activeFilter, setActiveFilter] = useState("1 Daily");
  const [dashboardDatabase, setDashboardDatabase] = useState({});
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashRes, feedbackRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/dashboard"),
          axios.get("http://127.0.0.1:5000/api/recent-feedback"),
        ]);

        setDashboardDatabase(dashRes.data);
        setFeedbackData(feedbackRes.data.feedback || feedbackRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to sync system data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-8 space-y-10">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center animate-pulse">
          <div className="space-y-3">
            <div className="h-8 w-64 bg-slate-200 rounded-lg" />
            <div className="h-4 w-40 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-12 w-48 bg-slate-200 rounded-2xl" />
        </div>

        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-200 rounded-4xl animate-pulse"
            />
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 h-96 bg-slate-200 rounded-[2.5rem] animate-pulse" />
          <div className="col-span-8 h-96 bg-slate-200 rounded-[2.5rem] animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-3xl border border-red-100 mb-4">
          <Activity size={40} />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
          System Offline
        </h2>
        <p className="text-slate-500 text-sm max-w-xs mb-6 font-medium">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const currentView = dashboardDatabase[activeFilter];
  if (!currentView) return null;

  const performanceData = Object.entries(currentView.averages).map(
    ([name, score]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      score: score,
      color: currentView.strong_dimensions.includes(name)
        ? "#10B981"
        : "#EF4444",
    }),
  );

  const goodCount = performanceData.filter((item) => item.score >= 3.0).length;
  const poorCount = performanceData.filter((item) => item.score < 3.0).length;

  const awarenessTrend = [
    { time: "CC1", score: currentView.charter_awareness.cc1 },
    { time: "CC2", score: currentView.charter_awareness.cc2 },
    { time: "CC3", score: currentView.charter_awareness.cc3 },
  ];

  const filteredFeedback =
    selectedSentiment === "all"
      ? feedbackData
      : feedbackData.filter(
          (item) =>
            item.sentiment?.toLowerCase() === selectedSentiment.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 overflow-x-hidden">
      {/* Main Container - Matched max-width and vertical padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
        {/* --- HEADER & FILTERS --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              System Dashboard
            </h2>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Showing analysis for:{" "}
              <span className="text-blue-600 font-bold">{activeFilter}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time Filter Pill - Styled like the buttons in FeedbackAnalysis */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              {["1 Daily", "7 Weekly", "30 Monthly"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentView.kpi.map((kpi) => (
            <KPICard
              key={kpi.id}
              {...kpi}
              iconName={kpi.icon}
              statusLabel={kpi.statusLabel}
              isSentimentCard={kpi.title.toLowerCase().includes("sentiment")}
              activeSentiment={selectedSentiment}
              onSentimentSelect={(sentiment) =>
                setSelectedSentiment((prev) =>
                 prev === sentiment ? "all" : sentiment
                )}
            />
          ))}
        </div>

        {/* --- ANALYTICS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Sentiment & Awareness (col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Sentiment Analysis Card - Modern Refined Version */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center transition-all hover:shadow-md group relative overflow-hidden">
              {/* Header Section */}
              <div className="w-full flex justify-between items-center mb-8">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    Sentiment Weight
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Public Perception
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl group-hover:rotate-12 transition-transform">
                  <Smile size={18} className="text-slate-400" />
                </div>
              </div>

              {/* Main Chart Section */}
              <div className="h-60 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentView.sentiment.map((s) => ({
                        ...s,
                        color:
                          s.name === "Positive"
                            ? "#10b981"
                            : s.name === "Neutral"
                              ? "#f59e0b"
                              : "#f43f5e",
                      }))}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {currentView.sentiment.map((entry, index) => {
                        const cellColor =
                          entry.name === "Positive"
                            ? "#10b981"
                            : entry.name === "Neutral"
                              ? "#f59e0b"
                              : "#f43f5e";
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={cellColor}
                            cornerRadius={12}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        );
                      })}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 px-3 py-2 rounded-xl shadow-xl border border-slate-800">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">
                                {payload[0].name}:{" "}
                                <span
                                  style={{ color: payload[0].payload.color }}
                                >
                                  {payload[0].value}%
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Label - Dynamic Color based on dominant sentiment */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {currentView.sentiment.find((s) => s.name === "Positive")
                      ?.value || 0}
                    %
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Positive
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend Grid - Modern Pill Style with Dynamic Colors */}
              <div className="grid grid-cols-3 gap-3 mt-8 w-full pt-6 border-t border-slate-50">
                {currentView.sentiment.map((s) => {
                  const activeColor =
                    s.name === "Positive"
                      ? "text-emerald-500"
                      : s.name === "Neutral"
                        ? "text-amber-500"
                        : "text-rose-500";
                  const dotColor =
                    s.name === "Positive"
                      ? "bg-emerald-500"
                      : s.name === "Neutral"
                        ? "bg-amber-500"
                        : "bg-rose-500";

                  return (
                    <div
                      key={s.name}
                      className="flex flex-col items-center p-2 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <span className={`text-sm font-black ${activeColor}`}>
                        {s.value}%
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1 h-1 rounded-full ${dotColor}`} />
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                          {s.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtle Background Detail */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            </div>

            {/* Awareness Trend Card - Modern White Version */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col transition-all hover:shadow-md group">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Activity size={16} className="text-blue-600" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      Growth Trend
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter pl-9">
                    Awareness Index
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-black border border-green-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Chart Section - Refined with better padding and colors */}
              <div className="h-44 w-full -ml-4">
                <ResponsiveContainer width="110%" height="100%">
                  <AreaChart
                    data={awarenessTrend}
                    margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorAwareModern"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0.01}
                        />
                      </linearGradient>
                    </defs>
                    {/* Subtle grid lines for a professional look */}
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <Tooltip
                      cursor={{ stroke: "#3B82F6", strokeWidth: 1 }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#colorAwareModern)"
                      activeDot={{
                        r: 6,
                        fill: "#3B82F6",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Mini Footer - Dynamic Update */}
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
                    Avg Score
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {currentView.charter_awareness.overall}%
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    currentView.kpi[0].trend.includes("+") ||
                    currentView.kpi[0].trend === "Stable"
                      ? "text-blue-600 bg-blue-50"
                      : "text-amber-600 bg-amber-50"
                  }`}
                >
                  {currentView.kpi[0].trend}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Service Dimensions (col-span-8) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md h-full flex flex-col">
              {/* Header & Score Badges - Showing all 8 Dimensions */}
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                      Service Quality Dimensions
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      Full Analysis of 8 Key Metrics
                    </p>
                  </div>
                  <BarChart3
                    className="text-blue-500 bg-blue-50 p-2 rounded-xl hidden md:block"
                    size={40}
                  />
                </div>

                {/* Dynamic Badges - Professional Dashboard Style */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {performanceData.map((item) => (
                    <div
                      key={item.name}
                      className="relative group p-5 bg-white border border-slate-100 rounded-4xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100 hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Background Accent Pill - Subtle decoration */}
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-slate-50 rounded-full group-hover:bg-blue-50/50 transition-colors" />

                      <div className="relative flex flex-col items-start gap-3">
                        {/* Top Label & Icon-like Dot */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${item.score >= 3 ? "bg-[#10B981]" : "bg-red-500"}`}
                          />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            {item.name}
                          </span>
                        </div>

                        {/* Score Display */}
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-3xl font-black tracking-tighter ${item.score >= 3 ? "text-slate-900" : "text-red-500"}`}
                          >
                            {item.score.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase">
                            / 5.0
                          </span>
                        </div>

                        {/* Progress Bar Mini - Visual reinforcement */}
                        <div className="w-full h-1.5 bg-slate-50 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${item.score >= 3 ? "bg-[#10B981]" : "bg-red-400"}`}
                            style={{ width: `${(item.score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Chart Section - 8 Bars */}
              <div className="grow h-64 w-full -mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
                    barGap={8}
                  >
                    <CartesianGrid
                      strokeDasharray="8 8"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 9, fontWeight: 800 }}
                      interval={0}
                      dy={5}
                    />
                    <YAxis
                      domain={[0, 5]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#cbd5e1", fontSize: 11, fontWeight: 600 }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc", radius: 10 }}
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                        padding: "12px 16px",
                      }}
                    />
                    <Bar dataKey="score" radius={[10, 10, 10, 10]} barSize={28}>
                      {performanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="transition-all duration-500 hover:opacity-80"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Footer Stats - Summary of the 8 Dimensions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <div className="group flex-1 bg-slate-900 p-5 rounded-4xl flex items-center gap-4 transition-all hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 text-green-400 rounded-2xl flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Strength Areas
                    </p>
                    <p className="text-xl font-black text-white">
                      {goodCount}{" "}
                      <span className="text-xs text-slate-500">of 8</span>
                    </p>
                  </div>
                </div>

                <div className="group flex-1 bg-white border border-slate-200 p-5 rounded-4xl flex items-center gap-4 transition-all hover:border-red-200">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Action Required
                    </p>
                    <p className="text-xl font-black text-slate-900">
                      {poorCount}{" "}
                      <span className="text-xs text-slate-400">Dimensions</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
            {/* Table Header Section */}
            <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Recent Feedback Activity
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  Live Citizen Responses
                </p>
              </div>
            </div>

            <div className="px-4 pb-4 mt-2 w-full overflow-hidden">
            <table className="w-full text-left border-separate border-spacing-y-2 table-auto">
              <thead>
                <tr className="text-slate-400">
                  <th className="w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Citizen / User
                  </th>
                  <th className="w-[25%] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Feedback Detail
                  </th>
                  <th className="w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Service Area
                  </th>
                  <th className="w-[20%] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Bert Sentiment Analysis
                  </th>
                  <th className="w-[15%] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {filteredFeedback.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition-all duration-300 hover:scale-[1.005]"
                  >
                    {/* User / Client Info */}
                    <td className="px-6 py-5 bg-slate-50/40 group-hover:bg-white rounded-l-4xl border-y border-l border-transparent group-hover:border-slate-200/60 transition-all duration-300">
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Avatar Section */}
                        <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-200/40">
                            <span className="text-white font-bold text-sm tracking-widest">
                              {item.client ? item.client.charAt(0).toUpperCase() : "G"}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white border border-slate-100 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-[8px] font-black text-slate-400">#{item.id}</span>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[15px] font-black text-slate-800 tracking-tight mb-1 group-hover:text-blue-700 transition-colors whitespace-nowrap">
                            {item.client || "General Public"}
                          </span>
                          <div className="flex flex-col leading-tight">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              Verified User
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-medium text-slate-400 uppercase">Ref:</span>
                              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">
                                {item.id}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Feedback Text Column */}
                    <td className="px-8 py-6 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                      <div className="relative flex flex-col gap-3 min-w-0">
                        <div className="relative z-10">
                          <p className="text-[14px] text-slate-600 font-semibold leading-relaxed tracking-tight group-hover:text-slate-900 transition-colors duration-300">
                            <span className="text-blue-500/40 font-serif text-lg mr-1 group-hover:text-blue-500 transition-colors">“</span>
                            {item.text}
                            <span className="text-blue-500/40 font-serif text-lg ml-1 group-hover:text-blue-500 transition-colors">”</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-0.5 w-4 bg-slate-200 group-hover:w-8 group-hover:bg-blue-400 transition-all duration-500" />
                          <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-blue-500 transition-colors">
                            Full Citizen Testimony
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-500">
                    <div className="flex flex-col gap-1.5">
                      {/* Label Header - Small detail that adds professionalism */}
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.25em] pl-1">
                        Department
                      </span>

                      <div className="flex items-center gap-3">
                        {/* Premium Indicator: Mas malinis na Pulse at Glow */}
                        <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.6)]"></span>
                        </div>

                        {/* Modern Badge Style */}
                        <div className="relative group/badge">
                          <span className="
                            inline-flex items-center px-3.5 py-1.5 
                            bg-white/80 backdrop-blur-sm 
                            border border-slate-200/80 
                            text-[11px] font-black text-slate-700 
                            rounded-xl uppercase tracking-wider
                            shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]
                            group-hover:border-indigo-300 group-hover:text-indigo-700 
                            group-hover:shadow-indigo-100/50
                            transition-all duration-300 whitespace-nowrap
                          ">
                            {item.service}
                          </span>
                          
                          {/* Subtle Bottom Glow on Hover */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>
                  </td>

                   <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-500">
                    <div className="flex items-center">
                      {/* Premium Floating Badge */}
                      <div className={`
                        relative flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all duration-500
                        ${item.sentiment?.toLowerCase() === 'positive' 
                          ? 'bg-emerald-50/30 border-emerald-200/50 text-emerald-700 shadow-[0_4px_12px_-2px_rgba(16,185,129,0.12)]' 
                          : 'bg-rose-50/30 border-rose-200/50 text-rose-700 shadow-[0_4px_12px_-2px_rgba(244,63,94,0.12)]'
                        }
                        group-hover:-translate-y-px group-hover:shadow-md
                      `}>
                        
                        {/* Precision Status Indicator */}
                        <div className="relative flex h-2 w-2">
                          <span className={`
                            absolute inline-flex h-full w-full rounded-full opacity-40 animate-pulse
                            ${item.sentiment?.toLowerCase() === 'positive' ? 'bg-emerald-400' : 'bg-rose-400'}
                          `}></span>
                          <span className={`
                            relative inline-flex rounded-full h-2 w-2 
                            ${item.sentiment?.toLowerCase() === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}
                          `}></span>
                        </div>

                        {/* Typography: Clean and High-Tracking */}
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] antialiased">
                          {item.sentiment}
                        </span>

                        {/* Subtle Inner Glow - makes it look 3D/Glassy */}
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/40 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </td>

                    {/* Time Received Column */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-r-4xl border-y border-r border-transparent group-hover:border-slate-200/60 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors duration-500" />
                          <div className="h-8 w-px bg-slate-200 group-hover:bg-blue-100 transition-colors duration-500" />
                        </div>

                        <div className="flex flex-col justify-center min-w-0">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m4-2a8 8 0 11-16 0 8 8 0 0116 0z" />
                            </svg>
                            <span className="text-[13px] font-black text-slate-700 tracking-tight tabular-nums group-hover:text-slate-900 transition-colors truncate">
                              {item.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] text-slate-400 uppercase font-black tracking-[0.15em]">Received</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[8px] font-bold text-slate-500 uppercase group-hover:bg-blue-50 group-hover:text-blue-600">Live</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFeedback.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-24 px-6">
                      <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                        
                        {/* Decorative Icon Container */}
                        <div className="relative mb-6">
                          {/* Subtle Outer Glow */}
                          <div className="absolute inset-0 bg-slate-200/50 rounded-full blur-3xl scale-150" />
                          
                          <div className="relative h-20 w-20 bg-white border border-slate-100 rounded-4xl shadow-xl flex items-center justify-center overflow-hidden">
                            {/* Animated Background Pulse */}
                            <div className="absolute inset-0 bg-linear-to-tr from-slate-50 to-white" />
                            
                            <MessageSquare 
                              size={32} 
                              className={`relative z-10 transition-colors duration-500 ${
                                selectedSentiment === 'positive' ? 'text-emerald-400' : 
                                selectedSentiment === 'negative' ? 'text-rose-400' : 
                                selectedSentiment === 'neutral' ? 'text-amber-400' : 'text-slate-300'
                              }`} 
                            />
                            
                            {/* Small floating dots for "searching" effect */}
                            <div className="absolute top-3 right-3 h-1.5 w-1.5 bg-blue-400 rounded-full animate-ping" />
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center space-y-2 relative z-10">
                          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">
                            No {selectedSentiment !== 'all' ? selectedSentiment : ''} records found
                          </h3>
                          <p className="text-sm text-slate-400 font-medium max-w-70 leading-relaxed">
                            We couldn't find any feedback matching the current filters. Try selecting a different category or time range.
                          </p>
                        </div>

                        {/* Reset Action Button */}
                        <button
                          onClick={() => setSelectedSentiment("all")}
                          className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-100 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Clear All Filters
                        </button>

                        {/* Aesthetic Detail: Bottom Line */}
                        <div className="w-16 h-1 bg-slate-100 rounded-full mt-10" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
