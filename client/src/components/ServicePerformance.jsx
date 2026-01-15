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
  Cell 
} from 'recharts';

const ServicePerformance = () => {
  // Mock Data: Service Comparison
  const serviceData = [
    { name: 'Business Permit', rating: 3.2, volume: 450, negative: 35 },
    { name: 'Health Center', rating: 4.8, volume: 320, negative: 5 },
    { name: 'Barangay Clear', rating: 4.1, volume: 280, negative: 12 },
    { name: 'Social Welfare', rating: 2.9, volume: 150, negative: 48 },
    { name: 'Taxes/Fees', rating: 3.9, volume: 210, negative: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER & SERVICE PICKER --- */}
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
              <option>All Services</option>
              <option>Business Permit</option>
              <option>Health Center</option>
              <option>Barangay Clearance</option>
            </select>
            <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- TOP RANKING CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Performer Card */}
        <div className="bg-linear-to-br from-green-50 to-white p-8 rounded-[2.5rem] border border-green-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <Award size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Highest Rated</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Health Center</h3>
            <p className="text-sm font-medium text-slate-500">Avg Satisfaction: <span className="text-green-600 font-bold">4.8/5.0</span></p>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
             <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        {/* Most Complained Card */}
        <div className="bg-linear-to-br from-red-50 to-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Service Alert</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Social Welfare</h3>
            <p className="text-sm font-medium text-slate-500">Negative Sentiment: <span className="text-red-600 font-bold">48%</span></p>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
             <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bar Chart: Ratings vs Volume */}
        <div className="lg:col-span-12 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Service Satisfaction Rankings</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Citizen rating across departments</p>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis 
                  domain={[0, 5]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#cbd5e1', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="rating" radius={[10, 10, 0, 0]} barSize={50}>
                  {serviceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.rating > 4 ? '#10B981' : entry.rating > 3 ? '#3B82F6' : '#EF4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- PERFORMANCE TABLE --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-lg font-bold text-slate-900">Detailed Performance Table</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updated Today</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Department</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Avg Rating</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sentiment Health</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Feedback</th>
                <th className="px-10 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {serviceData.map((service, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <span className="text-sm font-black text-slate-800">{service.name}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{service.rating}</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${service.rating > 4 ? 'bg-green-500' : service.rating > 3 ? 'bg-blue-500' : 'bg-red-500'}`} 
                          style={{ width: `${(service.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-red-500">{service.negative}% Negative</span>
                      <div className="w-full h-1 bg-slate-100 rounded-full">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${service.negative}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-slate-500 px-3 py-1 bg-slate-100 rounded-lg">
                      {service.volume} Entries
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
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