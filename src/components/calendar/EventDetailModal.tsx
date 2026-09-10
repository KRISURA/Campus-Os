import React from 'react';
import type { CampusEvent } from '../../types';
import { X, Calendar, MapPin, Users, Clock, CheckCircle2, Tag, Zap, AlertCircle } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface EventDetailModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  isRegistered: boolean;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event, isOpen, onClose, isRegistered, onRegister, onUnregister
}) => {
  if (!isOpen || !event) return null;

  const capacityPercent = Math.round((event.registeredCount / event.capacity) * 100);
  const isFull = event.registeredCount >= event.capacity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Banner */}
        <div className="h-48 relative overflow-hidden">
          <SafeImage src={event.bannerImage} alt={event.title} fallbackCategory={event.category} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-purple-500/30">{event.category}</span>
            <h2 className="text-2xl font-extrabold text-white mt-2">{event.title}</h2>
            <div className="text-xs text-slate-300 mt-1">{event.clubName}</div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Event Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
              <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">{event.date}</div>
              <div className="text-[10px] text-slate-400">Date</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">{event.startTime} – {event.endTime}</div>
              <div className="text-[10px] text-slate-400">Time</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
              <MapPin className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">{event.venueRoom}</div>
              <div className="text-[10px] text-slate-400">{event.venue}</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
              <Users className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">{event.registeredCount}/{event.capacity}</div>
              <div className="text-[10px] text-slate-400">Registered</div>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Registration Capacity</span>
              <span className={`font-bold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>{capacityPercent}% Filled</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : capacityPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(capacityPercent, 100)}%` }}></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">About This Event</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1"><Zap className="w-4 h-4 text-amber-400" /> Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {event.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">{h}</span>
                ))}
              </div>
            </div>
          )}

          {/* Resources Needed */}
          {event.resourcesNeeded.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1"><Tag className="w-4 h-4 text-indigo-400" /> Resources Required</h3>
              <div className="flex flex-wrap gap-2">
                {event.resourcesNeeded.map((r, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* Target Audience */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center gap-3 text-xs">
            <Users className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 font-medium">Target Audience: </span>
              <span className="text-white font-bold">{event.targetAudience}</span>
            </div>
          </div>

          {/* Status */}
          <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
            event.status === 'CANCELLED' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
            event.status === 'COMPLETED' ? 'bg-slate-800 border-slate-700 text-slate-400' :
            'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            {event.status === 'SCHEDULED' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold">Status: {event.status}</span>
          </div>

          {/* Registration Action */}
          {event.status === 'SCHEDULED' && (
            <div className="flex items-center gap-3">
              {isRegistered ? (
                <>
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> You are registered for this event
                  </div>
                  <button onClick={() => onUnregister(event.id)} className="px-5 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 font-bold text-xs rounded-xl border border-rose-500/30 transition-all">
                    Cancel Registration
                  </button>
                </>
              ) : (
                <button onClick={() => onRegister(event.id)} disabled={isFull} className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isFull ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                }`}>
                  {isFull ? 'Registration Full' : '✓ Register for This Event'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
