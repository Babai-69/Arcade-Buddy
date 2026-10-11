import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CommunityParticipant {
  rank: number;
  name: string;
  college: string;
  badgesCompleted: number;
  lastActive?: string;
  avatarText?: string;
  color?: string;
}

export interface CommunityLeaderboardData {
  updatedAt: string | null;
  updatedBy?: string;
  totalParticipants: number;
  participants: CommunityParticipant[];
}

const COLLECTION_NAME = 'community_leaderboard';
const DOC_ID = 'daily_standings';

const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-red-600',
  'from-violet-500 to-purple-600',
  'from-emerald-600 to-green-700',
];

export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Fetch the current community leaderboard from Firestore
 */
export async function getCommunityLeaderboard(): Promise<CommunityLeaderboardData | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data();
    return {
      updatedAt: data.updatedAt || null,
      updatedBy: data.updatedBy || '',
      totalParticipants: data.totalParticipants || (data.participants?.length ?? 0),
      participants: (data.participants || []).map((p: any, idx: number) => ({
        rank: p.rank ?? (idx + 1),
        name: p.name || 'Anonymous Learner',
        college: p.college || p.department || 'BCREC',
        badgesCompleted: Number(p.badgesCompleted ?? p.badges ?? 0),
        lastActive: p.lastActive || 'Recently',
        avatarText: p.avatarText || getInitials(p.name),
        color: p.color || AVATAR_COLORS[idx % AVATAR_COLORS.length]
      }))
    };
  } catch (err) {
    console.warn('Error fetching community leaderboard:', err);
    return null;
  }
}

/**
 * Save / Update the community leaderboard in Firestore
 */
export async function saveCommunityLeaderboard(
  participants: CommunityParticipant[],
  adminEmail: string
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, DOC_ID);
  
  // Sort by badges descending and assign ranks
  const sorted = [...participants].sort((a, b) => b.badgesCompleted - a.badgesCompleted);
  const ranked = sorted.map((item, idx) => ({
    ...item,
    rank: idx + 1,
    avatarText: item.avatarText || getInitials(item.name),
    color: item.color || AVATAR_COLORS[idx % AVATAR_COLORS.length]
  }));

  await setDoc(docRef, {
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail,
    totalParticipants: ranked.length,
    participants: ranked
  }, { merge: true });
}

/**
 * Clear the community leaderboard to locked/blank state
 */
export async function clearCommunityLeaderboard(): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, DOC_ID);
  await deleteDoc(docRef);
}

/**
 * Smart CSV Parser for student daily reports
 */
export function parseCommunityCsv(csvText: string): CommunityParticipant[] {
  const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const header = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
  
  let nameIdx = header.findIndex(h => h.includes('name') || h.includes('student') || h.includes('learner'));
  let collegeIdx = header.findIndex(h => h.includes('college') || h.includes('dept') || h.includes('department') || h.includes('branch'));
  let badgesIdx = header.findIndex(h => h.includes('badge') || h.includes('completed') || h.includes('count') || h.includes('score'));
  let rankIdx = header.findIndex(h => h === 'rank' || h.includes('position') || h === '#');

  // Fallbacks if header names are generic
  if (nameIdx === -1) nameIdx = 0;
  if (collegeIdx === -1) collegeIdx = 1;
  if (badgesIdx === -1) badgesIdx = 2;

  const result: CommunityParticipant[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle comma with quotes
    const row = parseCsvRow(lines[i]);
    if (row.length <= Math.max(nameIdx, badgesIdx)) continue;

    const rawName = row[nameIdx] || '';
    if (!rawName.trim()) continue;

    const rawCollege = collegeIdx >= 0 && row[collegeIdx] ? row[collegeIdx] : 'BCREC';
    const rawBadges = badgesIdx >= 0 ? parseInt(row[badgesIdx].replace(/[^0-9]/g, '') || '0', 10) : 0;
    const rawRank = rankIdx >= 0 ? parseInt(row[rankIdx].replace(/[^0-9]/g, '') || '0', 10) : i;

    result.push({
      rank: rawRank || i,
      name: rawName.trim(),
      college: rawCollege.trim(),
      badgesCompleted: isNaN(rawBadges) ? 0 : rawBadges,
      lastActive: 'Today',
      avatarText: getInitials(rawName),
      color: AVATAR_COLORS[(i - 1) % AVATAR_COLORS.length]
    });
  }

  // Sort by badges descending
  result.sort((a, b) => b.badgesCompleted - a.badgesCompleted);
  return result.map((item, idx) => ({ ...item, rank: idx + 1 }));
}

function parseCsvRow(row: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}
