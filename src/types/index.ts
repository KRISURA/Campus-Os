export type UserRole = 'public' | 'student' | 'club_coordinator' | 'faculty' | 'admin';

export type EventCategory = 'Technical' | 'Cultural' | 'Sports' | 'Hackathon' | 'Workshop' | 'Competition' | 'Festival' | 'Seminar';

export interface Club {
  id: string;
  name: string;
  shortName: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Social Work' | 'Literary' | 'Innovation';
  logo: string;
  description: string;
  facultyCoordinator: string;
  studentCoordinators: string[];
  membersCount: number;
  upcomingEventsCount: number;
  achievements: string[];
  recruitmentStatus: 'OPEN' | 'CLOSED';
  gallery: string[];
  banner: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "14:00"
  endTime: string; // e.g. "16:00"
  venue: string; // e.g. "Block A"
  venueRoom: string; // e.g. "Room 301"
  capacity: number;
  registeredCount: number;
  description: string;
  targetAudience: string; // e.g. "CSE Students", "All Students"
  resourcesNeeded: string[]; // e.g. ["Projector", "Sound System", "200 Chairs"]
  status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
  bannerImage: string;
  highlights?: string[];
  registeredStudentIds?: string[];
}

export interface EventConflictDetails {
  hasConflict: boolean;
  conflictTypes: Array<'DATE' | 'TIME' | 'VENUE' | 'AUDIENCE' | 'RESOURCE'>;
  conflictingEventTitle?: string;
  conflictingEventId?: string;
  conflictMessage?: string;
  suggestedAlternatives?: Array<{
    venueRoom: string;
    startTime: string;
    endTime: string;
    reason: string;
  }>;
}

export interface FinancialRecord {
  id: string;
  year: number; // 2024, 2025, 2026
  department: string;
  eventName: string;
  category: 'Events' | 'Sports' | 'Infrastructure' | 'Maintenance' | 'Clubs' | 'Academic' | 'Transport' | 'Equipment';
  vendor: string;
  amount: number; // In INR
  plannedBudget: number; // In INR
  actualSpent: number; // In INR
  date: string;
  description: string;
}

export interface SportsExpenditure {
  id: string;
  sportName: string;
  year: number;
  category: 'Equipment' | 'Travel & Food' | 'Coaching' | 'Tournament Fee' | 'Facility Maintenance';
  amount: number;
  description: string;
}

export interface InstitutionalDocument {
  id: string;
  title: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'TXT';
  year: number;
  category: 'Event Report' | 'Budget Sheet' | 'Meeting Minutes' | 'Feedback Report' | 'Sports Log' | 'Maintenance Record';
  department: string;
  author: string;
  dateUploaded: string;
  summary: string;
  fullContent: string;
  tags: string[];
  recurringIssuesIdentified?: string[];
  relevanceScore?: number; // Calculated during search
  matchedReason?: string; // Explainability
}

export interface AcademicResource {
  id: string;
  subject: 'DBMS' | 'DSA' | 'Computer Networks' | 'Operating Systems' | 'AI & ML' | 'Software Engineering';
  title: string;
  type: 'LMS' | 'Moodle' | 'Cybervidya' | 'YouTube' | 'Notes' | 'PYQ' | 'Assignment';
  url: string;
  sourceName: string;
  author: string;
  topic: string;
  description: string;
  rating: number;
}

export interface RecruitmentPost {
  id: string;
  clubId: string;
  clubName: string;
  role: string;
  description: string;
  requirements: string[];
  skills: string[];
  deadline: string;
  openPositions: number;
  applicantsCount: number;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  email: string;
  joinedClubs: string[];
  registeredEventIds: string[];
  bookmarks: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  category: 'General' | 'Academic' | 'Event' | 'Club' | 'Placement' | 'Sports';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  author: string;
}

export interface CampusGalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Campus' | 'Events' | 'Sports' | 'Cultural' | 'Hackathon' | 'Graduation';
  date: string;
  description: string;
}

export interface SportTeam {
  id: string;
  sportName: string;
  coach: string;
  captain: string;
  playersCount: number;
  achievements: string[];
  facility: string;
  equipmentStatus: 'Good' | 'Needs Replacement' | 'New';
  upcomingCompetitions: string[];
}

export interface Facility {
  id: string;
  title: string;
  type: string;
  description: string;
  imageUrl: string;
  capacity?: number;
  features: string[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'EVENT' | 'BUDGET' | 'VENDOR' | 'PROBLEM' | 'RECOMMENDATION' | 'DEPT';
  details?: string;
  color?: string;
  x?: number;
  y?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
}

export interface DemoStep {
  id: number;
  title: string;
  role: UserRole;
  prompt: string;
  targetView: string;
  description: string;
}
