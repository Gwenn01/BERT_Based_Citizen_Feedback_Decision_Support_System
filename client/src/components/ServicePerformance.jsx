import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Search, 
  Award, 
  AlertCircle,
  ChevronRight,
  BarChart as BarChartIcon,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';

const ServicePerformance = () => {
  // Updated Data: Municipal Offices
  const serviceData = [
    { name: "Sangguniang Bayan", rating: 4.2, volume: 120, negative: 10 },
    { name: "Assessor's Office", rating: 3.8, volume: 450, negative: 25 },
    { name: "Engineering Office", rating: 3.5, volume: 380, negative: 30 },
    { name: "Agricultural Services", rating: 4.5, volume: 210, negative: 5 },
    { name: "Youth Development", rating: 4.7, volume: 180, negative: 2 },
    { name: "MSWDO", rating: 2.9, volume: 520, negative: 48 },
    { name: "Irene Maniquiz Center", rating: 4.9, volume: 600, negative: 1 },
    { name: "Treasury Office", rating: 3.2, volume: 850, negative: 35 },
    { name: "Civil Registry", rating: 4.1, volume: 420, negative: 12 },
    { name: "Health Services", rating: 4.8, volume: 950, negative: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Service Performance</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <BarChartIcon size={18} className="text-blue-600" />
            Comparative analysis of departmental efficiency and citizen satisfaction.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer shadow-sm">
              <option>All Departments</option>
              {serviceData.map(s => <option key={s.name}>{s.name}</option>)}
            </select>
            <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- TOP RANKING CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-linear-to-br from-green-50 to-white p-8 rounded-[2.5rem] border border-green-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <Award size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Highest Rated Service</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Irene Maniquiz Action Center</h3>
            <p className="text-sm font-medium text-slate-500">Avg Satisfaction: <span className="text-green-600 font-bold">4.9/5.0</span></p>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
             <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-linear-to-br from-red-50 to-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Action Required</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Social Welfare (MSWDO)</h3>
            <p className="text-sm font-medium text-slate-500">Negative Sentiment: <span className="text-red-600 font-bold">48%</span></p>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
             <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* --- HORIZONTAL CHART SECTION --- */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:shadow-slate-300/50">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 bg-blue-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Departmental Satisfaction Index</h3>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] ml-3">
              Performance benchmarking across 10 key offices
            </p>
          </div>
          
          {/* Modern Legend */}
          <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" /> Exceptional
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
                  <stop offset="0%" stopColor="currentColor" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="currentColor" stopOpacity={1} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="12 12" horizontal={false} vertical={true} stroke="#f8fafc" />
              
              <XAxis type="number" domain={[0, 5]} hide />
              
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={180}
                tick={{ 
                  fill: '#475569', 
                  fontSize: 10, 
                  fontWeight: 900, 
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase'
                }}
              />
              
              <Tooltip 
                cursor={{ fill: '#f1f5f9', radius: 12 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 min-w-40">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">{payload[0].payload.name}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-black text-slate-900">{payload[0].value}</p>
                          <p className="text-xs font-bold text-slate-400">/ 5.00</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <Bar 
                dataKey="rating" 
                radius={[0, 20, 20, 0]} 
                barSize={24}
              >
                {serviceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.rating > 4 ? '#10b981' : entry.rating > 3 ? '#3b82f6' : '#f43f5e'} 
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
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Office Performance Breakdown</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">In-depth departmental efficiency audit</p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50/50 px-4 py-2 rounded-2xl border border-blue-100/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Live Audit</span>
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Office / Department</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Satisfaction</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Sentiment Health</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em]">Activity</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {serviceData.map((service, idx) => (
                <tr key={idx} className="group transition-all duration-300 hover:scale-[1.01]">
                  {/* Office Name with Icon Placeholder */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-l-3xl border-y border-l border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shadow-sm">
                        {service.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-black text-slate-700 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </span>
                    </div>
                  </td>

                  {/* Performance Rating */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{service.rating.toFixed(1)}</span>
                        <span className="text-[10px] font-bold text-slate-400">/ 5.0</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            service.rating > 4 ? 'bg-emerald-500' : service.rating > 3 ? 'bg-blue-500' : 'bg-rose-500'
                          }`} 
                          style={{ width: `${(service.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Negative Sentiment */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${service.negative > 25 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <span className={`text-[11px] font-black tracking-tight ${service.negative > 25 ? 'text-rose-600' : 'text-slate-600'}`}>
                          {service.negative}% Negative
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Citizen Resistance</p>
                    </div>
                  </td>

                  {/* Feedback Volume */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white border-y border-transparent group-hover:border-slate-100 group-hover:shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-700">{service.volume.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Total Entries</span>
                    </div>
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-5 bg-slate-50/50 group-hover:bg-white rounded-r-3xl border-y border-r border-transparent group-hover:border-slate-100 group-hover:shadow-sm text-right">
                    <button className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
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
  );
};

export default ServicePerformance;