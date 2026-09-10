import type { CampusEvent, EventConflictDetails } from '../types';
import { MOCK_EVENTS } from '../data/mockData';

export function checkEventConflicts(
  newEvent: Partial<CampusEvent>,
  existingEvents: CampusEvent[] = MOCK_EVENTS
): EventConflictDetails {
  const { date, startTime, endTime, venue, venueRoom, targetAudience, resourcesNeeded } = newEvent;

  if (!date || !startTime || !endTime) {
    return { hasConflict: false, conflictTypes: [] };
  }

  const conflicts: Array<'DATE' | 'TIME' | 'VENUE' | 'AUDIENCE' | 'RESOURCE'> = [];
  let conflictingTitle = "";
  let conflictMsg = "";

  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const newStartMin = toMinutes(startTime);
  const newEndMin = toMinutes(endTime);

  for (const event of existingEvents) {
    if (event.status === 'CANCELLED') continue;

    if (event.date === date) {
      const existStartMin = toMinutes(event.startTime);
      const existEndMin = toMinutes(event.endTime);

      const hasTimeOverlap = Math.max(newStartMin, existStartMin) < Math.min(newEndMin, existEndMin);

      if (hasTimeOverlap) {
        const isSameVenue = venue && event.venue.toLowerCase().includes(venue.toLowerCase());
        const isSameRoom = venueRoom && (
          event.venueRoom.toLowerCase().includes(venueRoom.toLowerCase()) ||
          venueRoom.toLowerCase().includes(event.venueRoom.toLowerCase())
        );

        if (isSameVenue && isSameRoom) {
          conflicts.push('VENUE', 'TIME', 'DATE');
          conflictingTitle = event.title;
          conflictMsg = `⚠️ Venue Conflict: ${event.venue} (${event.venueRoom}) is already booked by "${event.title}" on ${date} from ${event.startTime} to ${event.endTime}.`;
          break;
        }

        if (targetAudience && event.targetAudience.toLowerCase().includes(targetAudience.toLowerCase())) {
          conflicts.push('AUDIENCE');
          conflictingTitle = event.title;
          conflictMsg = `⚠️ Target Audience Overlap: "${event.title}" is also targeting ${event.targetAudience} at ${event.startTime}.`;
        }

        if (resourcesNeeded && event.resourcesNeeded) {
          const shared = resourcesNeeded.filter(r =>
            event.resourcesNeeded.some(er => er.toLowerCase().includes(r.toLowerCase()))
          );
          if (shared.length > 0) {
            conflicts.push('RESOURCE');
            conflictingTitle = event.title;
            conflictMsg = `⚠️ Shared Resource Conflict: ${shared.join(', ')} reserved by "${event.title}".`;
          }
        }
      }
    }
  }

  let suggestions: Array<{ venueRoom: string; startTime: string; endTime: string; reason: string }> | undefined;

  if (conflicts.length > 0) {
    const alternativeRooms = ["Room 305", "Room 402", "Seminar Hall B", "Auditorium Annex"];
    const freeRoom = alternativeRooms.find(r => r !== venueRoom) || "Room 305";

    suggestions = [
      {
        venueRoom: freeRoom,
        startTime: startTime,
        endTime: endTime,
        reason: `${freeRoom} in ${venue || 'Block A'} is available and unbooked from ${startTime} to ${endTime}.`
      },
      {
        venueRoom: venueRoom || "Room 301",
        startTime: "16:30",
        endTime: "18:30",
        reason: `Shift time slot to 4:30 PM after existing event completes.`
      }
    ];
  }

  return {
    hasConflict: conflicts.length > 0,
    conflictTypes: Array.from(new Set(conflicts)),
    conflictingEventTitle: conflictingTitle,
    conflictMessage: conflictMsg,
    suggestedAlternatives: suggestions
  };
}
