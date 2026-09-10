import React, { useState } from 'react';
import { CURRENT_STUDENT, MOCK_ACADEMIC_RESOURCES, MOCK_RECRUITMENT_POSTS, MOCK_CLUBS, MOCK_ANNOUNCEMENTS, MOCK_EVENTS } from '../../data/mockData';
import type { AcademicResource } from '../../types';
import { 
  GraduationCap, Search, BookOpen, Calendar, Briefcase, ExternalLink, Video,
  FileText, BookMarked, Users, Link2, Activity, Clock, Star, Megaphone
} from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface StudentPortalProps {
  onSelectEvent: (eventId: string) => void;
  registeredEvents: string[];
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ onSelectEvent, registeredEvents, onUnregister, onRegister: _onRegister }) => {
  const [academicSearch, setAcademicSearch] = useState<string>('DBMS normalization');
  const [activeSubject, setActiveSubject] = useState<string>('ALL');

  const allRegistered = [...new Set([...CURRENT_STUDENT.registeredEventIds, ...registeredEvents])];

  const filteredResources = MOCK_ACADEMIC_RESOURCES.filter(res => {
    const matchesSearch = !academicSearch.trim() ||
      res.title.toLowerCase().includes(academicSearch.toLowerCase()) ||
      res.topic.toLowerCase().includes(academicSearch.toLowerCase()) ||
      res.subject.toLowerCase().includes(academicSearch.toLowerCase());
    const matchesSubject = activeSubject === 'ALL' || res.subject === activeSubject;
    return matchesSearch && matchesSubject;
  });

  const getSourceIcon = (type: AcademicResource['type']) => {
    switch (type) {
      case 'YouTube': return <Video className="w-4 h-4 text-red-500" />;
      case 'LMS': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Moodle': return <BookMarked className="w-4 h-4 text-amber-400" />;
      case 'PYQ': return <FileText className="w-4 h-4 text-emerald-400" />;
      default: return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const myClubs = MOCK_CLUBS.filter(c => CURRENT_STUDENT.joinedClubs.includes(c.id));
  const recommendedClubs = MOCK_CLUBS.filter(c => !CURRENT_STUDENT.joinedClubs.includes(c.id) && c.category === 'Technical').slice(0, 3);

  return (
    <div className="space-y-10 pb-16">

      {/* Student Welcome Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
            <GraduationCap className="w-3.5 h-3.5" /> Student Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-white">{getGreeting()}, {CURRENT_STUDENT.name} 👋</h1>
          <p className="text-sm text-slate-400">{CURRENT_STUDENT.department} • Year {CURRENT_STUDENT.year} ({CURRENT_STUDENT.rollNumber})</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="text-center px-3 border-r border-slate-800"><div className="text-2xl font-bold text-white">{myClubs.length}</div><div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Joined Clubs</div></div>
          <div className="text-center px-3 border-r border-slate-800"><div className="text-2xl font-bold text-blue-400">{allRegistered.length}</div><div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Registered Events</div></div>
          <div className="text-center px-3"><div className="text-2xl font-bold text-emerald-400">3.9</div><div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">GPA Score</div></div>
        </div>
      </div>

      {/* My Clubs + Announcements Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Clubs */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2"><Users className="w-4 h-4 text-indigo-400" /> My Clubs</h3>
          <div className="space-y-3">
            {myClubs.map(club => (
              <div key={club.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <SafeImage src={club.logo} alt={club.shortName} fallbackCategory={club.category} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm truncate">{club.shortName}</h4>
                  <div className="text-[11px] text-slate-400">{club.membersCount} Members • {club.upcomingEventsCount} Events</div>
                </div>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold">{club.category}</span>
              </div>
            ))}
          </div>
          {/* Club Recommendations */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> Recommended for You</div>
            {recommendedClubs.map(club => (
              <div key={club.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SafeImage src={club.logo} alt={club.shortName} fallbackCategory={club.category} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-xs font-semibold text-white">{club.shortName}</span>
                </div>
                <button className="text-[10px] text-indigo-400 font-bold hover:underline">Join</button>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2"><Megaphone className="w-4 h-4 text-amber-400" /> Announcements</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {MOCK_ANNOUNCEMENTS.slice(0, 6).map(ann => (
              <div key={ann.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ann.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-400' : ann.priority === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-700 text-slate-300'
                  }`}>{ann.category}</span>
                  <span className="text-[10px] text-slate-500">{ann.date}</span>
                </div>
                <h4 className="font-bold text-white text-sm">{ann.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{ann.message}</p>
                <div className="text-[10px] text-slate-500">— {ann.author}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Links & Recent Activity */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2"><Link2 className="w-4 h-4 text-cyan-400" /> Important Links</h3>
            <div className="space-y-2">
              {[
                { label: "College LMS Portal", url: "#" },
                { label: "Moodle Platform", url: "#" },
                { label: "Exam Schedule", url: "#" },
                { label: "Placement Portal", url: "#" },
                { label: "Library Catalog", url: "#" },
                { label: "Fee Payment", url: "#" },
              ].map((link, i) => (
                <a key={i} href={link.url} className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-xs text-white font-medium">
                  {link.label} <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Recent Activity</h3>
            {[
              { action: "Registered for Technova Hackathon 2026", time: "2 hours ago" },
              { action: "AI Society posted new workshop", time: "5 hours ago" },
              { action: "Blood Donation Drive — 145 registered", time: "1 day ago" },
              { action: "New placement drive: Amazon & Microsoft", time: "2 days ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
                <div><span className="text-white font-medium">{item.action}</span><div className="text-[10px] text-slate-500">{item.time}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Student Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Academic Resource Discovery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Academic Resource Discovery Engine</h2>
                <span className="text-xs text-slate-400 font-medium">Unified Search across LMS, Moodle & YouTube</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">One single search experience instead of visiting separate college portals.</p>
            </div>
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input type="text" placeholder="Search notes, LMS modules, PYQs, Moodle labs (e.g. 'DBMS normalization')..." value={academicSearch} onChange={(e) => setAcademicSearch(e.target.value)} className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 text-white text-sm pl-12 pr-4 py-3 rounded-2xl focus:outline-none shadow-inner" />
              {academicSearch && <button onClick={() => setAcademicSearch('')} className="absolute right-4 top-3 text-xs text-slate-400 hover:text-white">Clear</button>}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {['ALL', 'DBMS', 'DSA', 'Computer Networks', 'Operating Systems', 'AI & ML', 'Software Engineering'].map((subj) => (
                <button key={subj} onClick={() => setActiveSubject(subj)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeSubject === subj ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}>{subj}</button>
              ))}
            </div>
            <div className="space-y-3 pt-2">
              {filteredResources.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No resources found for "{academicSearch}". Try searching for DBMS, DSA or Normalization.</div>
              ) : (
                filteredResources.map((res) => (
                  <div key={res.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(res.type)}
                        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">{res.sourceName}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{res.subject}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{res.title}</h4>
                      <p className="text-xs text-slate-400">{res.description}</p>
                      <div className="text-[11px] text-slate-500 pt-1">Author: {res.author} • Rating: ⭐ {res.rating}</div>
                    </div>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-all flex-shrink-0">
                      Access Resource <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Events & Opportunities */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-400" /> My Upcoming Events</h3>
            <div className="space-y-3">
              {MOCK_EVENTS.filter(e => allRegistered.includes(e.id)).map(evt => (
                <div key={evt.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">{evt.category}</span>
                    <span className="text-[11px] text-slate-400">{evt.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{evt.title}</h4>
                  <div className="text-xs text-slate-400">{evt.venue} ({evt.venueRoom}) • {evt.startTime}</div>
                  <div className="flex gap-2">
                    <button onClick={() => onSelectEvent(evt.id)} className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl">View Details</button>
                    <button onClick={() => onUnregister && onUnregister(evt.id)} className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-xs font-semibold text-rose-400 rounded-xl border border-rose-500/30">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-400" /> Opportunities & Recruitment</h3>
            <div className="space-y-3">
              {MOCK_RECRUITMENT_POSTS.slice(0, 4).map(post => (
                <div key={post.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{post.clubName}</span>
                  <h4 className="font-bold text-white text-sm">{post.role}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                    <span>Deadline: {post.deadline}</span>
                    <button className="text-emerald-400 font-bold hover:underline">Apply Now</button>
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
