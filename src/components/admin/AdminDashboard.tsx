import React, { useState } from 'react';
import { executeFinancialQuery } from '../../services/financialQueryEngine';
import type { FinancialQueryResult } from '../../services/financialQueryEngine';
import { MOCK_CLUBS, MOCK_EVENTS } from '../../data/mockData';
import { 
  ShieldCheck, TrendingUp, PieChart as PieIcon, BarChart3, Sparkles, Send, 
  AlertCircle, ArrowUpRight, Users, Calendar, Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [financialQuery, setFinancialQuery] = useState<string>("How much did we spend on the annual fest during the last three years?");
  const [queryResult, setQueryResult] = useState<FinancialQueryResult>(executeFinancialQuery("How much did we spend on the annual fest during the last three years?"));

  const handleQuerySubmit = (q: string) => {
    setFinancialQuery(q);
    const res = executeFinancialQuery(q);
    setQueryResult(res);
  };

  const COLORS = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-10 pb-16">

      {/* Admin Executive Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Management Intelligence Platform
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Institutional Operational & Financial Intelligence
          </h1>
          <p className="text-sm text-slate-400">
            Cross-departmental overview, financial oversight, vendor expenditures, and natural-language queries.
          </p>
        </div>
      </div>

      {/* SECTION 0: OPERATIONAL OVERVIEW PANEL */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold"><Users className="w-4 h-4 text-indigo-400" /> Total Students</div>
          <div className="text-3xl font-extrabold text-white mt-2">5,240</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +5% YoY Growth</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold"><ShieldCheck className="w-4 h-4 text-blue-400" /> Active Clubs</div>
          <div className="text-3xl font-extrabold text-white mt-2">{MOCK_CLUBS.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 6 Categories</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold"><Calendar className="w-4 h-4 text-purple-400" /> Events This Month</div>
          <div className="text-3xl font-extrabold text-white mt-2">{MOCK_EVENTS.filter(e => e.date.includes('-10-')).length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Scheduled in October</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold"><Sparkles className="w-4 h-4 text-emerald-400" /> Total Registrations</div>
          <div className="text-3xl font-extrabold text-white mt-2">{MOCK_EVENTS.reduce((acc, e) => acc + e.registeredCount, 0)}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> High Engagement</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold"><Zap className="w-4 h-4 text-amber-400" /> Resource Util.</div>
          <div className="text-3xl font-extrabold text-white mt-2">78%</div>
          <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">Optimal Venue Usage</div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 justify-around">
        <div className="text-center px-4">
          <div className="text-3xl font-extrabold text-emerald-400">₹1.18 Cr</div>
          <div className="text-[11px] text-slate-400 uppercase font-medium mt-1">Total Spend Tracked</div>
        </div>
        <div className="w-px h-12 bg-slate-800"></div>
        <div className="text-center px-4">
          <div className="text-3xl font-extrabold text-blue-400">₹63.7 L</div>
          <div className="text-[11px] text-slate-400 uppercase font-medium mt-1">3-Yr Fest Expenses</div>
        </div>
        <div className="w-px h-12 bg-slate-800"></div>
        <div className="text-center px-4">
          <div className="text-3xl font-extrabold text-amber-400">₹34.5 L</div>
          <div className="text-[11px] text-slate-400 uppercase font-medium mt-1">Sports Expenditure</div>
        </div>
      </div>

      {/* SECTION 1: NATURAL LANGUAGE FINANCIAL QUERY TERMINAL */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Natural Language Financial Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">Ask questions in plain English to calculate metrics from structured ledgers.</p>
        </div>

        {/* Input Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            value={financialQuery}
            onChange={(e) => setFinancialQuery(e.target.value)}
            placeholder="Ask a financial question e.g. 'How much did we spend on the annual fest during the last three years?'"
            className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-500 text-white text-sm px-4 py-3 rounded-2xl focus:outline-none"
          />
          <button
            onClick={() => handleQuerySubmit(financialQuery)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Send className="w-4 h-4" /> Query AI
          </button>
        </div>

        {/* Preset Sample Financial Questions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Sample Queries:</span>
          <button
            onClick={() => handleQuerySubmit("How much did we spend on the annual fest during the last three years?")}
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 px-3 py-1 rounded-full text-[11px]"
          >
            "How much did we spend on the annual fest..."
          </button>
          <button
            onClick={() => handleQuerySubmit("How much did sports cost in the last three years?")}
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 px-3 py-1 rounded-full text-[11px]"
          >
            "How much did sports cost in the last 3 years?"
          </button>
          <button
            onClick={() => handleQuerySubmit("Which events exceeded their planned budget?")}
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 px-3 py-1 rounded-full text-[11px]"
          >
            "Which events exceeded their planned budget?"
          </button>
        </div>

        {/* QUERY RESULT DISPLAY */}
        {queryResult && (
          <div className="space-y-6 pt-4 border-t border-slate-800">
            
            {/* Answer Summary Card */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">AI Calculation Result</div>
              <p className="text-sm font-semibold text-white leading-relaxed">{queryResult.summaryText}</p>
            </div>

            {/* Visual Recharts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Year-by-Year Spending Chart */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Year-over-Year Spend Progression (₹)
                </h4>
                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={queryResult.yearComparison}>
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(val) => `₹${val / 100000}L`} />
                      <Tooltip formatter={(val: any) => [`₹${(Number(val) / 100000).toFixed(1)} Lakhs`, 'Amount']} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                      <Bar dataKey="totalSpent" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                        {queryResult.yearComparison.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown Pie Chart */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-purple-400" /> Category Expenditure Share (%)
                </h4>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={queryResult.categoryBreakdown}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }: any) => `${name} (${Math.round((percent || 0) * 100)}%)`}
                      >
                        {queryResult.categoryBreakdown.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: any) => [`₹${(Number(val) / 100000).toFixed(1)} Lakhs`, 'Spent']} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Overbudget & Variance Analysis Table */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" /> Budget vs. Actual Variance Analysis
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                      <th className="py-2.5 px-3">Event / Cost Item</th>
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Planned Budget</th>
                      <th className="py-2.5 px-3">Actual Expenditure</th>
                      <th className="py-2.5 px-3">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {queryResult.overbudgetEvents.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="py-3 px-3 font-bold text-white">{item.eventName}</td>
                        <td className="py-3 px-3">{item.year}</td>
                        <td className="py-3 px-3 text-slate-400">₹{(item.planned / 100000).toFixed(1)} Lakhs</td>
                        <td className="py-3 px-3 text-white font-semibold">₹{(item.actual / 100000).toFixed(1)} Lakhs</td>
                        <td className="py-3 px-3 font-bold text-rose-400 flex items-center gap-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" /> +₹{(item.overspend / 100000).toFixed(1)}L (+{Math.round((item.overspend / item.planned) * 100)}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
