import React, { useState } from "react";
import {
  Users,
  Smile,
  Frown,
  TrendingUp,
  Activity,
  BarChart2,
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
} from "recharts";

// --- 1. DYNAMIC MOCK DATABASE ---
const dashboardDatabase = {
  "1 Daily": {
    kpi: [
      {
        id: 1,
        title: "Avg Satisfaction",
        value: "4.8",
        total: "/ 5.0",
        trend: "+0.5",
        variant: "green",
        icon: "Smile",
      },
      {
        id: 2,
        title: "Total Feedback",
        value: "18",
        trend: "+4%",
        variant: "blue",
        icon: "Users",
      },
      {
        id: 3,
        title: "Sentiment Score",
        value: "94%",
        trend: "+8%",
        variant: "purple",
        icon: "TrendingUp",
      },
      {
        id: 4,
        title: "Unresolved Issues",
        value: "1",
        trend: "-2",
        variant: "red",
        icon: "Frown",
      },
    ],
    sentiment: [
      { name: "Positive", value: 15, color: "#10B981" },
      { name: "Neutral", value: 2, color: "#F59E0B" },
      { name: "Negative", value: 1, color: "#EF4444" },
    ],
    // NEW: Performance Data - Department Level
    performance: [
      { name: "Business Permit", score: 4.9, status: "Good", color: "#10B981" },
      { name: "Health Office", score: 4.8, status: "Good", color: "#10B981" },
      {
        name: "Civil Registry",
        score: 3.5,
        status: "Average",
        color: "#F59E0B",
      },
      { name: "Engineering", score: 2.1, status: "Poor", color: "#EF4444" },
      { name: "DSWD", score: 5.0, status: "Good", color: "#10B981" },
    ],
    feedback: [
      {
        id: 101,
        user: "General Public #9021",
        service: "Business Permit",
        text: "Very fast transaction today.",
        sentiment: "Positive",
        time: "10 mins ago",
      },
      {
        id: 102,
        user: "General Public #9022",
        service: "Health Office",
        text: "Doctor arrived on time.",
        sentiment: "Positive",
        time: "45 mins ago",
      },
    ],
  },
  "7 Weekly": {
    kpi: [
      {
        id: 1,
        title: "Avg Satisfaction",
        value: "4.1",
        total: "/ 5.0",
        trend: "-0.2",
        variant: "green",
        icon: "Smile",
      },
      {
        id: 2,
        title: "Total Feedback",
        value: "245",
        trend: "+15%",
        variant: "blue",
        icon: "Users",
      },
      {
        id: 3,
        title: "Sentiment Score",
        value: "72%",
        trend: "-5%",
        variant: "purple",
        icon: "TrendingUp",
      },
      {
        id: 4,
        title: "Unresolved Issues",
        value: "28",
        trend: "+10%",
        variant: "red",
        icon: "Frown",
      },
    ],
    sentiment: [
      { name: "Positive", value: 140, color: "#10B981" },
      { name: "Neutral", value: 65, color: "#F59E0B" },
      { name: "Negative", value: 40, color: "#EF4444" },
    ],
    performance: [
      { name: "Business Permit", score: 4.5, status: "Good", color: "#10B981" },
      {
        name: "Health Office",
        score: 4.2,
        status: "Average",
        color: "#F59E0B",
      },
      {
        name: "Civil Registry",
        score: 3.8,
        status: "Average",
        color: "#F59E0B",
      },
      { name: "Engineering", score: 2.8, status: "Poor", color: "#EF4444" },
      { name: "DSWD", score: 4.7, status: "Good", color: "#10B981" },
    ],
    feedback: [
      {
        id: 201,
        user: "General Public #8500",
        service: "Engineering",
        text: "Felt I was asked for extra fees.",
        sentiment: "Negative",
        time: "1 day ago",
      },
      {
        id: 202,
        user: "General Public #8512",
        service: "DSWD",
        text: "Very helpful staff.",
        sentiment: "Positive",
        time: "3 days ago",
      },
    ],
  },
  "30 Monthly": {
    kpi: [
      {
        id: 1,
        title: "Avg Satisfaction",
        value: "4.5",
        total: "/ 5.0",
        trend: "+0.1",
        variant: "green",
        icon: "Smile",
      },
      {
        id: 2,
        title: "Total Feedback",
        value: "1,105",
        trend: "+8%",
        variant: "blue",
        icon: "Users",
      },
      {
        id: 3,
        title: "Sentiment Score",
        value: "84%",
        trend: "+3%",
        variant: "purple",
        icon: "TrendingUp",
      },
      {
        id: 4,
        title: "Unresolved Issues",
        value: "54",
        trend: "-5%",
        variant: "red",
        icon: "Frown",
      },
    ],
    sentiment: [
      { name: "Positive", value: 850, color: "#10B981" },
      { name: "Neutral", value: 155, color: "#F59E0B" },
      { name: "Negative", value: 100, color: "#EF4444" },
    ],
    performance: [
      { name: "Business Permit", score: 4.6, status: "Good", color: "#10B981" },
      { name: "Health Office", score: 4.4, status: "Good", color: "#10B981" },
      {
        name: "Civil Registry",
        score: 4.1,
        status: "Average",
        color: "#F59E0B",
      },
      { name: "Engineering", score: 3.9, status: "Average", color: "#F59E0B" },
      { name: "DSWD", score: 4.8, status: "Good", color: "#10B981" },
    ],
    feedback: [
      {
        id: 301,
        user: "General Public #7001",
        service: "Planning",
        text: "Process is slow.",
        sentiment: "Neutral",
        time: "1 week ago",
      },
      {
        id: 302,
        user: "General Public #6800",
        service: "Mayor's Office",
        text: "Great facilities.",
        sentiment: "Positive",
        time: "2 weeks ago",
      },
    ],
  },
};

