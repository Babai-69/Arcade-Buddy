export interface BadgeRecord {
  id: string;
  title: string;
  earnedDate: string;
  category: 'Game' | 'Skill' | 'Lab-free' | 'Special' | 'Other';
  points: number;
}

export interface Participant {
  id: string;
  name: string;
  avatarUrl?: string; // Optional avatar URL
  email: string;
  profileUrl: string;
  arcadePoints: number;
  skillBadges: number;
  gameBadges: number;
  triviaBadges: number;
  specialBadges?: number;
  badges?: BadgeRecord[];
  milestoneEarned: string;
  dailyPoints: number; // For diffing (if we implement persistent diff)
  totalPoints: number;
  lastUpdated: string;
  previousRank: number;
  currentRank: number;
}

export interface Milestone {
  id: string;
  name: string;
  requiredPoints: number;
  reward: string;
  colorClass: string;
  textClass: string;
}

export const MILESTONES: Milestone[] = [
  { id: 'milestone-1', name: 'Trooper', requiredPoints: 50, reward: 'Milestone 1', colorClass: 'bg-[#4285F4]', textClass: 'text-[#4285F4]' },
  { id: 'milestone-2', name: 'Ranger', requiredPoints: 75, reward: 'Milestone 2', colorClass: 'bg-[#34A853]', textClass: 'text-[#34A853]' },
  { id: 'milestone-3', name: 'Champion', requiredPoints: 95, reward: 'Milestone 3', colorClass: 'bg-[#FBBC05]', textClass: 'text-[#FBBC05]' },
  { id: 'milestone-4', name: 'Legend', requiredPoints: 120, reward: 'Ultimate Milestone', colorClass: 'bg-[#EA4335]', textClass: 'text-[#EA4335]' },
];

export interface DashboardStats {
  totalParticipants: number;
  totalPoints: number;
  activeToday: number;
  lastUpdated: string;
}
