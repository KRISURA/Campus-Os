import React, { useState } from 'react';
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_GALLERY, MOCK_FACILITIES } from '../../data/mockData';
import { 
  Building2, Search, Users, Calendar, Trophy, MapPin, Sparkles, ChevronRight,
  Zap, ArrowRight, Image, Star, GraduationCap, Award
} from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface PublicPortalProps {
  onSelectClub: (clubId: string) => void;
  onSelectEvent: (eventId: string) => void;
  onOpenAIAgent: () => void;
  viewMode?: 'all' | 'photos' | 'clubs';
  onNavigateToClubs?: () => void;
}

export const PublicPortal: React.FC<PublicPortalProps> = ({
  onSelectClub, onSelectEvent, onOpenAIAgent, viewMode = 'all', onNavigateToClubs
}) => {
  const [clubCategory, setClubCategory] = useState<string>('ALL');
  const [clubSearch, setClubSearch] = useState<string>('');
  const [eventCategory, setEventCategory] = useState<string>('ALL');
  const [galleryFilter, setGalleryFilter] = useState<string>('ALL');

  const filteredClubs = MOCK_CLUBS.filter(club => {
    const matchesCategory = clubCategory === 'ALL' || club.category.toUpperCase() === clubCategory.toUpperCase();
    const matchesSearch = club.name.toLowerCase().includes(clubSearch.toLowerCase()) ||
                          club.description.toLowerCase().includes(clubSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = MOCK_EVENTS.filter(e => e.status === 'SCHEDULED');
  const filteredEvents = upcomingEvents.filter(evt => {
    return eventCategory === 'ALL' || evt.category.toUpperCase() === eventCategory.toUpperCase();
  });

  const filteredGallery = MOCK_GALLERY.filter(g => {
    return galleryFilter === 'ALL' || g.category === galleryFilter;
  });

  const studentAchievements = [
    { title: "1st Prize — National Hackathon 2025", club: "Tech Club", icon: "🏆" },
    { title: "ICPC Asia West Regionals Finalists", club: "CP Club", icon: "🥇" },
    { title: "Top 5 — Kaggle Global Challenge", club: "AI Society", icon: "🤖" },
    { title: "State University Football Champions", club: "Football Club", icon: "⚽" },
    { title: "8 GSoC Selections in 2025", club: "OSS Club", icon: "💻" },
    { title: "Best Play — Inter-University Festival", club: "Drama Club", icon: "🎭" },
    { title: "National Dance Championship Winners", club: "Dance Club", icon: "💃" },
    { title: "National RoboWars Champions 2024", club: "Robotics Club", icon: "🤖" },
  ];

  // ─── SECTION RENDERERS ───────────────────────────────────────

  const renderHero = () => (
    <section className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-8 md:p-12 lg:p-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Institutional Operating System
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          One Intelligent Ecosystem for <span className="gradient-text">Higher Education</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed">
          Campus OS connects student activities, academic resources, club events, financial ledgers, and historical institutional memory into a single AI-powered platform.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button onClick={onOpenAIAgent} className="px-6 py-3.5 rounded-xl gradient-bg hover:opacity-95 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" /> Launch AI Operations Agent
          </button>
          {onNavigateToClubs ? (
            <button onClick={onNavigateToClubs} className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-all">
              Explore 30+ Clubs <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <a href="#clubs-section" className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-all">
              Explore 30+ Clubs <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800"><div className="text-3xl font-extrabold text-white">30+</div><div className="text-xs text-slate-400 font-medium">Active Student Clubs</div></div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800"><div className="text-3xl font-extrabold text-blue-400">100+</div><div className="text-xs text-slate-400 font-medium">Annual Campus Events</div></div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800"><div className="text-3xl font-extrabold text-purple-400">5,000+</div><div className="text-xs text-slate-400 font-medium">Active Students</div></div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800"><div className="text-3xl font-extrabold text-emerald-400">₹1.18Cr</div><div className="text-xs text-slate-400 font-medium">Indexed Financial Records</div></div>
      </div>
    </section>
  );

  const renderAchievements = () => (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Award className="w-6 h-6 text-amber-400" /> Student Achievements & Highlights</h2>
        <p className="text-sm text-slate-400">Recognition earned by our students on national and international stages.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {studentAchievements.map((ach, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800 glass-panel-hover space-y-2">
            <div className="text-2xl">{ach.icon}</div>
            <h4 className="font-bold text-white text-sm leading-tight">{ach.title}</h4>
            <div className="text-[11px] text-indigo-400 font-semibold">{ach.club}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderFacilities = () => (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Building2 className="w-6 h-6 text-blue-400" /> Explore Campus Facilities & Infrastructure</h2>
        <p className="text-sm text-slate-400">World-class infrastructure designed for modern research, learning, and student living.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_FACILITIES.map((fac) => (
          <div key={fac.id} className="group glass-panel rounded-2xl overflow-hidden border border-slate-800 glass-panel-hover">
            <div className="h-48 overflow-hidden relative">
              <SafeImage src={fac.imageUrl} alt={fac.title} fallbackCategory="Facility" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
              <span className="absolute top-3 left-3 bg-slate-900/90 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">{fac.type}</span>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{fac.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{fac.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">{fac.features.map(f => <span key={f} className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{f}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderLife = () => (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Star className="w-6 h-6 text-purple-400" /> Campus Life</h2>
        <p className="text-sm text-slate-400">Hackathons, Workshops, Cultural Festivals, Sports Tournaments & more.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Technical Clubs", count: MOCK_CLUBS.filter(c => c.category === "Technical").length, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Cultural Clubs", count: MOCK_CLUBS.filter(c => c.category === "Cultural").length, color: "text-pink-400", bg: "bg-pink-500/10" },
          { label: "Sports Clubs", count: MOCK_CLUBS.filter(c => c.category === "Sports").length, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Hackathons", count: MOCK_EVENTS.filter(e => e.category === "Hackathon").length, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Workshops", count: MOCK_EVENTS.filter(e => e.category === "Workshop").length, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Competitions", count: MOCK_EVENTS.filter(e => e.category === "Competition").length, color: "text-rose-400", bg: "bg-rose-500/10" },
        ].map((item, idx) => (
          <div key={idx} className={`${item.bg} border border-slate-800 p-4 rounded-2xl text-center space-y-1`}>
            <div className={`text-3xl font-extrabold ${item.color}`}>{item.count}</div>
            <div className="text-xs text-slate-300 font-semibold">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderClubs = () => (
    <section id="clubs-section" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Users className="w-6 h-6 text-indigo-400" /> Campus Student Clubs & Societies</h2>
          <p className="text-sm text-slate-400">Join student-run technical societies, performing arts groups, and sports councils.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search clubs..." value={clubSearch} onChange={(e) => setClubSearch(e.target.value)} className="bg-slate-900 border border-slate-800 text-white text-xs pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-indigo-500 w-48 lg:w-64" />
          </div>
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl flex-wrap">
            {['ALL', 'Technical', 'Cultural', 'Sports', 'Innovation', 'Literary', 'Social Work'].map((cat) => (
              <button key={cat} onClick={() => setClubCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${clubCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>{cat === 'Social Work' ? 'Social' : cat}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.slice(0, 12).map((club) => (
          <div key={club.id} className="glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col justify-between glass-panel-hover">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SafeImage src={club.logo} alt={club.name} fallbackCategory={club.category} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h3 className="font-bold text-white text-base">{club.shortName}</h3>
                    <span className="text-[11px] text-indigo-400 font-semibold">{club.category}</span>
                  </div>
                </div>
                {club.recruitmentStatus === 'OPEN' ? (
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">Hiring Open</span>
                ) : (
                  <span className="bg-slate-800 text-slate-400 text-[10px] font-medium px-2.5 py-1 rounded-full">Closed</span>
                )}
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{club.description}</p>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div><span className="text-slate-500 font-medium">Faculty:</span> {club.facultyCoordinator}</div>
                <div><span className="text-slate-500 font-medium">Student Leads:</span> {club.studentCoordinators.join(', ')}</div>
                <div><span className="text-slate-500 font-medium">Members:</span> {club.membersCount} Students</div>
              </div>
              {club.achievements.length > 0 && (
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/60 text-xs flex items-start gap-2">
                  <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] font-medium text-slate-300">{club.achievements[0]}</span>
                </div>
              )}
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">{club.upcomingEventsCount} Upcoming Events</span>
              <button onClick={() => onSelectClub(club.id)} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredClubs.length > 12 && (
        <div className="text-center"><span className="text-xs text-slate-400">Showing 12 of {filteredClubs.length} clubs. Use search and filters to find more.</span></div>
      )}
    </section>
  );

  const renderEvents = () => (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Calendar className="w-6 h-6 text-purple-400" /> Upcoming Campus Events</h2>
          <p className="text-sm text-slate-400">Workshops, Hackathons, Cultural Fests & Sports Trials</p>
        </div>
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl flex-wrap">
          {['ALL', 'Workshop', 'Hackathon', 'Competition', 'Cultural', 'Sports', 'Festival'].map((cat) => (
            <button key={cat} onClick={() => setEventCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${eventCategory === cat ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.slice(0, 9).map((evt) => (
          <div key={evt.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800 glass-panel-hover flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <SafeImage src={evt.bannerImage} alt={evt.title} fallbackCategory={evt.category} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-slate-900/90 text-purple-400 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">{evt.category}</span>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">{evt.clubName}</span>
                <h3 className="font-bold text-white text-base">{evt.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{evt.description}</p>
                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {evt.date} ({evt.startTime} - {evt.endTime})</div>
                  <div className="flex items-center gap-2 text-slate-400"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {evt.venue} ({evt.venueRoom})</div>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
              <span className="text-[11px] text-slate-400">{evt.registeredCount} / {evt.capacity} Registered</span>
              <button onClick={() => onSelectEvent(evt.id)} className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderGallery = () => (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Image className="w-6 h-6 text-rose-400" /> College Campus Photo Gallery</h2>
          <p className="text-sm text-slate-400">Moments captured across events, campus life, architectural highlights, and celebrations.</p>
        </div>
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl flex-wrap">
          {['ALL', 'Campus', 'Events', 'Sports', 'Cultural', 'Hackathon'].map((cat) => (
            <button key={cat} onClick={() => setGalleryFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${galleryFilter === cat ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGallery.map((item) => (
          <div key={item.id} className="group rounded-2xl overflow-hidden border border-slate-800 glass-panel-hover relative">
            <SafeImage src={item.imageUrl} alt={item.title} fallbackCategory={item.category} className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4">
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <div className="text-[10px] text-slate-400">{item.category} • {item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderCTA = () => (
    <section className="glass-panel rounded-3xl border border-blue-500/30 p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 space-y-4">
        <GraduationCap className="w-12 h-12 text-blue-400 mx-auto" />
        <h2 className="text-3xl font-extrabold text-white">Ready to Join Our Community?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">Applications open for 2027-28 academic year. Be part of a vibrant campus with 30+ clubs, 100+ annual events, and a top-ranked placement record.</p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <button className="px-8 py-3.5 rounded-xl gradient-bg hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all">Apply for Admissions</button>
          <button className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all">Download Brochure</button>
        </div>
      </div>
    </section>
  );

  // Prospective student viewing Clubs tab
  if (viewMode === 'clubs') {
    return (
      <div className="space-y-12 pb-16 animate-fade-in">
        {renderClubs()}
        {renderCTA()}
      </div>
    );
  }

  // Prospective student viewing College Campus Photos tab
  if (viewMode === 'photos') {
    return (
      <div className="space-y-12 pb-16 animate-fade-in">
        {renderHero()}
        {renderFacilities()}
        {renderGallery()}
        {renderLife()}
        {renderAchievements()}
        {renderEvents()}
        {renderCTA()}
      </div>
    );
  }

  // Default / All sections (for other roles when viewing Discover)
  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {renderHero()}
      {renderAchievements()}
      {renderFacilities()}
      {renderLife()}
      {renderClubs()}
      {renderEvents()}
      {renderGallery()}
      {renderCTA()}
    </div>
  );
};
