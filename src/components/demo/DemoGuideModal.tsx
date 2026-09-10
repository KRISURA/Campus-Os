import React from 'react';
import { DEMO_STEPS } from '../../data/mockData';
import { PlayCircle, X, ChevronRight } from 'lucide-react';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoStep: (stepId: number) => void;
  currentStepId: number;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({
  isOpen,
  onClose,
  onRunDemoStep,
  currentStepId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-amber-500/40 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-lg">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                5-Minute Guided Demo Workflows
              </h2>
              <p className="text-xs text-slate-400">Click any demo scenario to instantly execute the end-to-end user story.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Steps List */}
        <div className="space-y-4">
          {DEMO_STEPS.map((step) => (
            <div
              key={step.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                currentStepId === step.id
                  ? 'bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/40'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Step {step.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 capitalize">
                    Role: {step.role.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                <div className="text-[11px] text-amber-300 font-mono pt-1">
                  Prompt: "{step.prompt}"
                </div>
              </div>

              <button
                onClick={() => {
                  onRunDemoStep(step.id);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-500/20 flex-shrink-0"
              >
                Run Demo {step.id} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
          Tip: You can also manually switch roles and navigate views using the top header at any time.
        </div>

      </div>
    </div>
  );
};
