import React from 'react';
import { 
  Filter, 
  Search, 
  Download, 
  MessageSquare, 
  BarChart3, 
  Tag,
  ArrowUpRight,
  MoreHorizontal
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

const FeedbackAnalysis = () => {
  // Average Satisfaction per Question (Bar Chart Data)
  const questionRatings = [
    { question: 'Staff Courtesy', rating: 4.5 },
    { question: 'Facility Cleanliness', rating: 3.8 },
    { question: 'Processing Speed', rating: 2.9 },
    { question: 'Ease of Access', rating: 4.1 },
    { question: 'Information Clarity', rating: 3.4 },
  ];

  const sentimentData = [
    { name: 'Positive', value: 742, color: '#10B981' },
    { name: 'Neutral', value: 310, color: '#F59E0B' },
    { name: 'Negative', value: 232, color: '#EF4444' },
  ];

  // Frequent Complaint Keywords
  const topKeywords = [
    { term: 'Long Waiting Time', count: 142, trend: 'up' },
    { term: 'System Offline', count: 88, trend: 'up' },
    { term: 'Helpful Staff', count: 76, trend: 'down' },
    { term: 'Confusing Forms', count: 64, trend: 'stable' },
  ];

  const detailedFeedback = [
    { id: 101, comment: "The queues are moving very slowly today at the permit section.", sentiment: "Negative", service: "Business Permit", date: "Jan 14, 2026" },
    { id: 102, comment: "Guard was very helpful in pointing me to the right window.", sentiment: "Positive", service: "Barangay Health", date: "Jan 14, 2026" },
    { id: 103, comment: "Website was down so I had to come here in person.", sentiment: "Negative", service: "Online Portal", date: "Jan 13, 2026" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Feedback Analysis</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <MessageSquare size={18} className="text-blue-600" />
            Deep-dive into citizen comments and BERT-processed sentiment trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search comments..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* --- TOP VISUALS: RATINGS & SENTIMENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bar Chart: Satisfaction per Question */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-10">
            <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Satisfaction per Question</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Avg Score by Category</p>
            </div>
            <BarChart3 className="text-blue-500 bg-blue-50 p-2 rounded-xl" size={40} />
        </div>

        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
            {/* Changed layout to horizontal */}
            <BarChart 
                data={questionRatings} 
                layout="horizontal" 
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
                {/* Grid lines on the Y-axis instead of X-axis */}
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                
                {/* XAxis now handles the Categories */}
                <XAxis 
                dataKey="question" 
                type="category"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                interval={0} // Forces all labels to show
                />
                
                {/* YAxis now handles the Numbers */}
                <YAxis 
                type="number" 
                domain={[0, 5]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                />
                
                <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' 
                }}
                />

                {/* Bar: Changed radius to [8, 8, 0, 0] for vertical top-rounding */}
                <Bar dataKey="rating" radius={[10, 10, 0, 0]} barSize={45}>
                {questionRatings.map((entry, index) => (
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

        {/* Sentiment Mini-Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 self-start">Sentiment Weight</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4">
               {sentimentData.map(s => (
                 <div key={s.name} className="text-center">
                   <div className="text-xs font-bold text-slate-900">{Math.round((s.value/1284)*100)}%</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase">{s.name}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Keyword Extraction */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Tag size={18} className="text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Hot Issues</h3>
            </div>
            <div className="space-y-4">
              {topKeywords.map((item) => (
                <div key={item.term} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{item.term}</span>
                  <span className="text-xs font-black bg-slate-800 px-2 py-1 rounded-lg">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- FEEDBACK TABLE --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-lg font-bold text-slate-900">Detailed Feedback Record</h3>
          <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full uppercase tracking-tight">
            Showing 128 Entries
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Citizen Comment</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Sentiment</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {detailedFeedback.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6 max-w-md">
                    <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{row.comment}"</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${
                      row.sentiment === 'Positive' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.sentiment === 'Positive' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {row.sentiment}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                      {row.service}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-slate-400">
                    {row.date}
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
      </div>
    </div>
  );
};

export default FeedbackAnalysis;