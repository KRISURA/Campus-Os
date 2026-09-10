import type { CampusEvent, EventConflictDetails } from '../types';
import { checkEventConflicts } from './conflictEngineService';
import { MOCK_CLUBS } from '../data/mockData';

export interface ParsedEventIntent {
  clubId: string;
  clubName: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  venueRoom: string;
  capacity: number;
  targetAudience: string;
  resourcesNeeded: string[];
  missingFields: string[];
  conflictCheck: EventConflictDetails;
}

export function parseNaturalLanguageEvent(prompt: string): ParsedEventIntent {
  const lower = prompt.toLowerCase();

  // 1. Extract Club
  let matchedClub = MOCK_CLUBS[0]; // Default to Tech Club
  for (const club of MOCK_CLUBS) {
    if (lower.includes(club.shortName.toLowerCase()) || lower.includes(club.name.toLowerCase())) {
      matchedClub = club;
      break;
    }
  }

  // 2. Extract Event Title
  let title = "AI Basics Workshop";
  if (lower.includes("ai basics") || lower.includes("ai workshop")) {
    title = "AI Basics Workshop";
  } else if (lower.includes("hackathon")) {
    title = "Annual Technova Hackathon";
  } else if (lower.includes("robotics")) {
    title = "Robotics Bot Showcase";
  } else if (lower.includes("cultural") || lower.includes("concert")) {
    title = "Cultural Night 2026";
  } else {
    const parts = prompt.split(/ko|par|in|at/i);
    if (parts[0]) title = parts[0].trim();
  }

  // 3. Extract Date
  let date = "2026-10-25";
  const dateMatch = lower.match(/(\d{1,2})\s*(october|oct|november|nov|december|dec|september|sep)/i);
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0');
    const monthStr = dateMatch[2].toLowerCase();
    let month = "10";
    if (monthStr.startsWith("nov")) month = "11";
    if (monthStr.startsWith("dec")) month = "12";
    if (monthStr.startsWith("sep")) month = "09";
    date = `2026-${month}-${day}`;
  }

  // 4. Extract Time
  let startTime = "14:00";
  let endTime = "16:00";
  const timeMatch = lower.match(/(\d{1,2})\s*(pm|am|:00)/i);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const ampm = timeMatch[2].toLowerCase();
    if (ampm === "pm" && hour < 12) hour += 12;
    startTime = `${hour.toString().padStart(2, '0')}:00`;
    endTime = `${(hour + 2).toString().padStart(2, '0')}:00`;
  }

  // 5. Extract Venue & Room
  let venue = "Block A";
  let venueRoom = "Room 301";
  if (lower.includes("block a")) venue = "Block A";
  if (lower.includes("block b")) venue = "Block B";
  if (lower.includes("auditorium")) {
    venue = "Central Grounds";
    venueRoom = "Main Auditorium";
  }
  if (lower.includes("sports complex")) {
    venue = "Sports Complex";
    venueRoom = "Main Football Ground";
  }

  const roomMatch = lower.match(/room\s*(\d{3})/i);
  if (roomMatch) {
    venueRoom = `Room ${roomMatch[1]}`;
  }

  // 6. Extract Capacity
  let capacity = 100;
  const capacityMatch = lower.match(/capacity\s*(\d+)|(\d+)\s*students/i);
  if (capacityMatch) {
    const num = capacityMatch[1] || capacityMatch[2];
    if (num) capacity = parseInt(num, 10);
  }

  const missingFields: string[] = [];
  if (!prompt.toLowerCase().includes("room")) {
    missingFields.push("Specific Room Number in " + venue);
  }

  const draftEvent: Partial<CampusEvent> = {
    title,
    clubId: matchedClub.id,
    clubName: matchedClub.name,
    category: "Workshop",
    date,
    startTime,
    endTime,
    venue,
    venueRoom,
    capacity,
    targetAudience: "CSE & ECE Students",
    resourcesNeeded: ["Projector", "Sound System", "High-speed Wi-Fi"]
  };

  const conflictCheck = checkEventConflicts(draftEvent);

  return {
    clubId: matchedClub.id,
    clubName: matchedClub.name,
    title,
    date,
    startTime,
    endTime,
    venue,
    venueRoom,
    capacity,
    targetAudience: "CSE & ECE Students (Eligible: ~200)",
    resourcesNeeded: ["Projector", "Sound System", "High-speed Wi-Fi"],
    missingFields,
    conflictCheck
  };
}
