import { ReactNode } from 'react';

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
  gradient: string;
}

export function InfoCard({ icon, title, description, children, gradient }: InfoCardProps) {
  return (
    <div className="relative group">
      {/* React-inspired animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/20 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      {/* Main card */}
      <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:border-blue-500/30">
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header with animated icon */}
          <div className="flex items-center mb-6">
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              {icon ? (
                <span className="text-white text-xl">{icon}</span>
              ) : (
                <div className="w-6 h-6 bg-white/20 rounded-md"></div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300">{title}</h3>
              <p className="text-slate-400 text-sm mt-1">{description}</p>
            </div>
          </div>
          
          {/* Content area with improved styling */}
          <div className="text-left">
            {children}
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className={`h-1 bg-gradient-to-r ${gradient} opacity-60`}></div>
      </div>
    </div>
  );
}
