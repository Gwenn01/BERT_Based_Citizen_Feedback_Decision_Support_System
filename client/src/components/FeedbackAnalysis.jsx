import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Download, 
  MessageSquare, 
  BarChart3, 
  Tag,
  User,
  Briefcase
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
  PieChart,
  Pie
} from 'recharts';
import { motion as Motion, AnimatePresence } from "framer-motion";

// Import feedback.json
import feedbackData from '../data/feedback.json'; 

const FeedbackAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // --- DYNAMIC DATA PROCESSING ---
  const stats = useMemo(() => {
    const data = feedbackData.feedback;
    
    // 1. Calculate Sentiments
    const pos = data.filter(i => i.sentiment === "Positive").length;
    const neu = data.filter(i => i.sentiment === "Neutral").length;
    const neg = data.filter(i => i.sentiment === "Negative").length;

    const serviceGroups = data.reduce((acc, curr) => {
      if (!acc[curr.service]) acc[curr.service] = { name: curr.service, total: 0, count: 0 };
      const score = curr.sentiment === "Positive" ? 5 : curr.sentiment === "Neutral" ? 3 : 1;
      acc[curr.service].total += score;
      acc[curr.service].count += 1;
      return acc;
    }, {});

    const ratings = Object.values(serviceGroups).map(s => ({
      question: s.name,
      rating: parseFloat((s.total / s.count).toFixed(1))
    })).sort((a, b) => b.rating - a.rating).slice(0, 5); // Top 5 services

    // 3. Extract Common Keywords (Simple count based on text content)
    const keywords = [
      { term: 'Mabilis', count: data.filter(i => i.text.includes('mabilis')).length },
      { term: 'Matagal/Mabagal', count: data.filter(i => i.text.includes('matagal') || i.text.includes('mabagal')).length },
      { term: 'Maayos', count: data.filter(i => i.text.includes('maayos')).length },
      { term: 'Nakakalito', count: data.filter(i => i.text.includes('nakakalito')).length },
    ].sort((a, b) => b.count - a.count);

    return {
      sentimentArr: [
        { name: 'Positive', value: pos, color: '#10B981' },
        { name: 'Neutral', value: neu, color: '#F59E0B' },
        { name: 'Negative', value: neg, color: '#EF4444' },
      ],
      questionRatings: ratings,
      topKeywords: keywords,
      totalEntries: data.length
    };
  }, []);

  const filteredFeedback = feedbackData.feedback.filter(item => 
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Feedback Analysis</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-600" />
            Comprehensive sentiment tracking and service performance metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search comments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all">
            <Download size={16} /> Export JSON
          </button>
        </div>
      </div>

      {/* --- TOP VISUALS (Now Dynamic) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Performance Bar Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Service Satisfaction</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Avg. Sentiment Score (1-5)</p>
                </div>
                <BarChart3 className="text-blue-500 bg-blue-50 p-2 rounded-xl" size={40} />
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.questionRatings} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="question" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                        <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="rating" radius={[10, 10, 0, 0]} barSize={40}>
                            {stats.questionRatings.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.rating >= 4 ? '#10B981' : entry.rating >= 3 ? '#3B82F6' : '#EF4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Sentiment Pie & Keywords */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 self-start">Sentiment Weight</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats.sentimentArr} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {stats.sentimentArr.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4">
               {stats.sentimentArr.map(s => (
                 <div key={s.name} className="text-center">
                   <div className="text-xs font-bold text-slate-900">{Math.round((s.value/stats.totalEntries)*100)}%</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase">{s.name}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Tag size={18} className="text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Extracted Keywords</h3>
            </div>
            <div className="space-y-4">
              {stats.topKeywords.map((item) => (
                <div key={item.term} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{item.term}</span>
                  <span className="text-xs font-black bg-slate-800 px-3 py-1 rounded-lg text-blue-400">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- FEEDBACK GRID --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Citizen Feedback Feed</h3>
            <div className="h-px flex-1 mx-8 bg-slate-100 hidden md:block" />
            <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
                LOGS: {filteredFeedback.length} / {stats.totalEntries}
            </span>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Citizen Details</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sentiment</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Feedback Message</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Service Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredFeedback.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  {/* Citizen Identity */}
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-500 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                        <User size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 leading-none mb-1">{item.client}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {item.time} • ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Sentiment Tag */}
                  <td className="px-6 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 shadow-sm ${
                      item.sentiment === 'Positive' ? 'bg-emerald-50 border-emerald-100/50 text-emerald-700' : 
                      item.sentiment === 'Negative' ? 'bg-rose-50 border-rose-100/50 text-rose-700' : 
                      'bg-amber-50 border-amber-100/50 text-amber-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        item.sentiment === 'Positive' ? 'bg-emerald-500' : item.sentiment === 'Negative' ? 'bg-rose-500' : 'bg-amber-500'
                      }`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.sentiment}</span>
                    </div>
                  </td>

                  {/* Feedback Text */}
                  <td className="px-6 py-6 max-w-md">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic group-hover:text-slate-900 transition-colors">
                      "{item.text}"
                    </p>
                  </td>

                  {/* Service Type */}
                  <td className="px-8 py-6 text-right">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-lg shadow-slate-200 group-hover:bg-blue-600 group-hover:shadow-blue-200 transition-all duration-300">
                      <Briefcase size={12} className="opacity-60" />
                      <span className="text-[10px] font-black uppercase tracking-tight">{item.service}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Modern Empty State */}
        {filteredFeedback.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h4 className="text-slate-900 font-black tracking-tight">No feedback found</h4>
            <p className="text-slate-400 text-sm">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default FeedbackAnalysis;