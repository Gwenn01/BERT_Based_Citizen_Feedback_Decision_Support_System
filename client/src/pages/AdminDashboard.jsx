import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminOverview from '../components/AdminOverview'; // Imported your new component
import FeedbackAnalysis from '../components/FeedbackAnalysis';
import ServicePerformance from '../components/ServicePerformance';
import AIInsights from '../components/AiInsights'
import Reports from '../components/Reports';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Logic to switch between the 5 sections
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': 
        return <AdminOverview />; 
      case 'analysis': 
        return <FeedbackAnalysis />;
      case 'service': 
        return <ServicePerformance />;
      case 'ai': 
        return <AIInsights />;
      case 'reports': 
        return <Reports />;
      default: 
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-72 p-8 transition-all duration-300">

        <section key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderContent()}
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;