import { useState } from "react";
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
  MoreHorizontal
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

// --- 1. DYNAMIC MOCK DATABASE ---
const dashboardDatabase = {
  "1 Daily": {
    kpi: [
      { 
        id: 1, 
        title: "CC Awareness", 
        value: "67.64%", 
        total: "Overall", 
        trend: "Moderate", 
        variant: "blue", 
        icon: "Info",
        statusLabel: "Reach Level"
      },
      { 
        id: 2, 
        title: "Survey Avg", 
        value: "2.82", 
        total: "/ 5.0", 
        trend: "Weak", 
        variant: "red", 
        icon: "ClipboardList",
        statusLabel: "Service Quality"
      },
      { 
        id: 3, 
        title: "Positive Sentiment", 
        value: "17.39%", 
        trend: "Critical", 
        variant: "red",     
        icon: "Frown",      
        statusLabel: "Approval Rating" 
      },
      { 
        id: 4, 
        title: "Total Feedback", 
        value: "23", 
        trend: "Today", 
        variant: "purple", 
        icon: "MessageSquare",
        statusLabel: "Submission Vol"
      },
    ],
    sentiment: [
      { name: "Positive", value: 17.39, color: "#10B981" },
      { name: "Neutral", value: 13.04, color: "#F59E0B" },
      { name: "Negative", value: 69.57, color: "#EF4444" },
    ],

    averages: {
      responsiveness: 2.83,
      reliability: 2.8,
      facilities: 2.6,
      communication: 2.75,
      outcome: 2.83,
      costs: 3.1,
      integrity: 2.9,
      assurance: 2.77
    },
    weak_dimensions: ['responsiveness', 'reliability', 'facilities', 'communication', 'integrity', 'assurance', 'outcome'],
    strong_dimensions: ['costs'],
    charter_awareness: {
      overall: 67.64,
      status: "Moderate Awareness",
      cc1: 66.67,
      cc2: 69.57,
      cc3: 66.67,
    },
    feedback: [
      {
        id: 1,
        user: "Citizen #4021",
        service: "General Services",
        text: "The wait time was too long and the office was too hot. Facilities need improvement.",
        sentiment: "Negative",
        time: "10:15 AM",
        impact: "Low Responsiveness"
      },
      {
        id: 2,
        user: "Citizen #4025",
        service: "Treasury",
        text: "Processing was clear, but the staff seemed tired. Communication could be better.",
        sentiment: "Neutral",
        time: "11:30 AM",
        impact: "Communication"
      },
      {
        id: 3,
        user: "Citizen #4030",
        service: "Health Office",
        text: "Very helpful doctors, though the laboratory equipment looks old.",
        sentiment: "Positive",
        time: "1:45 PM",
        impact: "Facilities"
      },
      {
        id: 4,
        user: "Citizen #4032",
        service: "Engineering",
        text: "The fees were exactly as listed in the charter. Fair pricing.",
        sentiment: "Positive",
        time: "3:00 PM",
        impact: "Costs"
      }
    ]
  },
  "7 Weekly": {
    kpi: [
      { 
        id: 1, 
        title: "CC Awareness", 
        value: "71.20%", 
        total: "Overall", 
        trend: "+3.56%", 
        variant: "blue", 
        icon: "Info",
        statusLabel: "Growth Rate"
      },
      { 
        id: 2, 
        title: "Survey Avg", 
        value: "3.12", 
        total: "/ 5.0", 
        trend: "Stable", 
        variant: "green", 
        icon: "ClipboardList",
        statusLabel: "Service Rating"
      },
      { 
        id: 3, 
        title: "Positive Sentiment", 
        value: "32.40%", 
        trend: "Improving", 
        variant: "amber", 
        icon: "Frown",    
        statusLabel: "Approval Rate" 
      },
      { 
        id: 4, 
        title: "Total Feedback", 
        value: "158", 
        trend: "Weekly", 
        variant: "purple", 
        icon: "MessageSquare",
        statusLabel: "Entry Count"
      },
    ],
    sentiment: [
      { name: "Positive", value: 32.40, color: "#10B981" },
      { name: "Neutral", value: 22.50, color: "#F59E0B" },
      { name: "Negative", value: 45.10, color: "#EF4444" },
    ],
    averages: {
      responsiveness: 3.05,
      reliability: 3.10,
      facilities: 2.75,
      communication: 3.20,
      outcome: 3.15,
      costs: 3.40,
      integrity: 3.30,
      assurance: 3.01
    },
    weak_dimensions: ['facilities'],
    strong_dimensions: ['responsiveness', 'reliability', 'communication', 'outcome', 'costs', 'integrity', 'assurance'],
    charter_awareness: {
      overall: 71.20,
      status: "High Awareness",
      cc1: 70.50,
      cc2: 73.20,
      cc3: 69.90,
    },
    feedback: [
      {
        id: 10,
        user: "Citizen #3882",
        service: "Building Permit",
        text: "Process is faster than last month. Good job to the team!",
        sentiment: "Positive",
        time: "2 days ago",
        impact: "Responsiveness"
      },
      {
        id: 11,
        user: "Citizen #3895",
        service: "Health Office",
        text: "The new chairs are nice, but the ventilation is still an issue.",
        sentiment: "Neutral",
        time: "4 days ago",
        impact: "Facilities"
      },
      {
        id: 12,
        user: "Citizen #3901",
        service: "Assessor",
        text: "Very professional staff and clear instructions.",
        sentiment: "Positive",
        time: "5 days ago",
        impact: "Integrity"
      }
    ]
  },
  "30 Monthly": {
    kpi: [
      { 
        id: 1, 
        title: "CC Awareness", 
        value: "75.80%", 
        total: "Overall", 
        trend: "+8.16%", 
        variant: "blue", 
        icon: "Info",
        statusLabel: "Monthly Reach"
      },
      { 
        id: 2, 
        title: "Survey Avg", 
        value: "3.45", 
        total: "/ 5.0", 
        trend: "Improving", 
        variant: "green", 
        icon: "ClipboardCheck",
        statusLabel: "Quality Index" 
      },
      { 
        id: 3, 
        title: "Positive Sentiment", 
        value: "48.50%",
        trend: "Optimal", 
        variant: "amber",  
        icon: "Smile",    
        statusLabel: "Public Trust" 
      },
      { 
        id: 4, 
        title: "Total Feedback", 
        value: "1,240", 
        trend: "Monthly", 
        variant: "purple", 
        icon: "MessageSquare",
        statusLabel: "Total Volume"
      },
    ],
    sentiment: [
      { name: "Positive", value: 48.50, color: "#10B981" },
      { name: "Neutral", value: 20.25, color: "#F59E0B" },
      { name: "Negative", value: 31.25, color: "#EF4444" },
    ],
    averages: {
      responsiveness: 3.50,
      reliability: 3.40,
      facilities: 2.95, 
      communication: 3.60,
      outcome: 3.55,
      costs: 3.80,
      integrity: 3.70,
      assurance: 3.50
    },
    weak_dimensions: ['facilities'], 
    strong_dimensions: [
      'responsiveness', 
      'reliability', 
      'communication', 
      'outcome', 
      'costs', 
      'integrity', 
      'assurance'
    ],
    charter_awareness: {
      overall: 75.80,
      status: "High Awareness",
      cc1: 74.50,
      cc2: 78.20,
      cc3: 74.70,
    },
    feedback: [
      {
        id: 101,
        user: "Citizen #1024",
        service: "BPLO",
        text: "The online registration implemented this month saved me so much time. Great improvement!",
        sentiment: "Positive",
        time: "2 weeks ago",
        impact: "Responsiveness"
      },
      {
        id: 102,
        user: "Citizen #1105",
        service: "General Services",
        text: "Still hoping for better air-conditioning in the waiting area, but the queueing system is better.",
        sentiment: "Neutral",
        time: "3 weeks ago",
        impact: "Facilities"
      },
      {
        id: 103,
        user: "Citizen #0988",
        service: "Treasury",
        text: "Transparency in fees is commendable. Very consistent with the Citizen's Charter.",
        sentiment: "Positive",
        time: "1 month ago",
        impact: "Costs"
      }
    ]
  },
};

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

