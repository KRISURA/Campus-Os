import React, { useState } from 'react';
import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES } from '../../data/mockData';
import type { KnowledgeNode } from '../../types';
import { Share2, Info, ArrowRight, Activity, Cpu, Sparkles, Filter, ZoomIn, RefreshCw } from 'lucide-react';

export const KnowledgeGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(KNOWLEDGE_NODES[0] || null);
  const [filterType, setFilterType] = useState<string>('ALL');

  const nodeTypes = ['ALL', 'EVENT', 'BUDGET', 'VENDOR', 'PROBLEM', 'RECOMMENDATION', 'DEPT'];

  const filteredNodes = filterType === 'ALL' 
    ? KNOWLEDGE_NODES 
    : KNOWLEDGE_NODES.filter(n => n.type === filterType);

  const activeNodeIds = new Set(filteredNodes.map(n => n.id));

  // If a node is selected, also keep nodes connected to it in focus
  const connectedNodeIds = new Set<string>();
  if (selectedNode) {
    connectedNodeIds.add(selectedNode.id);
    KNOWLEDGE_EDGES.forEach(e => {
      if (e.source === selectedNode.id) connectedNodeIds.add(e.target);
      if (e.target === selectedNode.id) connectedNodeIds.add(e.source);
    });
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Graph Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Share2 className="w-3.5 h-3.5" /> Institutional Knowledge Graph
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            Connected Entity & Operational Graph <Cpu className="w-7 h-7 text-cyan-400 opacity-60" />
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
            Campus OS continuously aggregates and correlates data across departments, events, budgets, vendors, and failure points. Click any node to inspect interconnected entities and AI reasoning paths.
          </p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-6 self-stretch md:self-auto justify-around backdrop-blur-md">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-cyan-400">{KNOWLEDGE_NODES.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nodes</div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-indigo-400">{KNOWLEDGE_EDGES.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Edges</div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-emerald-400">3 Yrs</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Historical</div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80">
        <span className="text-xs font-bold text-slate-400 px-3 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter:
        </span>
        {nodeTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterType === type
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {type}
          </button>
        ))}
        {filterType !== 'ALL' && (
          <button
            onClick={() => setFilterType('ALL')}
            className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 px-2"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Visual Node Explorer */}
        <div className="lg:col-span-2 glass-panel p-0 rounded-3xl border border-slate-800 flex flex-col overflow-hidden relative min-h-[580px] bg-slate-950 shadow-2xl">
          
          {/* Status Header Overlay */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-white">Live Neural Map</span>
            <span className="text-[10px] text-slate-400 font-mono">({filteredNodes.length} visible)</span>
          </div>

          {/* Legend Overlay */}
          <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2.5 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 backdrop-blur-md text-[10px] font-bold">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500"></div> Event</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500"></div> Budget</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500"></div> Vendor</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500"></div> Problem</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500"></div> Solved By</div>
          </div>

          {/* Interactive SVG Node Diagram */}
          <div className="w-full h-full min-h-[560px] relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center p-2">
            
            {/* Background Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', 
                backgroundSize: '48px 48px' 
              }}
            />

            <svg 
              viewBox="0 0 850 500" 
              className="w-full h-full min-h-[540px] select-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Arrow markers */}
                <marker id="kg-arrow" markerWidth="8" markerHeight="6" refX="28" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#475569" opacity="0.6" />
                </marker>
                <marker id="kg-arrow-active" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                </marker>
                <marker id="kg-arrow-connected" markerWidth="9" markerHeight="6" refX="28" refY="3" orient="auto">
                  <polygon points="0 0, 9 3, 0 6" fill="#818cf8" />
                </marker>

                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* EDGES LAYER */}
              {KNOWLEDGE_EDGES.map(edge => {
                const source = KNOWLEDGE_NODES.find(n => n.id === edge.source);
                const target = KNOWLEDGE_NODES.find(n => n.id === edge.target);
                if (!source || !target) return null;

                const isDirectlySelected = selectedNode && (source.id === selectedNode.id || target.id === selectedNode.id);
                const isFilteredIn = activeNodeIds.has(source.id) && activeNodeIds.has(target.id);
                
                let strokeColor = '#334155';
                let strokeWidth = 1.5;
                let strokeOpacity = 0.25;
                let marker = 'url(#kg-arrow)';

                if (isDirectlySelected) {
                  strokeColor = '#06b6d4';
                  strokeWidth = 2.5;
                  strokeOpacity = 1;
                  marker = 'url(#kg-arrow-active)';
                } else if (!isFilteredIn && filterType !== 'ALL') {
                  strokeOpacity = 0.08;
                }

                const sx = source.x ?? 0;
                const sy = source.y ?? 0;
                const tx = target.x ?? 0;
                const ty = target.y ?? 0;

                const midX = (sx + tx) / 2;
                const midY = (sy + ty) / 2;

                return (
                  <g key={edge.id} className="transition-all duration-300">
                    <line 
                      x1={sx} 
                      y1={sy} 
                      x2={tx} 
                      y2={ty} 
                      stroke={strokeColor} 
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      strokeDasharray={isDirectlySelected ? "6 3" : undefined}
                      markerEnd={marker}
                    />
                    {isDirectlySelected && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect 
                          x="-40" 
                          y="-10" 
                          width="80" 
                          height="20" 
                          rx="6" 
                          fill="#0f172a" 
                          stroke="#06b6d4" 
                          strokeWidth="1"
                          strokeOpacity="0.8"
                        />
                        <text 
                          x="0" 
                          y="3" 
                          fill="#38bdf8" 
                          fontSize="9" 
                          fontWeight="700"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {edge.relation}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* NODES LAYER */}
              {KNOWLEDGE_NODES.map(node => {
                const isSelected = selectedNode?.id === node.id;
                const isConnected = selectedNode && connectedNodeIds.has(node.id);
                const isMatchingFilter = activeNodeIds.has(node.id);

                let nodeOpacity = 1;
                if (filterType !== 'ALL' && !isMatchingFilter) {
                  nodeOpacity = 0.15;
                } else if (selectedNode && !isSelected && !isConnected) {
                  nodeOpacity = 0.35;
                }

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer transition-all duration-300 group"
                    opacity={nodeOpacity}
                  >
                    {/* Selected Glowing Halo */}
                    {isSelected && (
                      <circle 
                        r="32" 
                        fill="none" 
                        stroke="#06b6d4" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                        className="animate-spin"
                        style={{ animationDuration: '10s' }}
                      />
                    )}

                    {/* Outer Ambient Glow */}
                    <circle 
                      r={isSelected ? 26 : 20} 
                      fill={node.color} 
                      fillOpacity={isSelected ? 0.25 : 0.12}
                    />

                    {/* Main Node Body */}
                    <circle 
                      r={isSelected ? 22 : 18} 
                      fill="#090d16" 
                      stroke={node.color} 
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200 group-hover:scale-110"
                    />

                    {/* Type Acronym */}
                    <text 
                      x="0" 
                      y="4" 
                      textAnchor="middle" 
                      fill={node.color} 
                      fontSize={isSelected ? "11" : "9"} 
                      fontWeight="800"
                      className="pointer-events-none select-none tracking-tight font-mono"
                    >
                      {node.type.substring(0, 3)}
                    </text>

                    {/* Node Label Pill */}
                    <g transform={`translate(0, ${isSelected ? 34 : 28})`}>
                      <rect 
                        x="-55" 
                        y="-10" 
                        width="110" 
                        height="20" 
                        rx="6" 
                        fill="#090d16" 
                        stroke={isSelected ? '#06b6d4' : '#1e293b'} 
                        strokeWidth={isSelected ? 1.5 : 1}
                        fillOpacity="0.95"
                      />
                      <text 
                        x="0" 
                        y="3" 
                        textAnchor="middle" 
                        fill={isSelected ? '#ffffff' : '#cbd5e1'} 
                        fontSize="9" 
                        fontWeight={isSelected ? "700" : "600"}
                        className="pointer-events-none select-none"
                      >
                        {node.label.length > 18 ? node.label.substring(0, 16) + '…' : node.label}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Bottom Help Tooltip */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Click on any node to trace connected causality & solutions</span>
            </div>
          </div>
        </div>

        {/* Right Col: Node Inspector Panel */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Node Inspector</h3>
            </div>
            {selectedNode && (
              <span 
                className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-extrabold border"
                style={{ 
                  backgroundColor: `${selectedNode.color}15`, 
                  borderColor: `${selectedNode.color}40`,
                  color: selectedNode.color 
                }}
              >
                {selectedNode.type}
              </span>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Main Node Card */}
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2.5 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 bottom-0 w-1.5" 
                    style={{ backgroundColor: selectedNode.color }}
                  />
                  <h4 className="font-bold text-white text-lg pl-2 leading-snug">{selectedNode.label}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-2">{selectedNode.details}</p>
                  
                  <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 pl-2">
                    <span>ID: {selectedNode.id}</span>
                    <span className="text-slate-400">Coords: ({selectedNode.x}, {selectedNode.y})</span>
                  </div>
                </div>

                {/* Connected Relationships */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
                    <span>Connected Relations</span>
                    <span className="text-cyan-400 font-mono">
                      {KNOWLEDGE_EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length} links
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1 scrollbar-none">
                    {KNOWLEDGE_EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(edge => {
                      const isOutgoing = edge.source === selectedNode.id;
                      const otherId = isOutgoing ? edge.target : edge.source;
                      const otherNode = KNOWLEDGE_NODES.find(n => n.id === otherId);
                      
                      if (!otherNode) return null;

                      return (
                        <div 
                          key={edge.id} 
                          onClick={() => setSelectedNode(otherNode)}
                          className="bg-slate-900/80 hover:bg-slate-800/90 p-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 flex flex-col gap-1.5 group cursor-pointer transition-all shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              {edge.relation}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {isOutgoing ? 'OUTGOING →' : '← INCOMING'}
                            </span>
                          </div>
                          <div className="font-bold text-xs text-white flex items-center gap-1.5 mt-0.5">
                            {isOutgoing ? (
                              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            )}
                            <span style={{ color: otherNode.color }}>{otherNode.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RAG Context Button */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 text-[11px] text-slate-300 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Entity indexed in institutional vector database. Queried by <strong>Technova RAG pipeline</strong>.</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 text-sm flex flex-col items-center justify-center">
              <ZoomIn className="w-8 h-8 text-slate-600 mb-2" />
              Select a node in the graph to inspect its properties and relationships.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
