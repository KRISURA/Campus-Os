import React, { useState } from 'react';
import { MOCK_EVENTS, MOCK_CLUBS } from '../../data/mockData';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, AlertTriangle, MapPin, Clock, Users } from 'lucide-react';

interface CampusCalendarProps {
  onSelectEvent: (eventId: string) => void;
}

export const CampusCalendar: React.FC<CampusCalendarProps> = ({ onSelectEvent }) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedClub, setSelectedClub] = useState<string>('ALL');
  const [selectedVenue, setSelectedVenue] = useState<string>('ALL');
  const [currentMonth, setCurrentMonth] = useState(9); // October = 9 (0-indexed)
  const [currentYear] = useState(2026);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const events = MOCK_EVENTS.filter(e => {
    const catMatch = selectedCategory === 'ALL' || e.category.toUpperCase() === selectedCategory.toUpperCase();
    const clubMatch = selectedClub === 'ALL' || e.clubId === selectedClub;
    const venueMatch = selectedVenue === 'ALL' || e.venue === selectedVenue;
    return catMatch && clubMatch && venueMatch;
  });

  const venues = [...new Set(MOCK_EVENTS.map(e => e.venue))];
  const clubsWithEvents = [...new Set(MOCK_EVENTS.map(e => e.clubId))].map(id => MOCK_CLUBS.find(c => c.id === id)).filter(Boolean);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dateStr);
    const hasConflict = dayEvents.length >= 2;
    return { dayNum, dateStr, dayEvents, hasConflict };
  });

  // Get current week's dates (week containing the 15th for demo purposes)
  const getWeekDates = () => {
    const mid = 15;
    const start = mid - new Date(currentYear, currentMonth, mid).getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const day = start + i;
      if (day < 1 || day > daysInMonth) return null;
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      return { dayNum: day, dateStr, dayEvents, hasConflict: dayEvents.length >= 2 };
    });
  };

  const today = new Date();
  const todayStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  const todayEvents = events.filter(e => e.date === todayStr);

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="space-y-6 pb-16">
      {/* Calendar Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><CalendarIcon className="w-6 h-6 text-purple-400" /> Centralized Institutional Calendar</h1>
          <p className="text-xs text-slate-400 mt-1">Cross-departmental schedule, venue conflict monitor & event locator.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {['month', 'week', 'day'].map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode as any)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${viewMode === mode ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>{mode}</button>
            ))}
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-slate-900 border border-slate-800 text-white text-xs px-3 py-2 rounded-xl focus:outline-none">
            <option value="ALL">All Categories</option>
            <option value="Workshop">Workshops</option><option value="Hackathon">Hackathons</option>
            <option value="Festival">Festivals</option><option value="Sports">Sports</option>
            <option value="Competition">Competitions</option><option value="Cultural">Cultural</option>
          </select>
          <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className="bg-slate-900 border border-slate-800 text-white text-xs px-3 py-2 rounded-xl focus:outline-none">
            <option value="ALL">All Clubs</option>
            {clubsWithEvents.map(c => c && <option key={c.id} value={c.id}>{c.shortName}</option>)}
          </select>
          <select value={selectedVenue} onChange={(e) => setSelectedVenue(e.target.value)} className="bg-slate-900 border border-slate-800 text-white text-xs px-3 py-2 rounded-xl focus:outline-none">
            <option value="ALL">All Venues</option>
            {venues.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* MONTH VIEW */}
      {viewMode === 'month' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentMonth(m => m > 0 ? m - 1 : 11)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-lg font-bold text-white">{monthNames[currentMonth]} {currentYear}</span>
              <button onClick={() => setCurrentMonth(m => m < 11 ? m + 1 : 0)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Workshop</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Hackathon</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Sports</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> ⚠️ Conflict</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-2 border-b border-slate-800">
            {weekDays.map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className="min-h-[100px]"></div>)}
            {calendarDays.map((day) => (
              <div key={day.dateStr} className={`min-h-[100px] p-2 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                day.hasConflict ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500' : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span className={day.dateStr === todayStr ? 'text-blue-400 font-extrabold' : 'text-slate-300'}>{day.dayNum}</span>
                  {day.hasConflict && <span className="text-[9px] font-bold text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5"><AlertTriangle className="w-3 h-3" /> Conflict</span>}
                </div>
                <div className="space-y-1 my-1">
                  {day.dayEvents.slice(0, 2).map((evt) => (
                    <button key={evt.id} onClick={() => onSelectEvent(evt.id)} className="w-full text-left truncate text-[10px] font-semibold px-2 py-1 rounded-lg bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50 transition-colors">
                      {evt.startTime} {evt.title}
                    </button>
                  ))}
                  {day.dayEvents.length > 2 && <div className="text-[9px] text-slate-500 px-2">+{day.dayEvents.length - 2} more</div>}
                </div>
                <div className="text-[9px] text-slate-500">{day.dayEvents.length > 0 ? `${day.dayEvents.length} Event(s)` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {viewMode === 'week' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-lg font-bold text-white">Week View — {monthNames[currentMonth]} {currentYear}</div>
          <div className="grid grid-cols-7 gap-3">
            {getWeekDates().map((day, i) => (
              <div key={i} className={`rounded-2xl border p-4 min-h-[300px] space-y-3 ${
                day?.hasConflict ? 'bg-rose-950/20 border-rose-500/40' : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-bold">{weekDays[i]}</div>
                  <div className="text-lg font-extrabold text-white">{day?.dayNum || '-'}</div>
                </div>
                <div className="space-y-2">
                  {day?.dayEvents.map(evt => (
                    <button key={evt.id} onClick={() => onSelectEvent(evt.id)} className="w-full text-left p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-all space-y-1">
                      <div className="text-[10px] text-indigo-400 font-bold">{evt.startTime}–{evt.endTime}</div>
                      <div className="text-xs font-bold text-white truncate">{evt.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.venueRoom}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {viewMode === 'day' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-lg font-bold text-white">Today's Schedule — {todayStr}</div>
          {todayEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">No events scheduled for today. Switch to month or week view to browse other dates.</div>
          ) : (
            <div className="space-y-4">
              {todayEvents.map(evt => (
                <button key={evt.id} onClick={() => onSelectEvent(evt.id)} className="w-full text-left bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-6">
                  <div className="text-center flex-shrink-0 bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/30">
                    <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                    <div className="text-sm font-bold text-white">{evt.startTime}</div>
                    <div className="text-[10px] text-slate-400">{evt.endTime}</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">{evt.category}</span>
                      <span className="text-xs text-slate-400">{evt.clubName}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{evt.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{evt.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-400" />{evt.venue} ({evt.venueRoom})</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-emerald-400" />{evt.registeredCount}/{evt.capacity}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
