import { 
  LayoutDashboard, 
  Search, 
  BarChart2, 
  BrainCircuit, 
  FileDown, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  
  const menuItems = [
    { 
      id: 'overview', 
      name: 'Dashboard Overview', 
      icon: <LayoutDashboard size={20} />,
      description: 'System-wide summary'
    },
    { 
      id: 'service', 
      name: 'Service Performance', 
      icon: <BarChart2 size={20} />,
      description: 'Department rankings'
    },
    { 
      id: 'ai', 
      name: 'AI Insights', 
      icon: <BrainCircuit size={20} />,
      description: 'BERT-driven recommendations'
    },
    { 
      id: 'reports', 
      name: 'Reports', 
      icon: <FileDown size={20} />,
      description: 'Export and documentation'
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-50">
      
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex flex-col items-center text-center group">
          
          {/* LOGO CONTAINER - Perfectly Circular */}
          <div className="relative mb-4">
            {/* Background Glow Effect */}
            <div className="absolute -inset-2 bg-blue-600/20 rounded-full blur-xl group-hover:bg-blue-600/30 transition duration-500 opacity-70"></div>
            
            {/* The Image Circle */}
            <div className="relative w-24 h-24 rounded-full border-2 border-slate-700 p-1 bg-slate-900 group-hover:border-blue-500 transition-colors duration-500 overflow-hidden">
              <img 
                src="/lgu-iba-logo.jpg" 
                alt="LGU Iba Logo" 
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* TEXT SECTION */}
          <div className="space-y-1.5">
            <h1 className="text-white font-black text-sm leading-tight tracking-[0.05em] uppercase">
              Municipality of Iba
            </h1>
            
            <div className="flex flex-col">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.15em] leading-tight">
                Local Government Service Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}>
                {item.icon}
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className={`text-[10px] ${activeTab === item.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {item.description}
                </p>
              </div>
            </div>
            {activeTab === item.id && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>

      {/* User / Footer Section */}
      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <span className="text-xs font-bold text-blue-400">AD</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@gov.ph</p>
          </div>
        </div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;