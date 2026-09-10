import React, { useState } from 'react';
import { performRAGSearch } from '../../services/ragSearchEngine';
import { analyzeInstitutionalMemory } from '../../services/institutionalMemoryAgent';
import type { EventPlanningBrief } from '../../services/institutionalMemoryAgent';
import type { InstitutionalDocument } from '../../types';
import { 
  Search, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  BrainCircuit,
  ShieldAlert,
  ListChecks
} from 'lucide-react';

export const InstitutionalMemoryHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("annual fest registration problem");
  const [searchResults, setSearchResults] = useState<InstitutionalDocument[]>(performRAGSearch("annual fest registration problem"));
  
  const [planningPrompt, setPlanningPrompt] = useState<string>("We are planning a three-day technical fest for 2,000 students. What should we be careful about based on previous events?");
  const [planningBrief, setPlanningBrief] = useState<EventPlanningBrief | null>(analyzeInstitutionalMemory("fest planning"));
  const [activeTab, setActiveTab] = useState<'search' | 'planning' | 'problems'>('search');

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const results = performRAGSearch(q);
    setSearchResults(results);
  };

  const handleGenerateBrief = () => {
    const brief = analyzeInstitutionalMemory(planningPrompt);
    setPlanningBrief(brief);
    setActiveTab('planning');
  };

  return (
    <div className="space-y-10 pb-16">

      {/* Memory Engine Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
            <BrainCircuit className="w-3.5 h-3.5" /> Institutional Memory RAG Core
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Institutional Memory & RAG Search Engine
          </h1>
          <p className="text-sm text-slate-400">
            Indexes PDFs, meeting minutes, budget sheets, and feedback to prevent repeating past mistakes.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'search' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Semantic Doc Search
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'problems' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Recurring Problems
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'planning' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Planning Agent
          </button>
        </div>
      </div>

      {/* TAB 1: SEMANTIC DOCUMENT SEARCH */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-rose-400" /> Explainable Semantic Search
              </h2>
              <p className="text-xs text-slate-400 mt-1">Search document contents semantically without relying on exact filenames.</p>
            </div>

            {/* Search Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents e.g. 'registration problem', 'robotics competition', 'fest audio'..."
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-rose-500 text-white text-sm px-4 py-3 rounded-2xl focus:outline-none"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition-all"
              >
                Search Documents
              </button>
            </div>

            {/* Preset Query Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Try Query:</span>
              <button
                onClick={() => handleSearch("Find the report for last year's annual fest")}
                className="bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 px-3 py-1 rounded-full text-[11px]"
              >
                "Find report for last year's annual fest"
              </button>
              <button
                onClick={() => handleSearch("Find document where registration problem was discussed")}
                className="bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 px-3 py-1 rounded-full text-[11px]"
              >
                "Where was registration problem discussed?"
              </button>
            </div>

            {/* EXPLAINABLE SEARCH RESULTS LIST */}
            <div className="space-y-4 pt-2">
              <div className="text-xs font-bold text-slate-400">Found {searchResults.length} Relevant Documents:</div>

              {searchResults.map((doc) => (
                <div key={doc.id} className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                          {doc.fileType}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{doc.category} • {doc.year}</span>
                      </div>
                      <h3 className="font-bold text-white text-base">{doc.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{doc.summary}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        {doc.relevanceScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* EXPLAINABLE WHY THIS RESULT BADGE */}
                  {doc.matchedReason && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-400" /> Why this result was selected?
                      </div>
                      <p className="text-slate-300 text-xs pl-5 font-medium">{doc.matchedReason}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Uploaded by {doc.author} on {doc.dateUploaded}</span>
                    <button className="text-rose-400 font-bold hover:underline flex items-center gap-1">
                      View Full Content <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: RECURRING PROBLEMS DETECTOR */}
      {activeTab === 'problems' && planningBrief && (
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> 3-Year Institutional Recurring Failure Detector
              </h2>
              <p className="text-xs text-slate-400 mt-1">Identifies chronic operational issues repeated across multiple event years.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planningBrief.recurringRisks.map((risk, idx) => (
                <div key={idx} className="bg-slate-900/90 p-6 rounded-2xl border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                      Frequency: {risk.frequency}
                    </span>
                    <span className="text-[10px] font-bold text-white bg-rose-600 px-2 py-0.5 rounded-full">
                      {risk.severity} SEVERITY
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">{risk.issueTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{risk.impactDescription}</p>

                  <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                    <div className="text-slate-400 font-semibold">Evidence Citations:</div>
                    {risk.citations.map((c, ci) => (
                      <div key={ci} className="text-slate-400 font-mono text-[10px] flex items-center gap-1">
                        • {c}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI EVENT PLANNING AGENT BRIEF (FINAL WOW MOMENT) */}
      {activeTab === 'planning' && (
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> AI Event Planning Agent (Evidence-Based Brief)
              </h2>
              <p className="text-xs text-slate-400 mt-1">Generates actionable risk preventions backed strictly by historical college logs.</p>
            </div>

            {/* Prompt Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={planningPrompt}
                onChange={(e) => setPlanningPrompt(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-sm px-4 py-3 rounded-2xl focus:outline-none"
              />
              <button
                onClick={handleGenerateBrief}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl flex items-center gap-2"
              >
                Generate Brief
              </button>
            </div>

            {planningBrief && (
              <div className="space-y-6 pt-4 border-t border-slate-800">
                <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">{planningBrief.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-amber-400 mt-2 font-semibold">
                      <span>Scale: {planningBrief.targetScale}</span>
                      <span>Expected Budget: {planningBrief.expectedBudget}</span>
                    </div>
                  </div>

                  {/* Action Items backed by historical evidence */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-emerald-400" /> Evidence-Based Preventive Action Items
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {planningBrief.preventiveActionItems.map((item, i) => (
                        <div key={i} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{item.category}</span>
                          <h5 className="font-bold text-white text-sm">{item.action}</h5>
                          <p className="text-xs text-slate-300 leading-relaxed"><strong className="text-amber-300">Historical Basis:</strong> {item.historicalBasis}</p>
                          <div className="text-[10px] text-slate-400 font-mono pt-1">Source: {item.citedDoc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
