import { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { Navbar } from './components/navbar/Navbar';
import { PublicPortal } from './components/public/PublicPortal';
import { StudentPortal } from './components/student/StudentPortal';
import { ClubManagement } from './components/clubs/ClubManagement';
import { ClubDetailPage } from './components/clubs/ClubDetailPage';
import { CampusCalendar } from './components/calendar/CampusCalendar';
import { EventDetailModal } from './components/calendar/EventDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SportsModule } from './components/admin/SportsModule';
import { InstitutionalMemoryHub } from './components/memory/InstitutionalMemoryHub';
import { KnowledgeGraphView } from './components/graph/KnowledgeGraphView';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { AIEventModal } from './components/ai/AIEventModal';
import { DemoGuideModal } from './components/demo/DemoGuideModal';
import type { UserRole, CampusEvent } from './types';
import { MOCK_EVENTS, CURRENT_STUDENT } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const [activeRole, setActiveRole] = useState<UserRole>('public');
  const [activeView, setActiveView] = useState<string>('portal');
  
  // Modal States
  const [isAIAgentOpen, setIsAIAgentOpen] = useState<boolean>(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);
  
  // Selection States for detailed views
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  // Registration State
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(CURRENT_STUDENT.registeredEventIds);

  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);
  const [eventsList, setEventsList] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (role: UserRole) => {
    setActiveRole(role);
    // Set the default view based on role
    switch (role) {
      case 'student':
        setActiveView('student');
        break;
      case 'club_coordinator':
        setActiveView('clubs');
        break;
      case 'admin':
        setActiveView('admin-finance');
        break;
      case 'faculty':
        setActiveView('faculty');
        break;
      default:
        setActiveView('portal');
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveRole('public');
    setActiveView('portal');
    setIsAIAgentOpen(false);
    setIsDemoGuideOpen(false);
    setSelectedClubId(null);
    setSelectedEventId(null);
  };

  const handleEventCreated = (newEvent: CampusEvent) => {
    setEventsList(prev => [newEvent, ...prev]);
  };

  const handleSelectClub = (clubId: string) => {
    setSelectedClubId(clubId);
    setActiveView('club-detail');
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleRegisterEvent = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => [...prev, eventId]);
      const evt = eventsList.find(e => e.id === eventId);
      showToast(`Registered successfully for ${evt ? evt.title : 'event'}!`);
    }
  };

  const handleUnregisterEvent = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    showToast('Unregistered from event.');
  };

  const handleRunDemoStep = (stepId: number) => {
    setCurrentDemoStep(stepId);
    switch (stepId) {
      case 1:
        setActiveRole('public');
        setActiveView('portal');
        break;
      case 2:
        setActiveRole('student');
        setActiveView('student');
        break;
      case 3:
        setActiveRole('club_coordinator');
        setActiveView('clubs');
        setIsAIAgentOpen(true);
        break;
      case 4:
        setActiveRole('admin');
        setActiveView('admin-finance');
        break;
      case 5:
        setActiveRole('admin');
        setActiveView('admin-memory');
        break;
      default:
        break;
    }
  };

  const selectedEvent = eventsList.find(e => e.id === selectedEventId) || null;

  // ─── SHOW LOGIN PAGE IF NOT AUTHENTICATED ─────────────────
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ─── MAIN APP SHELL ──────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern noise-overlay" style={{ backgroundColor: '#050816' }}>
      {/* Top Navbar */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDemoGuide={() => setIsDemoGuideOpen(true)}
        onOpenAIAgent={() => setIsAIAgentOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-8 pb-12 relative z-10">
        <div key={activeView} className="page-transition">
          {activeView === 'portal' && (
            <PublicPortal
              onSelectClub={handleSelectClub}
              onSelectEvent={handleSelectEvent}
              onOpenAIAgent={() => setIsAIAgentOpen(true)}
            />
          )}

          {activeView === 'student' && (
            <StudentPortal 
              onSelectEvent={handleSelectEvent}
              registeredEvents={registeredEvents}
              onRegister={handleRegisterEvent}
              onUnregister={handleUnregisterEvent}
            />
          )}

          {activeView === 'clubs' && (
            <ClubManagement onOpenAIAgent={() => setIsAIAgentOpen(true)} />
          )}

          {activeView === 'club-detail' && selectedClubId && (
            <ClubDetailPage 
              clubId={selectedClubId} 
              onBack={() => setActiveView(activeRole === 'public' ? 'portal' : 'clubs')}
              onSelectEvent={handleSelectEvent}
            />
          )}

          {activeView === 'faculty' && (
            <FacultyDashboard 
              onSelectEvent={handleSelectEvent}
              onSelectClub={handleSelectClub}
            />
          )}

          {activeView === 'calendar' && (
            <CampusCalendar onSelectEvent={handleSelectEvent} />
          )}

          {activeView === 'admin-finance' && (
            <AdminDashboard />
          )}

          {activeView === 'admin-sports' && (
            <SportsModule />
          )}

          {activeView === 'admin-memory' && (
            <InstitutionalMemoryHub />
          )}

          {activeView === 'graph' && (
            <KnowledgeGraphView />
          )}
        </div>
      </main>

      {/* Shared Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
        isRegistered={selectedEventId ? registeredEvents.includes(selectedEventId) : false}
        onRegister={handleRegisterEvent}
        onUnregister={handleUnregisterEvent}
      />

      {/* AI Event Operations Agent Modal */}
      <AIEventModal
        isOpen={isAIAgentOpen}
        onClose={() => setIsAIAgentOpen(false)}
        onEventCreated={handleEventCreated}
      />

      {/* 5-Minute Guided Demo Workflows Modal */}
      <DemoGuideModal
        isOpen={isDemoGuideOpen}
        onClose={() => setIsDemoGuideOpen(false)}
        onRunDemoStep={handleRunDemoStep}
        currentStepId={currentDemoStep}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-indigo-500/50 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-6 text-center glass-panel mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <div className="font-medium">CAMPUS OS • Institutional Operating & Intelligence Ecosystem</div>
          <div className="flex items-center gap-4">
            <span>RBAC Engine</span>
            <span className="text-slate-700">•</span>
            <span>RAG Document Store</span>
            <span className="text-slate-700">•</span>
            <span>AI Conflict Resolver</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
