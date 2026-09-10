import React, { useState } from 'react';
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_RECRUITMENT_POSTS, MOCK_ANNOUNCEMENTS } from '../../data/mockData';
import { 
  Users, Sparkles, Calendar, Briefcase, TrendingUp, MapPin, Edit, Trash2, Megaphone, Plus, BarChart3, Image
} from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ClubManagementProps {
  onOpenAIAgent: () => void;
}

export const ClubManagement: React.FC<ClubManagementProps> = ({ onOpenAIAgent }) => {
  const [selectedClubId, setSelectedClubId] = useState(MOCK_CLUBS[0].id);
  const club = MOCK_CLUBS.find(c => c.id === selectedClubId) || MOCK_CLUBS[0];
  const clubEvents = MOCK_EVENTS.filter(e => e.clubId === club.id);
  const recruitment = MOCK_RECRUITMENT_POSTS.filter(r => r.clubId === club.id);
  const announcements = MOCK_ANNOUNCEMENTS.filter(a => a.author === club.shortName);

  return (
    <div className="space-y-8 pb-16">

      {/* Club Selector & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Briefcase className="w-6 h-6 text-indigo-400" /> Club Management Hub</h1>
          <p className="text-sm text-slate-400">Manage events, recruitments, members, and announcements.</p>
        </div>
        <select 
          value={selectedClubId} 
          onChange={(e) => setSelectedClubId(e.target.value)} 
          className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 shadow-inner"
        >
          {MOCK_CLUBS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Club Banner Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800">
        <div className="h-48 overflow-hidden relative">
          <SafeImage src={club.banner} alt={club.name} fallbackCategory={club.category} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className="p-6 md:p-8 -mt-16 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <SafeImage src={club.logo} alt={club.name} fallbackCategory={club.category} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-xl" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">{club.name}</h2>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${club.recruitmentStatus === 'OPEN' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                  RECRUITMENT: {club.recruitmentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">Coordinator Dashboard • Led by {club.facultyCoordinator}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all">
              <Image className="w-4 h-4 text-slate-400" /> Upload Photos
            </button>
            <button onClick={onOpenAIAgent} className="px-5 py-2.5 rounded-xl gradient-bg hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all">
              <Sparkles className="w-4 h-4 text-amber-300" /> Create Event with AI
            </button>
          </div>
        </div>
      </div>

      {/* Club Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Active Members</div>
          <div className="text-3xl font-extrabold text-white mt-1">{club.membersCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +14% this semester</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Events Managed</div>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">{clubEvents.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">{clubEvents.filter(e=>e.status==='SCHEDULED').length} Upcoming</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Registrations</div>
          <div className="text-3xl font-extrabold text-blue-400 mt-1">{clubEvents.reduce((acc, e) => acc + e.registeredCount, 0)}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> High Engagement</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Open Positions</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{recruitment.reduce((acc, r) => acc + r.openPositions, 0)}</div>
          <div className="text-[11px] text-amber-400 mt-1">{recruitment.reduce((acc, r) => acc + r.applicantsCount, 0)} Total Applicants</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Events Managed by Club */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" /> Event Management</h3>
              <button onClick={onOpenAIAgent} className="px-3 py-1.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 font-bold text-xs rounded-lg transition-all flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add via AI
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {clubEvents.length === 0 && <div className="text-center py-6 text-slate-400 text-sm">No events found for this club.</div>}
              {clubEvents.map(evt => (
                <div key={evt.id} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${evt.status === 'SCHEDULED' ? 'bg-emerald-500/10 text-emerald-400' : evt.status === 'COMPLETED' ? 'bg-slate-800 text-slate-400' : 'bg-rose-500/10 text-rose-400'}`}>{evt.status}</span>
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">{evt.category}</span>
                    </div>
                    <h4 className="font-bold text-white text-base">{evt.title}</h4>
                    <div className="text-xs text-slate-400 flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {evt.date} @ {evt.startTime}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {evt.venueRoom}</span>
                    </div>
                    {evt.status === 'SCHEDULED' && (
                      <div className="w-full max-w-xs mt-2 space-y-1 text-[10px] text-slate-500 font-medium flex items-center gap-2">
                        <span>Registrations: {evt.registeredCount}/{evt.capacity}</span>
                        <div className="h-1.5 bg-slate-800 rounded-full flex-1 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(evt.registeredCount / evt.capacity) * 100}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center gap-2 w-full md:w-auto mt-2 md:mt-0 opacity-100 md:opacity-30 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 md:w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold rounded-xl flex justify-center items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-400" /> Attendees</button>
                    <div className="flex flex-1 md:w-full gap-2">
                      <button className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold rounded-xl flex justify-center items-center"><Edit className="w-3.5 h-3.5 text-amber-400" /></button>
                      <button className="flex-1 px-3 py-2 bg-rose-950/30 hover:bg-rose-900/50 text-xs text-rose-400 font-semibold border border-rose-500/30 rounded-xl flex justify-center items-center"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Event Analytics Mini-Dashboard */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-400" /> Event Analytics</h3>
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-sm">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              Registration trends chart will be displayed here based on event data.
            </div>
          </div>
        </div>

        {/* Right Col: Recruitment & Announcements */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-400" /> Recruitment Drives</h3>
              <button className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg"><Plus className="w-4 h-4 text-emerald-400" /></button>
            </div>

            <div className="space-y-3">
              {recruitment.length === 0 && <div className="text-xs text-slate-400 text-center py-4">No active recruitment drives.</div>}
              {recruitment.map(post => (
                <div key={post.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">{post.role}</h4>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full">{post.openPositions} Openings</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-400">{post.applicantsCount} Applicants</span>
                    <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-lg flex items-center gap-2"><Megaphone className="w-5 h-5 text-amber-400" /> Announcements</h3>
              <button className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg"><Plus className="w-4 h-4 text-amber-400" /></button>
            </div>

            <div className="space-y-3">
              {announcements.length === 0 && <div className="text-xs text-slate-400 text-center py-4">No announcements published.</div>}
              {announcements.map(ann => (
                <div key={ann.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ann.priority === 'HIGH' ? 'bg-rose-500' : 'bg-amber-400'}`}></div>
                  <div>
                    <div className="text-xs font-bold text-white">{ann.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{ann.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