// --- 2. ICON HELPER ---
const getIcon = (name, size = 24) => {
  const icons = {
    Smile: <Smile size={size} />,
    Users: <Users size={size} />,
    TrendingUp: <TrendingUp size={size} />,
    Frown: <Frown size={size} />,
  };
  return icons[name] || <Activity size={size} />;
};

// --- 3. SUB-COMPONENTS ---
const KPICard = ({ title, value, total, trend, iconName, variant }) => {
  const colors = {
    green: "bg-green-50 text-green-600 ring-green-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    red: "bg-red-50 text-red-600 ring-red-100",
  };
  const trendColor = trend.includes("+")
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="group bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ring-1 transition-transform duration-500 group-hover:rotate-6 ${colors[variant]}`}
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
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            vs last month
          </span>
        </div>
      </div>
      <div className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-32 sm:h-32 bg-slate-50/50 rounded-full blur-2xl group-hover:bg-slate-100 transition-colors duration-500" />
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
const AdminOverview = () => {
  const [activeFilter, setActiveFilter] = useState("1 Daily");
  const currentView = dashboardDatabase[activeFilter];

  // Calculate summary counts for the performance section
  const goodCount = currentView.performance.filter(
    (item) => item.status === "Good"
  ).length;
  const averageCount = currentView.performance.filter(
    (item) => item.status === "Average"
  ).length;
  const poorCount = currentView.performance.filter(
    (item) => item.status === "Poor"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              System Dashboard
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base flex items-center gap-2">
              <Activity size={18} className="text-blue-600 hidden sm:block" />
              Showing analysis for:{" "}
              <span className="text-blue-600 font-bold">{activeFilter}</span>
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
            {["1 Daily", "7 Weekly", "30 Monthly"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white shadow-md ring-1 ring-slate-900"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {currentView.kpi.map((kpi) => (
            <KPICard key={kpi.id} {...kpi} iconName={kpi.icon} />
          ))}
        </div>

        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Sentiment */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 h-full flex flex-col">
            <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                  Sentiment Analysis
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 font-bold mt-1">
                  BERT CLASSIFICATION ENGINE
                </p>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentView.sentiment}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {currentView.sentiment.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          cornerRadius={6}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                        fontWeight: "bold",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {currentView.sentiment.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between text-sm px-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-slate-600 font-bold">{s.name}</span>
                    </div>
                    <span className="font-black text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE/RIGHT COLUMN: Performance & Feedback */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* DEPARTMENT PERFORMANCE SECTION */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Department Performance
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Average satisfaction score by office
                  </p>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <BarChart2 size={20} />
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-green-600">
                    {goodCount}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-green-800 uppercase tracking-wide mt-1">
                    Good
                  </span>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-amber-500">
                    {averageCount}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase tracking-wide mt-1">
                    Average
                  </span>
                </div>
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-red-500">
                    {poorCount}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-red-800 uppercase tracking-wide mt-1">
                    Poor
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
                {/* Chart Side */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={currentView.performance}
                      layout="vertical"
                      margin={{ left: 0, right: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis type="number" domain={[0, 5]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={100}
                        tick={{
                          fontSize: 11,
                          fontWeight: 600,
                          fill: "#64748b",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                        {currentView.performance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Status List Side */}
                <div className="space-y-4">
                  {currentView.performance.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          {item.name}
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          {item.score}{" "}
                          <span className="text-xs text-slate-400 font-medium">
                            / 5.0
                          </span>
                        </span>
                      </div>
                      <div
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                          item.status === "Good"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Average"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Feedback Stream */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
              <div className="px-6 sm:px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Live Feedback Stream
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                      Real-time Updates
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100 overflow-y-auto">
                {currentView.feedback.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-slate-50/80 transition-all duration-200 group relative"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-black text-slate-900 text-sm">
                            {item.user}
                          </span>
                          <span className="text-[10px] font-black text-blue-600 px-2 py-1 bg-blue-100 rounded-lg uppercase">
                            {item.service}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 ml-auto flex items-center gap-1">
                            <Activity size={10} /> {item.time}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium italic">
                          "{item.text}"
                        </p>
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${
                            item.sentiment === "Positive"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.sentiment === "Negative"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.sentiment === "Positive"
                                ? "bg-green-500"
                                : item.sentiment === "Negative"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {item.sentiment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
