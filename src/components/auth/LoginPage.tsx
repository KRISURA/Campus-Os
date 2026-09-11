import React, { useState } from 'react';
import type { UserRole } from '../../types';
import {
  Sparkles, Eye, EyeOff, ArrowRight, Building2, GraduationCap,
  Users, ShieldCheck, BookOpen, Zap, Lock, Mail, ChevronRight, UserPlus
} from 'lucide-react';
import { loginWithEmail, registerWithEmail, detectRoleFromEmail } from '../../services/authService';

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
  demoEmail: string;
}> = [
  {
    role: 'public',
    label: 'Prospective Student',
    description: 'Explore campus, clubs, events, and admissions',
    icon: <Building2 className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    demoEmail: 'visitor@campus.edu',
  },
  {
    role: 'student',
    label: 'Current Student',
    description: 'Dashboard, resources, clubs & registered events',
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-violet-500',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    demoEmail: 'student@campus.edu',
  },
  {
    role: 'club_coordinator',
    label: 'Club Coordinator',
    description: 'Manage events, recruitment & club operations',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    demoEmail: 'coordinator@campus.edu',
  },
  {
    role: 'faculty',
    label: 'Faculty / Staff',
    description: 'Oversee clubs, approve events & view reports',
    icon: <BookOpen className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    demoEmail: 'faculty@campus.edu',
  },
  {
    role: 'admin',
    label: 'Administrator',
    description: 'Full access: financials, memory, knowledge graph',
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: 'from-rose-500 to-pink-500',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    demoEmail: 'admin@campus.edu',
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    setLoginError('');
    try {
      if (mode === 'login') {
        const { role } = await loginWithEmail(email, password);
        onLogin(role);
      } else {
        const { role } = await registerWithEmail(email, password);
        onLogin(role);
      }
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setLoginError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        setLoginError('This email is already registered. Please sign in.');
      } else if (error.code === 'auth/weak-password') {
        setLoginError('Password must be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Please enter a valid email address.');
      } else {
        setLoginError(error.message ?? 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleCardClick = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setLoginError('');
  };

  const detectedRole = email ? detectRoleFromEmail(email) : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-grid-pattern" style={{ backgroundColor: '#050816' }}>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full animate-float"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full animate-float-delayed"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)' }} />
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

        {/* Main Content */}
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

              {/* Role hint cards */}
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Quick Fill — Click a role to auto-fill email</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {ROLE_CARDS.map((card) => (
                    <button
                      key={card.role}
                      type="button"
                      onClick={() => handleRoleCardClick(card.demoEmail)}
                      className={`group w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                        detectedRole === card.role
                          ? 'border-indigo-500/40 bg-indigo-500/[0.08]'
                          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-white">{card.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{card.demoEmail}</div>
                      </div>
                      {detectedRole === card.role && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column — Auth Card */}
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="glass-panel rounded-3xl p-8 space-y-6 relative overflow-hidden">
                {/* Decorative top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full gradient-bg opacity-60" />

                {/* Mode Toggle */}
                <div className="flex items-center bg-white/[0.03] rounded-2xl p-1 border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setLoginError(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setLoginError(''); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      mode === 'register' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">
                    {mode === 'login' ? 'Welcome back!' : 'Join CampusOS'}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {mode === 'login'
                      ? 'Sign in to your institution account.'
                      : 'Create your account to get started.'}
                  </p>
                </div>

                {/* Detected Role Badge */}
                {detectedRole && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-xs text-indigo-300 font-medium">
                      Role detected: <span className="font-bold capitalize">{detectedRole.replace('_', ' ')}</span>
                    </span>
                  </div>
                )}

                {/* Auth Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setLoginError(''); }}
                        placeholder="your.email@campus.edu"
                        className="input-field pr-4"
                        style={{ paddingLeft: '2.75rem' }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                        placeholder="••••••••"
                        className="input-field pr-11"
                        style={{ paddingLeft: '2.75rem' }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {mode === 'register' && (
                      <p className="text-[10px] text-slate-600">Minimum 6 characters required.</p>
                    )}
                  </div>

                  {loginError && (
                    <div className="text-xs text-rose-400 bg-rose-500/10 px-4 py-2.5 rounded-xl border border-rose-500/20">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                      </>
                    ) : (
                      <>
                        {mode === 'login'
                          ? <><ArrowRight className="w-4 h-4" /> Sign In</>
                          : <><UserPlus className="w-4 h-4" /> Create Account</>
                        }
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Demo Access */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="text-[11px] text-slate-500 text-center mb-3 font-medium">Quick Demo Access</div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {ROLE_CARDS.map((card) => (
                      <button
                        key={card.role}
                        type="button"
                        onClick={() => handleRoleCardClick(card.demoEmail)}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] transition-all flex items-center gap-1"
                      >
                        {card.label.split(' ')[0]} <ChevronRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 text-[11px] text-slate-600">
                Secured by Firebase Authentication • CampusOS v2.0
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
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
