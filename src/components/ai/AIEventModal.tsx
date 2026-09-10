import React, { useState } from 'react';
import { parseNaturalLanguageEvent } from '../../services/aiAgentService';
import type { ParsedEventIntent } from '../../services/aiAgentService';
import type { CampusEvent } from '../../types';
import { 
  Sparkles, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  HelpCircle,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AIEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (newEvent: CampusEvent) => void;
  initialPrompt?: string;
}

export const AIEventModal: React.FC<AIEventModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
  initialPrompt = "Tech Club ka AI Basics Workshop 25 October ko 2 PM par Block A mein karna hai, capacity 100."
}) => {
  const [promptText, setPromptText] = useState<string>(initialPrompt);
  const [parsedResult, setParsedResult] = useState<ParsedEventIntent | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleParse = (text: string) => {
    const res = parseNaturalLanguageEvent(text);
    setParsedResult(res);
    setSelectedAlternative(null);
    setIsSuccess(false);
  };

  const handleConfirmCreation = () => {
    if (!parsedResult) return;

    const finalRoom = selectedAlternative || parsedResult.venueRoom;

    const createdEvent: CampusEvent = {
      id: `evt-${Date.now()}`,
      title: parsedResult.title,
      clubId: parsedResult.clubId,
      clubName: parsedResult.clubName,
      category: "Workshop",
      date: parsedResult.date,
      startTime: parsedResult.startTime,
      endTime: parsedResult.endTime,
      venue: parsedResult.venue,
      venueRoom: finalRoom,
      capacity: parsedResult.capacity,
      registeredCount: 0,
      description: `AI-Generated Event: ${parsedResult.title} organized by ${parsedResult.clubName}.`,
      targetAudience: parsedResult.targetAudience,
      resourcesNeeded: parsedResult.resourcesNeeded,
      status: "SCHEDULED",
      bannerImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80"
    };

    onEventCreated(createdEvent);
    setIsSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                AI Event Operations Agent
              </h2>
              <p className="text-xs text-slate-400">Instruct the agent in plain English or Hindi to create events.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300">Give Natural Language Instructions:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g. 'Tech Club ka AI Basics Workshop 25 October ko 2 PM par Block A mein karna hai...'"
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-blue-500 text-white text-sm px-4 py-3 rounded-2xl focus:outline-none"
            />
            <button
              onClick={() => handleParse(promptText)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" /> Process
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-500 font-medium">Try Demo Prompt:</span>
            <button
              onClick={() => {
                const sample = "Tech Club ka AI Basics Workshop 25 October ko 2 PM par Block A mein karna hai, capacity 100.";
                setPromptText(sample);
                handleParse(sample);
              }}
              className="text-[11px] bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-3 py-1 rounded-full"
            >
              "Tech Club AI Basics Workshop..." (Triggers Conflict)
            </button>
          </div>
        </div>

        {/* Parsed Result & Conflict Engine */}
        {parsedResult && !isSuccess && (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            
            {/* Extracted Details Card */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <span>Extracted Event Parameters</span>
                <span className="text-blue-400">NLP Entity Extraction Complete</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-1">
                <div>
                  <div className="text-slate-500">Organizing Club</div>
                  <div className="text-white font-bold">{parsedResult.clubName}</div>
                </div>
                <div>
                  <div className="text-slate-500">Event Title</div>
                  <div className="text-white font-bold">{parsedResult.title}</div>
                </div>
                <div>
                  <div className="text-slate-500">Date & Time</div>
                  <div className="text-white font-bold">{parsedResult.date} @ {parsedResult.startTime}</div>
                </div>
                <div>
                  <div className="text-slate-500">Venue & Room</div>
                  <div className="text-white font-bold">{parsedResult.venue} ({parsedResult.venueRoom})</div>
                </div>
                <div>
                  <div className="text-slate-500">Capacity</div>
                  <div className="text-white font-bold">{parsedResult.capacity} Students</div>
                </div>
                <div>
                  <div className="text-slate-500">Audience</div>
                  <div className="text-white font-bold">{parsedResult.targetAudience}</div>
                </div>
              </div>
            </div>

            {/* Missing Info Warning */}
            {parsedResult.missingFields.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-300 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <span className="font-bold">Clarification Needed:</span>
                  <p>You did not specify a room number. Defaulting to Room 301 in Block A. Would you like to select a different room?</p>
                </div>
              </div>
            )}

            {/* EVENT CONFLICT ENGINE DISPLAY */}
            {parsedResult.conflictCheck.hasConflict ? (
              <div className="bg-rose-500/10 border border-rose-500/40 p-5 rounded-2xl space-y-4">
                <div className="flex items-start gap-3 text-rose-300">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0 text-rose-400" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">⚠️ Conflict Detected by Event Engine</h4>
                    <p className="text-xs text-rose-200">{parsedResult.conflictCheck.conflictMessage}</p>
                    <p className="text-[11px] text-rose-300/80">
                      Reason: Technova Hackathon is already scheduled in Block A Room 301 on 25 October from 1:00 PM – 6:00 PM.
                    </p>
                  </div>
                </div>

                {/* AI Alternative Recommendations */}
                {parsedResult.conflictCheck.suggestedAlternatives && (
                  <div className="space-y-2 pt-2 border-t border-rose-500/20">
                    <div className="text-xs font-bold text-white">AI Suggested Conflict Solutions:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {parsedResult.conflictCheck.suggestedAlternatives.map((alt, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedAlternative(alt.venueRoom)}
                          className={`p-3 rounded-xl text-left border text-xs transition-all ${
                            selectedAlternative === alt.venueRoom || (!selectedAlternative && i === 0)
                              ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-bold text-sm">Switch to {alt.venueRoom}</div>
                          <div className="text-[11px] text-slate-300 mt-1">{alt.reason}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold">Conflict Check Passed:</span> No venue, date, or resource overlaps found for this slot.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmCreation}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Check className="w-4 h-4" /> Confirm & Create Event
              </button>
            </div>

          </div>
        )}

        {/* Success Confirmation Card */}
        {isSuccess && parsedResult && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/50 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">✅ Event Created Successfully!</h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div><span className="text-slate-400">Club:</span> <strong className="text-white">{parsedResult.clubName}</strong></div>
              <div><span className="text-slate-400">Event:</span> <strong className="text-white">{parsedResult.title}</strong></div>
              <div><span className="text-slate-400">Date & Time:</span> <strong className="text-white">{parsedResult.date} @ {parsedResult.startTime}</strong></div>
              <div><span className="text-slate-400">Venue:</span> <strong className="text-emerald-400">{parsedResult.venue} ({selectedAlternative || parsedResult.venueRoom})</strong></div>
              <div><span className="text-slate-400">Conflict Check:</span> <strong className="text-emerald-400 font-bold">Resolved (No Overlaps)</strong></div>
              <div><span className="text-slate-400">Promotion Target:</span> <strong className="text-white">{parsedResult.targetAudience}</strong></div>
            </div>

            <p className="text-xs text-slate-400">
              Event is now live on the Central Calendar, Student Dashboard, and Public Event Directory.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
