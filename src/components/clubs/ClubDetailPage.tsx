import React from 'react';
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_RECRUITMENT_POSTS } from '../../data/mockData';
import { ArrowLeft, Users, Calendar, Trophy, MapPin, Briefcase, ChevronRight, Image } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ClubDetailPageProps {
  clubId: string;
  onBack: () => void;
  onSelectEvent: (eventId: string) => void;
}

export const ClubDetailPage: React.FC<ClubDetailPageProps> = ({ clubId, onBack, onSelectEvent }) => {
  const club = MOCK_CLUBS.find(c => c.id === clubId);
  if (!club) return <div className="text-slate-400 text-center py-16">Club not found.</div>;

  const clubEvents = MOCK_EVENTS.filter(e => e.clubId === clubId);
  const upcomingEvents = clubEvents.filter(e => e.status === 'SCHEDULED');
  const pastEvents = clubEvents.filter(e => e.status === 'COMPLETED');
  const recruitments = MOCK_RECRUITMENT_POSTS.filter(r => r.clubId === clubId);

  return (
    <div className="space-y-8 pb-16">
      {/* Back + Banner */}
      <div className="relative rounded-3xl overflow-hidden h-56">
        <SafeImage src={club.banner} alt={club.name} fallbackCategory={club.category} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <button onClick={onBack} className="absolute top-4 left-4 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white flex items-center gap-1 text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <SafeImage src={club.logo} alt={club.shortName} fallbackCategory={club.category} className="w-16 h-16 rounded-2xl border-2 border-slate-700 object-cover" />
          <div>
            <h1 className="text-2xl font-extrabold text-white">{club.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">{club.category}</span>
              {club.recruitmentStatus === 'OPEN' && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">🟢 Hiring Open</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Club Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white">About</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{club.description}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Faculty Coordinator</div>
                <div className="text-sm text-white font-bold mt-1">{club.facultyCoordinator}</div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Student Coordinators</div>
                <div className="text-sm text-white font-bold mt-1">{club.studentCoordinators.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {club.achievements.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Achievements</h2>
              <div className="space-y-2">
                {club.achievements.map((ach, i) => (
                  <div key={i} className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs">{i + 1}</div>
                    <span className="text-sm text-white font-medium">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-400" /> Upcoming Events ({upcomingEvents.length})</h2>
            <div className="space-y-3">
              {upcomingEvents.length === 0 && <div className="text-xs text-slate-400 py-4 text-center">No upcoming events.</div>}
              {upcomingEvents.map(evt => (
                <button key={evt.id} onClick={() => onSelectEvent(evt.id)} className="w-full text-left bg-slate-900/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold text-purple-400">{evt.category}</span>
                    <h4 className="font-bold text-white text-sm">{evt.title}</h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{evt.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.venueRoom}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{evt.registeredCount}/{evt.capacity}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white">Past Events ({pastEvents.length})</h2>
              <div className="space-y-2">
                {pastEvents.map(evt => (
                  <div key={evt.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{evt.title}</span>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>{evt.date}</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{evt.registeredCount} attended</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {club.gallery.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2"><Image className="w-5 h-5 text-rose-400" /> Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {club.gallery.map((img, i) => (
                  <SafeImage key={i} src={img} alt={`${club.shortName} gallery ${i}`} fallbackCategory={club.category} className="w-full h-36 object-cover rounded-xl border border-slate-800" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white">Club Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Members</span><span className="text-sm font-bold text-white">{club.membersCount}</span></div>
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Upcoming Events</span><span className="text-sm font-bold text-purple-400">{upcomingEvents.length}</span></div>
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Past Events</span><span className="text-sm font-bold text-slate-300">{pastEvents.length}</span></div>
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Achievements</span><span className="text-sm font-bold text-amber-400">{club.achievements.length}</span></div>
              <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Recruitment</span><span className={`text-sm font-bold ${club.recruitmentStatus === 'OPEN' ? 'text-emerald-400' : 'text-slate-400'}`}>{club.recruitmentStatus}</span></div>
            </div>
          </div>

          {/* Recruitment Posts */}
          {recruitments.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-400" /> Open Positions</h3>
              <div className="space-y-3">
                {recruitments.map(rec => (
                  <div key={rec.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white text-sm">{rec.role}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{rec.description}</p>
                    <div className="flex flex-wrap gap-1">{rec.skills.map(s => <span key={s} className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{s}</span>)}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                      <span>Deadline: {rec.deadline}</span><span>{rec.applicantsCount} applicants</span>
                    </div>
                    <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl">Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
