import { useEffect, useState, useMemo } from "react";
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Search,
  Award,
  AlertCircle,
  ChevronRight,
  BarChart as BarChartIcon,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import axios from "axios";

const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
      <div className="space-y-3">
        <div className="h-9 w-64 bg-slate-200 rounded-lg" />
        <div className="h-5 w-96 bg-slate-100 rounded-md" />
      </div>
    </div>

    {/* Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      {[1, 2].map((i) => (
        <div key={i} className="h-45 bg-slate-50 rounded-[3rem] border border-slate-100 p-8 flex justify-between items-center">
          <div className="space-y-4 flex-1">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="space-y-2">
              <div className="h-8 w-full bg-slate-200 rounded-lg" />
              <div className="h-4 w-32 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="w-20 h-20 bg-slate-200 rounded-4xl ml-4" />
        </div>
      ))}
    </div>

    {/* Chart Skeleton */}
    <div className="h-125 bg-slate-50 rounded-[3rem] border border-slate-100 p-10">
      <div className="h-6 w-48 bg-slate-200 rounded mb-12" />
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-6 flex-1 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServicePerformance = () => {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicePerformance = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/service-performance",
        );
        setServiceData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load service performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchServicePerformance();
  }, []);

  const highestRated = useMemo(() => {
    if (!serviceData || serviceData.length === 0) return null;
    return [...serviceData].sort((a, b) => b.rating - a.rating)[0];
  }, [serviceData]);

  const highestNegative = useMemo(() => {
    if (!serviceData || serviceData.length === 0) return null;
    return [...serviceData].sort((a, b) => b.negative - a.negative)[0];
  }, [serviceData]);
  
  if (loading) return <SkeletonLoader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Service Performance
          </h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <BarChartIcon size={18} className="text-blue-600" />
            Comparative analysis of departmental efficiency and citizen
            satisfaction.
          </p>
        </div>
      </div>

      {/* --- TOP RANKING CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Highest Rated Card */}
        <div className="bg-linear-to-br from-emerald-50 via-white to-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-500/5 flex items-center justify-between group hover:border-emerald-200 transition-all duration-500">
          <div className="space-y-4 flex-1 pr-4">
            <div className="flex items-center gap-2.5 text-emerald-600">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <Award size={20} className="animate-bounce" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                Top Performer
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                {highestRated.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  Avg Satisfaction:
                </span>
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-black rounded-lg shadow-sm shadow-emerald-200">
                  {highestRated.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 bg-emerald-500 rounded-4xl shadow-lg shadow-emerald-200 flex items-center justify-center group-hover:rotate-12 transition-all duration-500">
            <TrendingUp className="text-white" size={40} />
          </div>
        </div>

        {/* Action Required Card */}
        <div className="bg-linear-to-br from-rose-50 via-white to-white p-8 rounded-[3rem] border border-rose-100 shadow-xl shadow-rose-500/5 flex items-center justify-between group hover:border-rose-200 transition-all duration-500 min-h-45">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <div className="p-2 bg-rose-100 rounded-xl">
                <AlertCircle size={20} className="animate-pulse" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                Priority Alert
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-rose-700 transition-colors">
                {highestNegative.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                  Negative Pulse:
                </span>
                <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-black rounded-lg shadow-sm shadow-rose-200">
                  {highestNegative.negative}% Issues
                </span>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 bg-rose-500 rounded-4xl shadow-lg shadow-rose-200 flex items-center justify-center group-hover:-rotate-12 transition-all duration-500">
            <TrendingDown className="text-white" size={40} />
          </div>
        </div>
      </div>

      {/* --- HORIZONTAL CHART SECTION --- */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-slate-300/50">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                Departmental Satisfaction Index
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] ml-3">
              Performance benchmarking across 10 key offices
            </p>
          </div>

          {/* Modern Legend */}
          <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />{" "}
              Exceptional
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" /> Standard
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" /> Critical
            </div>
          </div>
        </div>

        <div className="h-137.5 w-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={serviceData}
              margin={{ top: 0, right: 60, left: 60, bottom: 0 }}
              barGap={20}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity={1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="12 12"
                horizontal={false}
                vertical={true}
                stroke="#f8fafc"
              />

              <XAxis type="number" domain={[0, 5]} hide />

              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                width={180}
                tick={{
                  fill: "#475569",
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: "0.025em",
                  textTransform: "uppercase",
                }}
              />

              <Tooltip
                cursor={{ fill: "#f1f5f9", radius: 12 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 min-w-40">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">
                          {payload[0].payload.name}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-black text-slate-900">
                            {payload[0].value}
                          </p>
                          <p className="text-xs font-bold text-slate-400">
                            / 5.00
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar dataKey="rating" radius={[0, 20, 20, 0]} barSize={24}>
                {serviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.rating > 4
                        ? "#10b981"
                        : entry.rating > 3
                          ? "#3b82f6"
                          : "#f43f5e"
                    }
                    className="transition-all duration-500 hover:opacity-80"
                  />
                ))}
                <LabelList
                  dataKey="rating"
                  position="right"
                  content={(props) => {
                    const { x, y, width, value } = props;
                    return (
                      <text
                        x={x + width + 15}
                        y={y + 16}
                        fill="#0f172a"
                        textAnchor="start"
                        className="text-[13px] font-black tracking-tighter"
                      >
                        {value.toFixed(2)}
                      </text>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Table Header Section */}
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Office Performance Breakdown
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              In-depth departmental efficiency audit
            </p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50/50 px-4 py-2 rounded-2xl border border-blue-100/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
              Live Audit
            </span>
          </div>
        </div>

        <div className="overflow-x-auto p-6 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  Office / Department
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  CC Awareness
                </th>{" "}
                {/* Added Column */}
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  Satisfaction
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  Sentiment Health
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  Activity
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {serviceData.map((service, idx) => (
                <tr
                  key={idx}
                  className="group transition-all duration-300 hover:scale-[1.01]"
                >
                  {/* Office Name - PREMIUM MODERN LOOK */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-l-4xl border-y border-l border-transparent group-hover:border-slate-100 group-hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-4">
                      {/* Dynamic Avatar/Icon Box */}
                      <div className="relative group/icon">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-white to-slate-50 border border-slate-200 flex items-center justify-center shadow-sm group-hover/icon:shadow-md group-hover/icon:-translate-y-0.5 transition-all duration-500 overflow-hidden">
                          {/* Subtle background pattern/glow */}
                          <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                          <span className="relative z-10 text-[13px] font-black text-slate-400 group-hover:text-indigo-600 tracking-tighter transition-colors">
                            {service.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>

                        {/* Small Online/Active Indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800 group-hover:text-indigo-600 transition-all duration-300 tracking-tight">
                          {service.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Department
                          </span>
                          <div className="h-1 w-1 rounded-full bg-slate-300" />
                          <span className="text-[9px] font-bold text-indigo-500/80 uppercase">
                            LGU Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CC Awareness - MATCHED DESIGN */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Dynamic Badge - Color matched with bar */}
                        <div
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-colors duration-500 ${
                            service.cc_awareness > 0.85
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                              : service.cc_awareness > 0.7
                                ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                                : "bg-rose-50 border-rose-100 text-rose-600"
                          }`}
                        >
                          {(service.cc_awareness * 100).toFixed(0)}%
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                          Awareness
                        </span>
                      </div>

                      {/* Progress Bar - Color matched with badge */}
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden p-px border border-slate-200/50">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            service.cc_awareness > 0.85
                              ? "bg-emerald-500"
                              : service.cc_awareness > 0.7
                                ? "bg-indigo-500"
                                : "bg-rose-500"
                          }`}
                          style={{ width: `${service.cc_awareness * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Performance Rating - WITH COLOR CONDITIONS */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-xl font-black leading-none transition-colors duration-500 ${
                            service.rating >= 4.0
                              ? "text-emerald-600"
                              : service.rating >= 3.0
                                ? "text-blue-600"
                                : "text-rose-600"
                          }`}
                        >
                          {service.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          / 5.0
                        </span>
                      </div>

                      {/* Segmented-style Bar with Conditional Colors */}
                      <div className="flex gap-1 w-28">
                        {[1, 2, 3, 4, 5].map((step) => {
                          const isHigh = service.rating >= 4.0;
                          const isMid = service.rating >= 3.0;

                          let fillClass = "bg-slate-200/60";

                          if (service.rating >= step) {
                            fillClass = isHigh
                              ? "bg-emerald-500"
                              : isMid
                                ? "bg-blue-500"
                                : "bg-rose-500";
                          } else if (service.rating > step - 1) {
                            fillClass = isHigh
                              ? "bg-emerald-200"
                              : isMid
                                ? "bg-blue-200"
                                : "bg-rose-200";
                          }

                          return (
                            <div
                              key={step}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${fillClass}`}
                            />
                          );
                        })}
                      </div>

                      {/* Subtle Status Label */}
                      <p
                        className={`text-[9px] font-black uppercase tracking-widest ${
                          service.rating >= 4.0
                            ? "text-emerald-500/70"
                            : service.rating >= 3.0
                              ? "text-blue-500/70"
                              : "text-rose-500/70"
                        }`}
                      >
                        {service.rating >= 4.0
                          ? "Excellent"
                          : service.rating >= 3.0
                            ? "Good"
                            : "Needs Review"}
                      </p>
                    </div>
                  </td>

                  {/* Negative Sentiment - REFINED WITH COLOR CONDITIONS */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex flex-col gap-2">
                      {/* Dynamic Badge Pill */}
                      <div
                        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border w-fit transition-all duration-500 ${
                          service.negative > 25
                            ? "bg-rose-50 border-rose-100 text-rose-600 shadow-sm shadow-rose-100"
                            : service.negative > 10
                              ? "bg-amber-50 border-amber-100 text-amber-600"
                              : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }`}
                      >
                        {/* Indicator Dot */}
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            service.negative > 25
                              ? "bg-rose-500 animate-pulse"
                              : service.negative > 10
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                        />

                        <span className="text-[11px] font-black tracking-tight whitespace-nowrap">
                          {service.negative}% Negative
                        </span>
                      </div>

                      {/* Metadata Text */}
                      <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                          Resistance Index
                        </p>
                        {service.negative > 25 && (
                          <span className="text-[9px] font-bold text-rose-400 uppercase mt-1 animate-bounce">
                            Critical Issue
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Feedback Volume - MODERN ACTIVITY LOOK */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="flex items-end gap-0.5 h-8 w-10 pb-1">
                        {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors duration-500"
                            style={{ height: `${h * 100}%` }}
                          />
                        ))}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-black text-slate-900 tabular-nums leading-none">
                            {service.volume.toLocaleString()}
                          </span>
                          <div className="p-0.5 bg-emerald-50 rounded-md">
                            <TrendingUp
                              size={10}
                              className="text-emerald-500"
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          Traffic Volume
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicePerformance;
