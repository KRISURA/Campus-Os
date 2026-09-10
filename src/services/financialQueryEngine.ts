import { MOCK_FINANCIAL_RECORDS, MOCK_SPORTS_EXPENDITURE } from '../data/mockData';

export interface FinancialQueryResult {
  query: string;
  summaryText: string;
  totalAmount: number;
  yearComparison: Array<{ year: number; totalSpent: number; totalBudget: number; variance: number }>;
  categoryBreakdown: Array<{ name: string; amount: number; percentage: number }>;
  vendorBreakdown: Array<{ name: string; amount: number }>;
  overbudgetEvents: Array<{ eventName: string; year: number; planned: number; actual: number; overspend: number }>;
  chartType: 'bar' | 'pie' | 'line';
}

export function executeFinancialQuery(query: string): FinancialQueryResult {
  const lower = query.toLowerCase();

  // Scenario 1: Annual Fest 3-Year Spending / Comparison
  if (lower.includes("annual fest") || lower.includes("fest") || lower.includes("technova")) {
    const festRecords = MOCK_FINANCIAL_RECORDS.filter(r => r.eventName.toLowerCase().includes("fest"));

    const totalAmount = festRecords.reduce((acc, curr) => acc + curr.amount, 0);

    const yearMap: Record<number, { spent: number; budget: number }> = {};
    const catMap: Record<string, number> = {};
    const vendorMap: Record<string, number> = {};

    festRecords.forEach(r => {
      if (!yearMap[r.year]) yearMap[r.year] = { spent: 0, budget: 0 };
      yearMap[r.year].spent += r.actualSpent;
      yearMap[r.year].budget += r.plannedBudget;

      const catName = r.vendor.includes("Catering") ? "Food & Catering" :
                      r.vendor.includes("Stage") ? "Stage & Audio" :
                      r.vendor.includes("Security") ? "Security & Crowd" :
                      r.vendor.includes("Logistics") ? "Transport & Logistics" :
                      r.vendor.includes("Media") ? "Marketing & PR" : "Artist & Performers";

      catMap[catName] = (catMap[catName] || 0) + r.amount;
      vendorMap[r.vendor] = (vendorMap[r.vendor] || 0) + r.amount;
    });

    const yearComparison = Object.keys(yearMap).map(y => {
      const yr = Number(y);
      return {
        year: yr,
        totalSpent: yearMap[yr].spent,
        totalBudget: yearMap[yr].budget,
        variance: yearMap[yr].spent - yearMap[yr].budget
      };
    });

    const categoryBreakdown = Object.keys(catMap).map(c => ({
      name: c,
      amount: catMap[c],
      percentage: Math.round((catMap[c] / totalAmount) * 100)
    }));

    const vendorBreakdown = Object.keys(vendorMap).map(v => ({
      name: v,
      amount: vendorMap[v]
    }));

    return {
      query,
      summaryText: `Over the last three years (2024–2026), total expenditure on the Annual Fest was ₹${(totalAmount / 100000).toFixed(1)} Lakhs. Spending increased year-over-year: 2024 (₹18.2L) → 2025 (₹21.4L) → 2026 (₹24.1L). Catering and Stage/Audio constituted over 52% of total costs.`,
      totalAmount,
      yearComparison,
      categoryBreakdown,
      vendorBreakdown,
      overbudgetEvents: [
        { eventName: "Technova 2024", year: 2024, planned: 1670000, actual: 1820000, overspend: 150000 },
        { eventName: "Technova 2025", year: 2025, planned: 1800000, actual: 2140000, overspend: 340000 },
        { eventName: "Technova 2026", year: 2026, planned: 2080000, actual: 2410000, overspend: 330000 }
      ],
      chartType: 'bar'
    };
  }

  // Scenario 2: Sports Spending
  if (lower.includes("sport") || lower.includes("sports") || lower.includes("football") || lower.includes("cricket")) {
    const totalSportsAmount = MOCK_SPORTS_EXPENDITURE.reduce((sum, s) => sum + s.amount, 0) + 1990000;

    return {
      query,
      summaryText: `Cumulative Sports expenditure over 3 years stands at ₹34.5 Lakhs (2024: ₹8.5L, 2025: ₹11.2L, 2026: ₹14.8L). Football received the highest allocation (₹11.8L, 34%), followed by Cricket (₹9.5L, 27%). Outstation travel & lodging saw a 45% increase in 2025-2026.`,
      totalAmount: totalSportsAmount,
      yearComparison: [
        { year: 2024, totalSpent: 850000, totalBudget: 800000, variance: 50000 },
        { year: 2025, totalSpent: 1120000, totalBudget: 1000000, variance: 120000 },
        { year: 2026, totalSpent: 1480000, totalBudget: 1300000, variance: 180000 }
      ],
      categoryBreakdown: [
        { name: "Equipment & Kits", amount: 1450000, percentage: 42 },
        { name: "Travel & Lodging", amount: 1180000, percentage: 34 },
        { name: "Facility Repair & Turf", amount: 550000, percentage: 16 },
        { name: "Coaching & Referees", amount: 270000, percentage: 8 }
      ],
      vendorBreakdown: [
        { name: "Cosco & Yonex Supplies", amount: 890000 },
        { name: "InterCity Express Travel", amount: 680000 },
        { name: "Nike Athletic Gear", amount: 420000 }
      ],
      overbudgetEvents: [
        { eventName: "State League Football Finals", year: 2025, planned: 250000, actual: 320000, overspend: 70000 }
      ],
      chartType: 'pie'
    };
  }

  // Scenario 3: Default / Budget Variance Query
  return {
    query,
    summaryText: `Institutional financial summary: Total tracked expenditure across 2024-2026 is ₹1.18 Crores. Major cost centers are Annual Fests (54%), Campus Wi-Fi & IT Infrastructure (18%), Sports Council (15%), and Estate Maintenance (13%).`,
    totalAmount: 11800000,
    yearComparison: [
      { year: 2024, totalSpent: 3450000, totalBudget: 3200000, variance: 250000 },
      { year: 2025, totalSpent: 4020000, totalBudget: 3700000, variance: 320000 },
      { year: 2026, totalSpent: 4330000, totalBudget: 3900000, variance: 430000 }
    ],
    categoryBreakdown: [
      { name: "Events & Fests", amount: 6370000, percentage: 54 },
      { name: "IT & Wi-Fi Infra", amount: 2120000, percentage: 18 },
      { name: "Sports Council", amount: 1770000, percentage: 15 },
      { name: "Estate Maintenance", amount: 1540000, percentage: 13 }
    ],
    vendorBreakdown: [
      { name: "TastyBites Catering", amount: 1810000 },
      { name: "AcousticPro Stage & Sound", amount: 1550000 },
      { name: "Cisco Enterprise Networks", amount: 750000 }
    ],
    overbudgetEvents: [
      { eventName: "Technova 2025 Food Stalls", year: 2025, planned: 500000, actual: 610000, overspend: 110000 },
      { eventName: "Block A Wi-Fi Hardware", year: 2026, planned: 700000, actual: 750000, overspend: 50000 }
    ],
    chartType: 'bar'
  };
}
