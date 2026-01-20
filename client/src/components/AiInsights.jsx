import { useMemo, useState } from 'react';
import { 
  Sparkles, AlertTriangle, BrainCircuit, 
  ArrowRight, ShieldCheck, Zap, Clock, CheckCircle2,
  Activity, BarChart3, Fingerprint
} from 'lucide-react';
import insightData from '../data/aidata.json';

const AiInsights = () => {
  const [activeFilter, setActiveFilter] = useState('1 Daily');

  const currentData = useMemo(() => {
    if (!insightData) return null;
    
    let dataArray = [];
    if (activeFilter === '1 Daily') dataArray = insightData.daily || [];
    else if (activeFilter === '7 Weekly') dataArray = insightData.weekly || [];
    else if (activeFilter === '30 Monthly') dataArray = insightData.monthly || [];

    if (dataArray.length === 0) return null;

    const latestEntry = dataArray[dataArray.length - 1];

    const satisfaction = latestEntry.public_satisfaction 
      ? latestEntry.public_satisfaction 
      : Math.round((latestEntry.average_rating / 5) * 100);

    return {
      ...latestEntry,
      calculated_satisfaction: satisfaction
    };
  }, [activeFilter]);

  if (!currentData) return (
    <div className="flex items-center justify-center h-64 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
      Initialising Intelligence Engine...
    </div>
  );

  const filters = [
    { id: '1 Daily', label: 'Daily' },
    { id: '7 Weekly', label: 'Weekly' },
    { id: '30 Monthly', label: 'Monthly' }
  ];

  // Handler para maiwasan ang "is not a function" error
  const handleFilterClick = (id) => {
    if (typeof setActiveFilter === 'function') {
      setActiveFilter(id);
    } else {
      console.error("Prop 'setActiveFilter' is missing or not a function in AiInsights.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">BERT Intelligence</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Fingerprint size={18} className="text-blue-600" />
            Neural processing of citizen sentiment and operational bottlenecks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFilterClick(f.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  activeFilter === f.id 
                  ? 'bg-white text-slate-900 shadow-md transform scale-105' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
            <Clock size={14} className="text-blue-500" /> 
            {currentData.date || currentData.week || currentData.month}
          </div>
        </div>
      </div>

      {/* --- TOP VISUALS: INSIGHT & SATISFACTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Neural Sentiment Analysis</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">BERT Model Output v2.4</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${
              currentData.severity === 'Critical' 
              ? 'bg-red-50 text-red-700 border-red-100' 
              : currentData.severity === 'High'
              ? 'bg-orange-50 text-orange-700 border-orange-100'
              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}>
              <AlertTriangle size={14} />
              {currentData.severity} Priority
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
              Trend detected: Average Rating is <span className="text-blue-600 underline decoration-blue-200 font-mono">{Number(currentData.average_rating).toFixed(2)}</span>
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium italic bg-slate-50 p-6 rounded-3xl border-l-4 border-blue-500">
              "System identifies {currentData.severity?.toLowerCase() || 'latent'} bottlenecks. Core recommendation: {currentData.recommendations?.[0] || 'Monitor trends'}."
            </p>
            
            <div className="flex items-center gap-4 pt-4">
               <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                Analyze Raw Data <ArrowRight size={16} />
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Confidence</span>
                <span className="text-sm font-bold text-slate-900">94.8% Reliability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Public Satisfaction Card */}
        <div className="lg:col-span-4 bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} className="text-blue-400 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Public Health Index</h3>
            </div>
            <h4 className="text-lg font-bold">Aggregate Satisfaction</h4>
          </div>
          
          <div className="relative z-10 my-6">
            <h2 className="text-7xl font-black tracking-tighter tabular-nums group-hover:scale-105 transition-transform duration-500">
              {currentData.calculated_satisfaction}<span className="text-2xl text-blue-400">%</span>
            </h2>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Current Score</span>
              <span>Target: 90%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${currentData.calculated_satisfaction}%` }}
              />
            </div>
          </div>
          <BarChart3 size={140} className="absolute -right-8 -bottom-8 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-700" />
        </div>
      </div>

      {/* --- STRATEGIC PLAYBOOK --- */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5">
        {/* Header Section */}
        <div className="px-10 py-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-slate-50/50 to-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl shadow-inner group">
              <Zap 
                className="text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform duration-300" 
                size={24} 
              />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Strategic Playbook</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI-Generated Intervention Protocols</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl uppercase tracking-wider border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              {currentData.recommendations?.length || 0} Critical Actions
            </span>
          </div>
        </div>
        
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y divide-slate-100 md:divide-y-0 lg:divide-x-0 overflow-hidden">
          {currentData.recommendations?.slice(0, 6).map((rec, idx) => (
            <div 
              key={idx} 
              className={`p-10 group relative transition-all duration-500 hover:bg-slate-50/80 cursor-pointer border-r border-b border-slate-100 last:border-r-0`}
            >
              {/* Step Indicator background effect */}
              <span className="absolute top-8 right-10 text-6xl font-black text-slate-50 group-hover:text-slate-100 transition-colors pointer-events-none">
                0{idx + 1}
              </span>

              <div className="relative z-10 space-y-5">
                <div className="flex justify-between items-start">
                  <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border ${
                    idx === 0 
                      ? 'bg-red-50 text-red-600 border-red-100' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {idx === 0 ? 'High Impact' : 'Strategic'}
                  </div>
                  <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-500">
                    <CheckCircle2 size={18} className="text-slate-200 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-800 leading-snug min-h-16 group-hover:text-slate-950 transition-colors">
                    {rec}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Optimizing neural parameters based on current {activeFilter.toLowerCase()} feedback loops.
                  </p>
                </div>

                <div className="pt-2">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x--2 group-hover:translate-x-0">
                    Execute Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info bar */}
        <div className="px-10 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Awaiting executive authorization for protocol deployment
          </p>
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200" />
            ))}
          </div>
        </div>
      </div>

      {/* --- STATUS BAR --- */}
      <div className="flex flex-wrap gap-4 pt-4">
        <StatusCard title="Model" status="BERT v2.4" icon={<BrainCircuit size={16}/>} color="text-blue-600" />
        <StatusCard title="Training" status="Stable" icon={<ShieldCheck size={16}/>} color="text-emerald-600" />
        <StatusCard title="Accuracy" status="98.2%" icon={<Sparkles size={16}/>} color="text-purple-600" />
      </div>
    </div>
  );
};

const StatusCard = ({ title, status, icon, color }) => (
  <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-200 transition-colors cursor-default">
    <div className={`p-2 bg-slate-50 rounded-xl ${color} shadow-inner`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</p>
      <p className="text-sm font-bold text-slate-900 leading-none">{status}</p>
    </div>
  </div>
);

export default AiInsights;