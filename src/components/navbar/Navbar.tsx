import React, { useState } from 'react';
import type { UserRole } from '../../types';
import { 
  Building2, GraduationCap, Users, Sparkles, PlayCircle, Calendar,
  Database, Share2, DollarSign, Trophy, LogOut, Menu, X, ShieldCheck, Image as ImageIcon
} from 'lucide-react';

interface NavbarProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenDemoGuide: () => void;
  onOpenAIAgent: () => void;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
  role?: UserRole;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'portal', label: 'Discover', icon: <Building2 className="w-3.5 h-3.5" />, color: 'text-blue-400', activeColor: 'bg-blue-600' },
  { id: 'student', label: 'Student', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'text-indigo-400', activeColor: 'bg-indigo-600', role: 'student' },
  { id: 'clubs', label: 'Clubs', icon: <Users className="w-3.5 h-3.5" />, color: 'text-emerald-400', activeColor: 'bg-emerald-600', role: 'club_coordinator' },
  { id: 'faculty', label: 'Faculty', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'text-amber-400', activeColor: 'bg-amber-600', role: 'faculty' },
  { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-3.5 h-3.5" />, color: 'text-purple-400', activeColor: 'bg-purple-600' },
  { id: 'admin-finance', label: 'Finance', icon: <DollarSign className="w-3.5 h-3.5" />, color: 'text-amber-400', activeColor: 'bg-amber-600', role: 'admin' },
  { id: 'admin-sports', label: 'Sports', icon: <Trophy className="w-3.5 h-3.5" />, color: 'text-orange-400', activeColor: 'bg-orange-600', role: 'admin' },
  { id: 'admin-memory', label: 'Memory', icon: <Database className="w-3.5 h-3.5" />, color: 'text-rose-400', activeColor: 'bg-rose-600', role: 'admin' },
  { id: 'graph', label: 'Graph', icon: <Share2 className="w-3.5 h-3.5" />, color: 'text-cyan-400', activeColor: 'bg-cyan-600' },
];

const PROSPECT_STUDENT_NAV_ITEMS: NavItem[] = [
  { id: 'portal', label: 'College Campus Photos', icon: <ImageIcon className="w-3.5 h-3.5" />, color: 'text-blue-400', activeColor: 'bg-blue-600' },
  { id: 'clubs', label: 'Clubs', icon: <Users className="w-3.5 h-3.5" />, color: 'text-emerald-400', activeColor: 'bg-emerald-600' },
];

const ROLE_LABELS: Record<UserRole, string> = {
  public: 'Prospective Student',
  student: 'Student',
  club_coordinator: 'Coordinator',
  faculty: 'Faculty',
  admin: 'Administrator',
};

const ROLE_COLORS: Record<UserRole, string> = {
  public: 'bg-blue-500',
  student: 'bg-indigo-500',
  club_coordinator: 'bg-emerald-500',
  faculty: 'bg-amber-500',
  admin: 'bg-rose-500',
};

export const Navbar: React.FC<NavbarProps> = ({
  activeRole, setActiveRole, activeView, setActiveView, onOpenDemoGuide, onOpenAIAgent, onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prospective Student gets only College Campus Photos and Clubs tabs
  const currentNavItems = activeRole === 'public' ? PROSPECT_STUDENT_NAV_ITEMS : NAV_ITEMS;

  const handleNavClick = (item: NavItem) => {
    setActiveView(item.id);
    if (activeRole !== 'public' && item.role) {
      setActiveRole(item.role);
    } else if (item.id === 'portal' && activeRole === 'admin') {
      setActiveRole('public');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          {/* Left: Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-500/15">
              C
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-lg tracking-tight text-white">
                CAMPUS<span className="text-blue-400">OS</span>
              </span>
            </div>
          </div>

          {/* Center: Nav Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] p-1 rounded-2xl border border-white/[0.06]">
            {currentNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                    isActive
                      ? `${item.activeColor} text-white shadow-md`
                      : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAIAgent}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-md shadow-indigo-500/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Agent
            </button>

            <button
              onClick={onOpenDemoGuide}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 transition-all shadow-md shadow-rose-500/15 animate-pulse-glow"
            >
              <PlayCircle className="w-3.5 h-3.5" /> Demo
            </button>

            {/* Role Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className={`w-2 h-2 rounded-full ${ROLE_COLORS[activeRole]} animate-pulse`} />
              <span className="text-[11px] font-semibold text-slate-300">{ROLE_LABELS[activeRole]}</span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 space-y-1 animate-slide-up border-t border-white/[0.06] mt-2">
            {currentNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                    isActive
                      ? `${item.activeColor} text-white`
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 flex gap-2">
              <button onClick={() => { onOpenAIAgent(); setMobileMenuOpen(false); }} className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Agent
              </button>
              <button onClick={() => { onOpenDemoGuide(); setMobileMenuOpen(false); }} className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center gap-1.5">
                <PlayCircle className="w-3.5 h-3.5" /> Demo Tour
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
