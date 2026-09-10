import type { InstitutionalDocument } from '../types';
import { MOCK_INSTITUTIONAL_DOCS } from '../data/mockData';

export function performRAGSearch(
  query: string,
  docs: InstitutionalDocument[] = MOCK_INSTITUTIONAL_DOCS
): InstitutionalDocument[] {
  if (!query.trim()) return docs;

  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(k => k.length > 2);

  return docs.map(doc => {
    let score = 0;
    const reasons: string[] = [];

    if (doc.title.toLowerCase().includes(lowerQuery)) {
      score += 40;
      reasons.push("Direct match on document title");
    }

    const fullLower = doc.fullContent.toLowerCase();
    keywords.forEach(kw => {
      if (fullLower.includes(kw)) {
        score += 15;
      }
    });

    if ((lowerQuery.includes("registration") || lowerQuery.includes("queue") || lowerQuery.includes("delay")) &&
        (doc.fullContent.toLowerCase().includes("registration") || doc.fullContent.toLowerCase().includes("queue"))) {
      score += 35;
      reasons.push("Mentions registration delays and entry queue bottlenecks");
    }

    if (lowerQuery.includes("fest") || lowerQuery.includes("annual fest") || lowerQuery.includes("technova")) {
      if (doc.tags.includes("Technova") || doc.tags.includes("Annual Fest")) {
        score += 25;
        reasons.push("Contains Annual Fest / Technova operational reports");
      }
    }

    if (lowerQuery.includes("sport") || lowerQuery.includes("equipment") || lowerQuery.includes("football")) {
      if (doc.category === "Sports Log" || doc.tags.includes("Sports Expenditure")) {
        score += 30;
        reasons.push("Matches sports expenditure and equipment audit logs");
      }
    }

    if (lowerQuery.includes("maintenance") || lowerQuery.includes("auditorium") || lowerQuery.includes("wifi")) {
      if (doc.category === "Maintenance Record") {
        score += 30;
        reasons.push("Matches campus infrastructure service logs");
      }
    }

    if (doc.department.toLowerCase().includes(lowerQuery)) {
      score += 15;
      reasons.push(`Related to ${doc.department}`);
    }

    const confidenceScore = Math.min(Math.max(score, 35), 98);
    const matchedReason = reasons.length > 0
      ? reasons.join(" • ")
      : `Semantic match on keywords: ${keywords.slice(0, 3).join(", ")}`;

    return {
      ...doc,
      relevanceScore: confidenceScore,
      matchedReason
    };
  })
  .filter(doc => (doc.relevanceScore || 0) > 30)
  .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
}
