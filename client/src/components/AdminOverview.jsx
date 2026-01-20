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
}) => {
  const colors = {
    green: "bg-green-50 text-green-600 ring-green-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    red: "bg-red-50 text-red-600 ring-red-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  // Logic para sa Trend Badge color
  const isPositive =
    trend.includes("+") ||
    ["Moderate", "Stable", "Improving", "Optimal"].includes(trend);
  const trendColor = isPositive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="group bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ring-1 transition-transform duration-500 group-hover:rotate-6 ${colors[variant] || colors.blue}`}
          >
            {getIcon(iconName)}
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {value}
            </span>
            {total && (
              <span className="text-sm font-bold text-slate-400">{total}</span>
            )}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex items-center gap-3">
          <div
            className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-black px-2 sm:px-3 py-1 rounded-xl shadow-inner ${trendColor}`}
          >
            {trend}
          </div>
          {/* DITO ANG PAGBABAGO: Dynamic rendering ng statusLabel */}
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {statusLabel || "Status Level"}
          </span>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-32 sm:h-32 bg-slate-50/50 rounded-full blur-2xl group-hover:bg-slate-100 transition-colors duration-500" />
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
const AdminOverview = () => {
  const [activeFilter, setActiveFilter] = useState("1 Daily");
  const [dashboardDatabase, setDashboardDatabase] = useState({});
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashRes, feedbackRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/dashboard"),
          axios.get("http://127.0.0.1:5000/api/recent-feedback")
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
          <div key={i} className="h-32 bg-slate-200 rounded-4xl animate-pulse" />
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
        <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">System Offline</h2>
        <p className="text-slate-500 text-sm max-w-xs mb-6 font-medium">{error}</p>
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
                      data={currentView.sentiment.map(s => ({
                        ...s,
                        color: s.name === "Positive" ? "#10b981" :
                              s.name === "Neutral" ? "#f59e0b" :  
                              "#f43f5e"                         
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
                        const cellColor = entry.name === "Positive" ? "#10b981" : 
                                        entry.name === "Neutral" ? "#f59e0b" : 
                                        "#f43f5e";
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
                                <span style={{ color: payload[0].payload.color }}>
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
                    {currentView.sentiment.find((s) => s.name === "Positive")?.value || 0}%
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
                  const activeColor = s.name === "Positive" ? "text-emerald-500" : 
                                      s.name === "Neutral" ? "text-amber-500" : 
                                      "text-rose-500";
                  const dotColor = s.name === "Positive" ? "bg-emerald-500" : 
                                  s.name === "Neutral" ? "bg-amber-500" : 
                                  "bg-rose-500";
                  
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
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Feedback Activity</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                Live Citizen Responses
              </p>
            </div>
          </div>

          <div className="overflow-x-auto px-4 pb-4 mt-2">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-slate-400">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Citizen / User</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Feedback Detail</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Service Area</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {feedbackData.map((item) => (
                  <tr key={item.id} className="group transition-all duration-300 hover:scale-[1.005]">
                    {/* User / Client Info */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-l-3xl border-y border-l border-transparent group-hover:border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-white border border-slate-100 text-blue-600 flex items-center justify-center font-black text-[10px] shadow-sm">
                          #{item.id}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-700">{item.client || "Anonymous"}</span>
                          <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">ID: {item.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Feedback Text */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 max-w-sm">
                      <p className="text-sm text-slate-600 font-medium leading-relaxed italic line-clamp-2">
                        "{item.text}"
                      </p>
                    </td>

                    {/* Service Type */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100">
                      <span className="px-3 py-1.5 bg-white border border-slate-200 text-[10px] font-black text-slate-500 rounded-xl uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {item.service}
                      </span>
                    </td>

                    {/* Time Received */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500">{item.time}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Received</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-r-3xl border-y border-r border-transparent group-hover:border-slate-100 text-right">
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
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
