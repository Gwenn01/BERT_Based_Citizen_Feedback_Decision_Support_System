import React from 'react';
import { 
  Users, 
  Smile, 
  Frown, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const AdminOverview = () => {
  const sentimentData = [
    { name: 'Positive', value: 742, color: '#10B981' },
    { name: 'Neutral', value: 310, color: '#F59E0B' },
    { name: 'Negative', value: 232, color: '#EF4444' },
  ];

  const recentFeedback = [
    { id: 1, user: "Citizen #8821", service: "Business Permit", text: "Process was surprisingly fast today!", sentiment: "Positive", time: "10 mins ago" },
    { id: 2, user: "Citizen #8819", service: "Health Center", text: "Long wait times and the kiosk was down.", sentiment: "Negative", time: "1 hour ago" },
    { id: 3, user: "Citizen #8815", service: "Barangay Clearance", text: "Staff were helpful but the form is confusing.", sentiment: "Neutral", time: "3 hours ago" },
  ];

  return (
    // Standardized container width and vertical margin
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Dashboard</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            Live BERT analysis of citizen feedback across all departments.
          </p>
        </div>
        
        {/* Date Filter: Modern Pill Style */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {['7 Days', '30 Days', '90 Days'].map((filter) => (
            <button 
              key={filter} 
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                filter === '30 Days' 
                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      {/* --- KPI CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard 
          title="Avg Satisfaction" 
          value="4.2" 
          total="/ 5.0"
          trend="+0.3" 
          icon={<Smile size={24} />} 
          variant="green" 
        />
        <KPICard 
          title="Total Feedback" 
          value="1,284" 
          trend="+12%" 
          icon={<Users size={24} />} 
          variant="blue" 
        />
        <KPICard 
          title="Sentiment Score" 
          value="78%" 
          trend="+5%" 
          icon={<TrendingUp size={24} />} 
          variant="purple" 
        />
        <KPICard 
          title="Unresolved Issues" 
          value="42" 
          trend="-8%" 
          icon={<Frown size={24} />} 
          variant="red" 
        />
      </div>

      {/* --- ANALYTICS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Donut Chart Card: Better internal padding */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Sentiment Analysis</h3>
            <p className="text-xs text-slate-400 font-bold mt-1">BERT CLASSIFICATION ENGINE</p>
          </div>
          <div className="h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  innerRadius={85}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={12} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8 pt-8 border-t border-slate-50">
            {sentimentData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm px-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-600 font-bold">{s.name}</span>
                </div>
                <span className="font-black text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback Feed: Modern List Style */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Live Feedback Stream</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Real-time Updates</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-all uppercase tracking-wider bg-blue-50 px-5 py-2.5 rounded-2xl border border-blue-100">
              Analysis Portal <ChevronRight size={16} />
            </button>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-125">
            {recentFeedback.map((item) => (
              <div key={item.id} className="p-8 hover:bg-slate-50/80 transition-all duration-200 group relative">
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center flex-wrap gap-3">
                      <span className="font-black text-slate-900 text-sm">{item.user}</span>
                      <span className="text-[10px] font-black text-blue-600 px-3 py-1 bg-blue-100 rounded-lg uppercase">
                        {item.service}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 ml-auto sm:ml-0">
                        <Activity size={12} /> {item.time}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium italic pr-12">
                      "{item.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-tighter border shadow-sm ${
                        item.sentiment === 'Positive' ? 'bg-green-50 text-green-700 border-green-200' :
                        item.sentiment === 'Negative' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          item.sentiment === 'Positive' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                          item.sentiment === 'Negative' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                          'bg-amber-500'
                        }`} />
                        BERT: {item.sentiment}
                      </div>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-3 bg-white shadow-sm rounded-xl border border-slate-200 transition-all duration-300 absolute right-8 top-1/2 -translate-y-1/2">
                    <ArrowUpRight size={20} className="text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// IMPROVED KPI CARD: Optimized internal box sizing and decorative elements
const KPICard = ({ title, value, total, trend, icon, variant }) => {
  const colors = {
    green: 'bg-green-50 text-green-600 ring-green-100',
    blue: 'bg-blue-50 text-blue-600 ring-blue-100',
    purple: 'bg-purple-50 text-purple-600 ring-purple-100',
    red: 'bg-red-50 text-red-600 ring-red-100',
  };

  return (
    <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ring-1 transition-transform duration-500 group-hover:rotate-6 ${colors[variant]}`}>
            {icon}
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 tracking-tight">{value}</span>
            {total && <span className="text-sm font-bold text-slate-400">{total}</span>}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <div className={`flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-xl shadow-inner ${trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">vs last month</span>
        </div>
      </div>
      
      {/* Visual Decor: Modern subtle gradient fade */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-slate-50/50 rounded-full blur-2xl group-hover:bg-slate-100 transition-colors duration-500" />
    </div>
  );
};

export default AdminOverview;