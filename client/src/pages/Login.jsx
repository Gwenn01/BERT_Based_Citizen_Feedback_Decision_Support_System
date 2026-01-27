import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added this
import { 
  Lock, Mail, Eye, EyeOff, ShieldCheck, 
  Terminal, ChevronRight, Fingerprint, XCircle, Loader2, CheckCircle2
} from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  const [modalStatus, setModalStatus] = useState('idle'); 
  const [modalMessage, setModalMessage] = useState('');
  
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

  const closeModal = () => {
    setModalStatus('idle');
    setModalMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setModalStatus('loading');
    setModalMessage('Establishing secure connection...');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setModalStatus('success');
        setModalMessage('Access Granted. Redirecting to Core Dashboard...');
        localStorage.setItem('adminUser', JSON.stringify(result.data));
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setModalStatus('error');
        setModalMessage(result.message || 'Authorization Denied: Invalid Security Key');
      }
    } catch {
      setModalStatus('error');
      setModalMessage('Network Protocol Error: Cannot reach Iba-Secure-Node');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100/50 font-sans p-4 lg:p-0">

      {modalStatus !== 'idle' && (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Ultra-pure Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-all duration-500" 
          onClick={modalStatus === 'error' ? closeModal : undefined} 
        />
        
        {/* Main Modal Container */}
        <div className={`relative w-full max-w-sm overflow-hidden rounded-[40px] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-slate-100 transition-all duration-500
          ${modalStatus === 'error' ? 'animate-shake' : 'animate-in zoom-in-95 fade-in duration-300'}
        `}>
          
          {/* Dynamic Status Bar with Gradient */}
          <div className={`h-1.5 w-full transition-all duration-1000 ${
            modalStatus === 'loading' ? 'bg-linear-to-r from-blue-400 via-blue-600 to-blue-400 bg-size-[200%_auto] animate-gradient' : 
            modalStatus === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`} />
          
          <div className="p-10 pt-12">
            <div className="flex flex-col items-center text-center">
              
              {/* MODERN ICON ANIMATION SECTION */}
              <div className="relative mb-8 flex justify-center items-center">
                {/* Background Glows */}
                {modalStatus === 'success' && (
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
                )}
                
                <div className={`relative z-10 w-24 h-24 flex items-center justify-center rounded-4xl transition-all duration-700 shadow-sm ${
                  modalStatus === 'loading' ? 'bg-blue-50 text-blue-600 shadow-blue-100' : 
                  modalStatus === 'success' ? 'bg-emerald-50 text-emerald-600 scale-110 rotate-360 shadow-emerald-100' : 
                  'bg-red-50 text-red-600 shadow-red-100'
                }`}>
                  
                  {modalStatus === 'loading' && (
                    <div className="relative flex items-center justify-center">
                      <Loader2 size={44} className="animate-spin" />
                      <div className="absolute inset-0 border-4 border-blue-200/30 rounded-full" />
                    </div>
                  )}

                  {modalStatus === 'success' && (
                    <div className="animate-check-pop">
                      <CheckCircle2 size={48} strokeWidth={2.5} />
                    </div>
                  )}

                  {modalStatus === 'error' && (
                    <div className="animate-error-wiggle">
                      <XCircle size={48} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              </div>
              
              {/* TEXT SECTION */}
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                {modalStatus === 'loading' && 'Authenticating'}
                {modalStatus === 'success' && 'Welcome Back'}
                {modalStatus === 'error' && 'Access Denied'}
              </h3>
              
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-10 px-4">
                {modalMessage}
              </p>

              {/* ACTION SECTION */}
              <div className="w-full">
                {modalStatus === 'error' && (
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); closeModal(); }}
                    className="group relative w-full py-4 bg-slate-900 text-white text-[11px] font-bold rounded-2xl transition-all hover:bg-black active:scale-95 shadow-xl shadow-slate-200"
                  >
                    <span className="relative z-10 tracking-[0.3em]">TRY AGAIN</span>
                  </button>
                )}

                {modalStatus === 'loading' && (
                  <div className="flex justify-center items-center gap-1.5 py-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                  </div>
                )}

                {modalStatus === 'success' && (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-[10px] tracking-[0.2em] animate-pulse">
                    INITIALIZING CORE...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
      
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-300/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-4xl overflow-hidden bg-white border border-white/40 backdrop-blur-sm">
        
        {/* LEFT PANEL */}
        <div className="lg:w-[38%] p-10 lg:p-12 bg-[#0F172A] relative overflow-hidden flex flex-col justify-between min-h-100">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-16">
              {/* Logo Container */}
              <div className="relative group">
                {/* Decorative glow behind the logo */}
                <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:bg-blue-500/30 transition-all duration-500" />
                
                <div className="relative bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
                  <img 
                    src="/lgu-iba-logo.jpg" 
                    alt="LGU Iba Logo"
                    className="w-12 h-12 object-contain filter drop-shadow-md rounded-full transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=IBA"; // Fallback if image fails
                    }}
                  />
                </div>
              </div>

              {/* Brand Text */}
              <div>
                <h1 className="text-xl font-black text-white tracking-tight leading-none">
                  LGU <span className="text-blue-500">Iba</span>
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="h-px w-3 bg-blue-500/50"></span>
                  <p className="text-[10px] text-blue-400 font-bold tracking-[0.25em] uppercase">
                    Core Admin
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white leading-[1.2] tracking-tight">
                Municipal <br /> 
                <span className="text-blue-500">Intelligence</span> Dashboard
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-70">
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
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                    ENTER DASHBOARD
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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