const KPICard = ({ title, value, total, trend, iconName, variant, statusLabel }) => {
  const colors = {
    green: "bg-green-50 text-green-600 ring-green-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    red: "bg-red-50 text-red-600 ring-red-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  // Logic para sa Trend Badge color
  const isPositive = trend.includes("+") || ["Moderate", "Stable", "Improving", "Optimal"].includes(trend);
  const trendColor = isPositive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="group bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ring-1 transition-transform duration-500 group-hover:rotate-6 ${colors[variant] || colors.blue}`}>
            {getIcon(iconName)}
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{value}</span>
            {total && (
              <span className="text-sm font-bold text-slate-400">{total}</span>
            )}
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 flex items-center gap-3">
          <div className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-black px-2 sm:px-3 py-1 rounded-xl shadow-inner ${trendColor}`}>
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
    const currentView = dashboardDatabase[activeFilter];

    const performanceData = Object.entries(currentView.averages).map(([name, score]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      score: score,
      color: currentView.strong_dimensions.includes(name) ? "#10B981" : "#EF4444"
    }));

    const goodCount = performanceData.filter(item => item.score >= 3.0).length;
    const poorCount = performanceData.filter(item => item.score < 3.0).length;

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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Dashboard</h2>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Showing analysis for: <span className="text-blue-600 font-bold">{activeFilter}</span>
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
            <KPICard key={kpi.id} {...kpi} iconName={kpi.icon} statusLabel={kpi.statusLabel} />
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
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Sentiment Weight</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Public Perception</p>
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
                      data={currentView.sentiment}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {currentView.sentiment.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          cornerRadius={12}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-slate-900 px-3 py-2 rounded-xl shadow-xl border border-slate-800">
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">
                                {payload[0].name}: <span className="text-blue-400">{payload[0].value}%</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Label - Enhanced Typography */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
                    {currentView.sentiment.find(s => s.name === "Positive")?.value || 0}%
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Positive</span>
                  </div>
                </div>
              </div>
              
              {/* Legend Grid - Modern Pill Style */}
              <div className="grid grid-cols-3 gap-3 mt-8 w-full pt-6 border-t border-slate-50">
                {currentView.sentiment.map((s) => (
                  <div key={s.name} className="flex flex-col items-center p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-black text-slate-900">{s.value}%</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{s.name}</span>
                    </div>
                  </div>
                ))}
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
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Growth Trend</h3>
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
                  <AreaChart data={awarenessTrend} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAwareModern" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    {/* Subtle grid lines for a professional look */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <Tooltip 
                      cursor={{ stroke: '#3B82F6', strokeWidth: 1 }}
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3B82F6" 
                      strokeWidth={3} 
                      fill="url(#colorAwareModern)" 
                      activeDot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Mini Footer - Dynamic Update */}
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Avg Score</span>
                  {/* Ginagamit ang overall awareness score mula sa database */}
                  <span className="text-sm font-black text-slate-900">
                    {currentView.charter_awareness.overall}%
                  </span>
                </div>
                
                {/* Kinukuha ang trend value (+3.56%, Moderate, etc.) mula sa KPI array */}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  currentView.kpi[0].trend.includes('+') || currentView.kpi[0].trend === "Stable"
                    ? "text-blue-600 bg-blue-50" 
                    : "text-amber-600 bg-amber-50"
                }`}>
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
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Service Quality Dimensions</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      Full Analysis of 8 Key Metrics
                    </p>
                  </div>
                  <BarChart3 className="text-blue-500 bg-blue-50 p-2 rounded-xl hidden md:block" size={40} />
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
                          <div className={`w-1.5 h-1.5 rounded-full ${item.score >= 3 ? 'bg-[#10B981]' : 'bg-red-500'}`} />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            {item.name}
                          </span>
                        </div>

                        {/* Score Display */}
                        <div className="flex items-baseline gap-1">
                          <span className={`text-3xl font-black tracking-tighter ${item.score >= 3 ? 'text-slate-900' : 'text-red-500'}`}>
                            {item.score.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase">/ 5.0</span>
                        </div>

                        {/* Progress Bar Mini - Visual reinforcement */}
                        <div className="w-full h-1.5 bg-slate-50 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${item.score >= 3 ? 'bg-[#10B981]' : 'bg-red-400'}`}
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
                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 9, fontWeight: 800 }}
                      interval={0}
                      dy={5}
                    />
                    <YAxis 
                      domain={[0, 5]} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc', radius: 10 }}
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: 'none', 
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                        padding: '12px 16px' 
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
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strength Areas</p>
                    <p className="text-xl font-black text-white">{goodCount} <span className="text-xs text-slate-500">of 8</span></p>
                  </div>
                </div>

                <div className="group flex-1 bg-white border border-slate-200 p-5 rounded-4xl flex items-center gap-4 transition-all hover:border-red-200">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Required</p>
                    <p className="text-xl font-black text-slate-900">{poorCount} <span className="text-xs text-slate-400">Dimensions</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- FULL WIDTH: FEEDBACK TABLE --- */}
          <div className="lg:col-span-12 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Feedback Activity</h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full uppercase tracking-tight">
                Live Feed
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">User / Citizen</th>
                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Comment Excerpt</th>
                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sentiment</th>
                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-10 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentView.feedback.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px] border border-blue-100 shadow-sm">
                            {item.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{item.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 max-w-md">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic truncate">
                          "{item.text}"
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${
                          item.sentiment === 'Positive' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {item.sentiment}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-xs font-bold text-slate-400 uppercase tracking-tight">
                        {item.time}
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-10 py-4 bg-slate-50/30 border-t border-slate-100 text-center">
              <button className="text-[10px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-[0.2em] transition-colors">
                View Detailed Analytics →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
