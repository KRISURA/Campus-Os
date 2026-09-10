import React, { useState } from 'react';
import type { UserRole } from '../../types';
import { 
  Sparkles, Eye, EyeOff, ArrowRight, Building2, GraduationCap, 
  Users, ShieldCheck, BookOpen, Zap, Lock, Mail, ChevronRight
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const ROLE_CARDS: Array<{
  role: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  credentials: { email: string; password: string };
}> = [
  {
    role: 'public',
    label: 'Prospective Student',
    description: 'Explore campus, clubs, events, and admissions',
    icon: <Building2 className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    credentials: { email: 'visitor@campus.edu', password: 'demo' },
  },
  {
    role: 'student',
    label: 'Current Student',
    description: 'Dashboard, resources, clubs & registered events',
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    credentials: { email: 'priya.sharma@campus.edu', password: 'demo' },
  },
  {
    role: 'club_coordinator',
    label: 'Club Coordinator',
    description: 'Manage events, recruitment & club operations',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    credentials: { email: 'coordinator@campus.edu', password: 'demo' },
  },
  {
    role: 'faculty',
    label: 'Faculty / Staff',
    description: 'Oversee clubs, approve events & view reports',
    icon: <BookOpen className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    credentials: { email: 'faculty@campus.edu', password: 'demo' },
  },
  {
    role: 'admin',
    label: 'Administrator',
    description: 'Full access: financials, memory, knowledge graph',
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    credentials: { email: 'admin@campus.edu', password: 'demo' },
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleRoleSelect = (index: number) => {
    setSelectedRole(index);
    setEmail(ROLE_CARDS[index].credentials.email);
    setPassword(ROLE_CARDS[index].credentials.password);
    setLoginError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === null) {
      setLoginError('Please select a role to continue');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin(ROLE_CARDS[selectedRole].role);
    }, 800);
  };

  const handleQuickLogin = (role: UserRole) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin(role);
    }, 600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-grid-pattern" style={{ backgroundColor: '#050816' }}>
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large primary orb */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-float" 
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }} />
        {/* Secondary orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full animate-float-delayed" 
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)' }} />
        {/* Accent orb */}
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)' }} />
        
        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-2 h-2 rounded-full bg-indigo-500/30 blur-[1px]" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit-reverse">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/25 blur-[1px]" />
          </div>
        </div>

        {/* Grid fade overlay */}
        <div className="absolute inset-0 bg-radial-fade" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top Bar */}
        <header className="px-6 lg:px-12 py-6 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  CAMPUS<span className="text-blue-400">OS</span>
                </span>
                <span className="tag tag-indigo flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">Institutional Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </header>

        {/* Main Login Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 lg:py-0">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column — Hero */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                  One Platform.
                  <br />
                  <span className="gradient-text">Entire Campus.</span>
                </h1>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-md font-light">
                  AI-powered institutional intelligence connecting students, clubs, academics, 
                  and administration in a single living ecosystem.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 stagger-children">
                {[
                  { label: 'AI Event Agent', icon: <Zap className="w-3 h-3" /> },
                  { label: 'RAG Memory Engine', icon: <BookOpen className="w-3 h-3" /> },
                  { label: 'Knowledge Graph', icon: <Sparkles className="w-3 h-3" /> },
                  { label: 'Financial Analytics', icon: <ShieldCheck className="w-3 h-3" /> },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-indigo-400">{feat.icon}</span>
                    {feat.label}
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 pt-4">
                {[
                  { value: '30+', label: 'Active Clubs' },
                  { value: '100+', label: 'Annual Events' },
                  { value: '5K+', label: 'Students' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Login Card */}
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="glass-panel rounded-3xl p-8 space-y-7 relative overflow-hidden">
                {/* Decorative top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full gradient-bg opacity-60" />

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">Sign in to CampusOS</h2>
                  <p className="text-sm text-slate-400">Select your role and sign in to access the platform.</p>
                </div>

                {/* Role Selector Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Role</label>
                  <div className="grid grid-cols-1 gap-2">
                    {ROLE_CARDS.map((card, idx) => (
                      <button
                        key={card.role}
                        onClick={() => handleRoleSelect(idx)}
                        className={`group relative w-full text-left px-4 py-3 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                          selectedRole === idx
                            ? 'border-indigo-500/40 bg-indigo-500/[0.08]'
                            : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                        }`}
                        style={selectedRole === idx ? { boxShadow: `0 0 30px -10px ${card.glowColor}` } : undefined}
                      >
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                          style={{ boxShadow: `0 4px 15px -3px ${card.glowColor}` }}>
                          {card.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-white">{card.label}</div>
                          <div className="text-[11px] text-slate-500 truncate">{card.description}</div>
                        </div>
                        {selectedRole === idx ? (
                          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@campus.edu"
                        className="input-field pl-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="input-field pl-11 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="text-xs text-rose-400 bg-rose-500/10 px-4 py-2.5 rounded-xl border border-rose-500/20">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${
                      isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Access */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="text-[11px] text-slate-500 text-center mb-3 font-medium">Quick Demo Access</div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {ROLE_CARDS.map((card) => (
                      <button
                        key={card.role}
                        onClick={() => handleQuickLogin(card.role)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] transition-all flex items-center gap-1`}
                      >
                        {card.label.split(' ')[0]} <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="text-center mt-4 text-[11px] text-slate-600">
                This is a prototype. All credentials are pre-filled for demo purposes.
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Bar */}
        <footer className="px-6 lg:px-12 py-5 flex items-center justify-between text-[11px] text-slate-600 animate-fade-in">
          <span>© 2026 CampusOS • Built for Higher Education</span>
          <div className="hidden md:flex items-center gap-4">
            <span>RBAC Engine</span>
            <span>•</span>
            <span>RAG Document Store</span>
            <span>•</span>
            <span>AI Conflict Resolver</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
