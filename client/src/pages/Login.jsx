import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added this
import { 
  Lock, Mail, Eye, EyeOff, ShieldCheck, 
  Terminal, ChevronRight, Fingerprint
} from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Added missing error state
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  
  // Added missing formData state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const statuses = ['SYSTEM SCAN', 'ENCRYPTING', 'OPERATIONAL'];
    let i = 0;
    const interval = setInterval(() => {
      setSystemStatus(statuses[i % statuses.length]);
      i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handler to update the state as you type
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('adminUser', JSON.stringify(result.data));
        navigate('/dashboard'); 
      } else {
        setError(result.message || 'Invalid credentials');
      }

    } catch {
      setError('Cannot connect to server. Please check your backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100/50 font-sans p-4 lg:p-0">
      
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-300/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden bg-white border border-white/40 backdrop-blur-sm">
        
        {/* LEFT PANEL */}
        <div className="lg:w-[38%] p-10 lg:p-12 bg-[#0F172A] relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <Terminal size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight leading-none">LGU Iba</h1>
                <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase mt-1">Core Admin</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white leading-[1.2] tracking-tight">
                Municipal <br /> 
                <span className="text-blue-500">Intelligence</span> Dashboard
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Secure gateway for sentiment analysis and real-time governance metrics.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-6">
             <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3 text-[10px] font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">System Status</span>
                    <span className="text-emerald-400 font-mono">{systemStatus}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[65%] animate-pulse" />
                </div>
             </div>
             
             <div className="flex items-center gap-3 text-slate-500 ml-1">
                <Fingerprint size={14} />
                <span className="text-[10px] font-medium tracking-widest uppercase opacity-60">Session: Encrypted</span>
             </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:w-[62%] p-8 lg:p-16 bg-white/80 backdrop-blur-md flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Authorize Access</h3>
              <p className="text-slate-500 text-sm font-medium">Please enter your credentials to continue.</p>
            </div>

            {/* ERROR ALERT BOX */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Official Email Address</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder="name@iba.gov.ph"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder="••••••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer" />
                  <span className="text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Persistent Session</span>
                </label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Key?</button>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    ENTER DASHBOARD
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                Protected by Senti-Iba Firewall. All access requests are logged and monitored by the IT Governance Division.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 w-full text-center text-[10px] text-slate-400 font-bold tracking-[0.4em] uppercase opacity-50">
        IBA-SECURE-NODE // 2026.4
      </div>
    </div>
  );
};

export default AdminLogin;