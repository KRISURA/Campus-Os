import React, { useState } from 'react';
import { MOCK_SPORT_TEAMS, MOCK_SPORTS_EXPENDITURE } from '../../data/mockData';
import { Trophy, Users, Shield, MapPin, Activity, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const SportsModule: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('ALL');

  const teams = selectedSport === 'ALL' ? MOCK_SPORT_TEAMS : MOCK_SPORT_TEAMS.filter(t => t.sportName === selectedSport);
  const expenses = selectedSport === 'ALL' ? MOCK_SPORTS_EXPENDITURE : MOCK_SPORTS_EXPENDITURE.filter(e => e.sportName === selectedSport);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Chart Data prep
  const categoryMap: Record<string, number> = {};
  expenses.forEach(e => { categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount; });
  const pieData = Object.keys(categoryMap).map(k => ({ name: k, value: categoryMap[k] }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Trophy className="w-6 h-6 text-amber-400" /> Sports Intelligence Hub</h1>
          <p className="text-sm text-slate-400">Manage varsity teams, facilities, equipment, and council budget.</p>
        </div>
        <select 
          value={selectedSport} 
          onChange={(e) => setSelectedSport(e.target.value)} 
          className="bg-slate-900 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 shadow-inner"
        >
          <option value="ALL">All Sports</option>
          {MOCK_SPORT_TEAMS.map(t => <option key={t.id} value={t.sportName}>{t.sportName}</option>)}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Varsity Athletes</div>
          <div className="text-3xl font-extrabold text-white mt-1">{teams.reduce((acc, t) => acc + t.playersCount, 0)}</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Expenditure (3 Yrs)</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">₹{(totalSpent / 100000).toFixed(2)}L</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Major Achievements</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{teams.reduce((acc, t) => acc + t.achievements.length, 0)}</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Upcoming Competitions</div>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">{teams.reduce((acc, t) => acc + t.upcomingCompetitions.length, 0)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Teams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2"><Shield className="w-5 h-5 text-blue-400" /> Varsity Teams</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teams.map(team => (
                <div key={team.id} className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between h-full gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white text-base">{team.sportName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${team.equipmentStatus === 'Good' || team.equipmentStatus === 'New' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        Eq: {team.equipmentStatus}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-blue-400" /> {team.playersCount} Players • Capt: {team.captain}</div>
                      <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-purple-400" /> {team.coach}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {team.facility}</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-medium">
                    🏆 {team.achievements[0] || 'No recent achievements'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Expenditure & Analytics */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-emerald-400" /> Spending by Category</h3>
            <div className="h-64 min-h-[256px]">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value: any) => `₹${Number(value || 0).toLocaleString()}`} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">
                  No expenditure records for selected filter.
                </div>
              )}
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div> <span className="text-slate-300">{d.name}</span></div>
                  <div className="font-bold text-white">₹{d.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
