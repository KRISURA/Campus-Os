import React, { useState } from 'react';
import { MOCK_CLUBS, MOCK_EVENTS } from '../../data/mockData';
import { 
  CheckCircle2, XCircle, Clock, Users, Calendar, AlertTriangle, 
  ShieldCheck, ChevronRight, MessageSquare, Sparkles,
  Check, Send
} from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ApprovalItem {
  id: string;
  title: string;
  clubName: string;
  type: 'EVENT' | 'BUDGET' | 'VENUE';
  submittedDate: string;
  details: string;
  status: 'PENDING' | 'APPROVED' | 'REVISED';
  budget?: string;
  venue?: string;
}

export const FacultyDashboard: React.FC<{
  onSelectEvent?: (eventId: string) => void;
  onSelectClub?: (clubId: string) => void;
}> = ({ onSelectEvent, onSelectClub }) => {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: 'app-1',
      title: 'Technova Hackathon 2026 — 36hr Overnight Permission',
      clubName: 'Tech Club & Developers Guild',
      type: 'EVENT',
      submittedDate: '2 hours ago',
      details: 'Requesting permission for 200 participants across Block A Labs with overnight security & generator backup.',
      status: 'PENDING',
      budget: '₹2,00,000',
      venue: 'Block A, Room 301 & Lab 4'
    },
    {
      id: 'app-2',
      title: 'Acoustic Audio & 125 kVA Generator Deployment',
      clubName: 'Music & Performing Arts Club',
      type: 'BUDGET',
      submittedDate: 'Yesterday',
      details: 'Isolated diesel generator requisition following historical tripping recommendations.',
      status: 'PENDING',
      budget: '₹45,000',
      venue: 'Main Auditorium'
    },
    {
      id: 'app-3',
      title: 'GPU Server Cluster Allocation for AI Workshop',
      clubName: 'AI & Machine Learning Society',
      type: 'VENUE',
      submittedDate: '2 days ago',
      details: 'Dedicated access to 16x RTX 4090 lab nodes for student model fine-tuning.',
      status: 'PENDING',
      venue: 'CS High Performance Lab'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleApprove = (id: string, title: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'APPROVED' } : a));
    setNotification(`Approved: "${title}" sign-off has been dispatched to Registrar.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReject = (id: string, title: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'REVISED' } : a));
    setNotification(`Revision requested for: "${title}".`);
    setTimeout(() => setNotification(null), 4000);
  };

  const mentoredClubs = MOCK_CLUBS.filter(c => 
    c.facultyCoordinator.includes('Rajesh Sharma') || c.category === 'Technical'
  ).slice(0, 3);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-amber-500/20">
            RS
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold border border-amber-500/20 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Faculty Oversight & Mentorship
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Dr. Rajesh Sharma
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Head of Computer Science & Engineering • Faculty Advisor to Tech Societies
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-3 gap-3 self-stretch md:self-auto bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="text-center px-2">
            <div className="text-xl font-extrabold text-amber-400">
              {approvals.filter(a => a.status === 'PENDING').length}
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Pending</div>
          </div>
          <div className="w-px h-8 bg-slate-800 self-center"></div>
          <div className="text-center px-2">
            <div className="text-xl font-extrabold text-indigo-400">{mentoredClubs.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Clubs</div>
          </div>
          <div className="w-px h-8 bg-slate-800 self-center"></div>
          <div className="text-center px-2">
            <div className="text-xl font-extrabold text-emerald-400">₹63.7L</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Audited</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Approvals & Event Oversight */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Approval Requests Queue */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Pending Approval Requests</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {approvals.filter(a => a.status === 'PENDING').length} awaiting action
              </span>
            </div>

            <div className="space-y-3">
              {approvals.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl border transition-all ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-950/20 border-emerald-800/40 opacity-75'
                      : item.status === 'REVISED'
                      ? 'bg-rose-950/20 border-rose-800/40 opacity-75'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.type === 'EVENT' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        item.type === 'BUDGET' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-indigo-400">{item.clubName}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{item.submittedDate}</span>
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.details}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 py-2 border-t border-slate-800/80 mb-3">
                    {item.venue && <span>📍 <strong>Venue:</strong> {item.venue}</span>}
                    {item.budget && <span>💰 <strong>Budget:</strong> {item.budget}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {item.status === 'PENDING' ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <button
                          onClick={() => handleReject(item.id, item.title)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Request Revision
                        </button>
                        <button
                          onClick={() => handleApprove(item.id, item.title)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Sign Off
                        </button>
                      </div>
                    ) : item.status === 'APPROVED' ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Signed & Approved
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Revision Sent to Leads
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supervised Events Timeline */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Upcoming Supervised Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_EVENTS.slice(0, 4).map(evt => (
                <div key={evt.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">{evt.clubName}</span>
                      <span className="text-[10px] text-slate-400">{evt.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">{evt.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{evt.description}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Reg: {evt.registeredCount}/{evt.capacity}</span>
                    <button 
                      onClick={() => onSelectEvent && onSelectEvent(evt.id)}
                      className="text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      Dossier →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Mentored Clubs & Quick Actions */}
        <div className="space-y-6">
          
          {/* Mentored Clubs */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> Mentored Student Societies
            </h2>
            <div className="space-y-3">
              {mentoredClubs.map(club => (
                <div key={club.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <SafeImage 
                    src={club.logo} 
                    alt={club.name} 
                    fallbackCategory={club.category} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{club.shortName}</h4>
                    <div className="text-[11px] text-slate-400">
                      Leads: {club.studentCoordinators[0]}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
                      {club.membersCount} Members • {club.upcomingEventsCount} Events
                    </div>
                  </div>
                  <button 
                    onClick={() => onSelectClub && onSelectClub(club.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Compliance Notice */}
          <div className="glass-panel p-6 rounded-3xl border border-blue-900/40 bg-gradient-to-br from-blue-950/20 to-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> AI Safety & Conflict Checks
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All student event proposals have automatically undergone AI room-conflict, acoustic resonance, and Wi-Fi load tests before reaching your queue.
            </p>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 font-mono">
              ✓ 0 Venue Overlaps Detected
            </div>
          </div>

          {/* Quick Notice Dispatch */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Broadcast to Club Leads
            </h3>
            <textarea 
              placeholder="Send an urgent announcement or guidelines to all club leads..." 
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button 
              onClick={() => {
                setNotification('Broadcast dispatched to all student coordinators.');
                setTimeout(() => setNotification(null), 3000);
              }}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Advisory
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
