import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  BrainCircuit, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

const AiInsights = () => {
  // Mock Data: BERT Generated Intelligence
  const aiInsights = [
    {
      id: 1,
      type: 'trend',
      title: 'Processing Time Spike',
      description: 'Negative feedback regarding processing time for Business Permit services increased by 18% in the last 30 days.',
      impact: 'High',
      confidence: 94,
      icon: <Clock className="text-red-500" />
    },
    {
      id: 2,
      type: 'issue',
      title: 'Recurring Kiosk Failure',
      description: 'The term "Kiosk Offline" was detected in 42 separate complaints related to the Health Center lobby.',
      impact: 'Medium',
      confidence: 89,
      icon: <AlertTriangle className="text-amber-500" />
    }
  ];

  const recommendations = [
    {
      target: 'Business Permits',
      action: 'Redistribute staff to Window 3 during peak hours (10 AM - 2 PM).',
      reason: 'BERT detected high frustration levels specifically regarding mid-morning wait times.',
      effort: 'Low'
    },
    {
      target: 'System Infrastructure',
      action: 'Schedule preventative maintenance for Kiosk Unit #04.',
      reason: 'Sentiment analysis identifies hardware reliability as a primary driver for neutral-to-negative shifts.',
      effort: 'Medium'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 animate-in fade-in duration-700">
      
      {/* --- AI HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <BrainCircuit size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">BERT AI Insights</h2>
          </div>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-2">
            <Sparkles size={16} className="text-blue-500" />
            Actionable intelligence derived from Natural Language Processing.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Confidence</p>
            <p className="text-lg font-black text-blue-600">92.4%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-blue-50 border-t-blue-600 animate-spin-slow" />
        </div>
      </div>

      {/* --- TREND ALERTS & INSIGHT CARDS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {aiInsights.map((insight) => (
          <div key={insight.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  {insight.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                    insight.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {insight.impact} Impact
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 mt-2">
                    Confidence: {insight.confidence}%
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900">{insight.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium italic">"{insight.description}"</p>
              
              <div className="pt-4 flex items-center gap-2 text-blue-600 font-bold text-sm cursor-pointer hover:gap-4 transition-all">
                View related feedback <ArrowRight size={16} />
              </div>
            </div>
            {/* Background Blur Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50" />
          </div>
        ))}
      </div>

      {/* --- RECOMMENDATION PANEL --- */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Lightbulb size={200} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <Zap className="text-amber-400 fill-amber-400" size={28} />
            <h3 className="text-2xl font-black tracking-tight">AI Suggested Actions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-4xl space-y-4 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Target: {rec.target}</span>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded text-white italic">Effort: {rec.effort}</span>
                </div>
                <h4 className="text-lg font-bold leading-tight">{rec.action}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{rec.reason}</p>
                
                <button className="w-full mt-4 py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors">
                  Mark for Implementation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODEL CONFIDENCE / STATUS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatusCard title="Model Training" status="Optimized" icon={<ShieldCheck className="text-green-500" />} />
        <StatusCard title="Data Latency" status="24ms" icon={<TrendingUp className="text-blue-500" />} />
        <StatusCard title="Sentiment Accuracy" status="98.2%" icon={<Sparkles className="text-purple-500" />} />
      </div>
    </div>
  );
};

// Internal Sub-component for small status cards
const StatusCard = ({ title, status, icon }) => (
  <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-lg font-black text-slate-900">{status}</p>
    </div>
  </div>
);

export default AiInsights;