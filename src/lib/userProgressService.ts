import { doc, getDoc, setDoc, collection, getDocs, query, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { initialBadges, BadgeData } from './badgeData';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  createdAt: string;
  lastUpdated: string;
}

export interface UserBadgeProgress extends BadgeData {
  status: 'Not touched' | 'In Progress' | 'Completed';
  completionDate: string | null;
  notes: string | null;
  updatedAt: string;
}

// Ensure the user document exists.
export const ensureUserExists = async (user: any) => {
  if (!user?.uid) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || 'Student',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      await setDoc(userRef, profile);
      await initializeUserBadges(user.uid);
    }
  } catch (error) {
    console.warn('Failed to ensure user exists (offline):', error);
  }
};

// Initialize badges if they don't exist yet
export const initializeUserBadges = async (uid: string) => {
  // We no longer need to pre-populate all badges to Firestore,
  // we will merge them on the fly in getUserProgress.
};

// Fetch user's badges
export const getUserProgress = async (uid: string): Promise<UserBadgeProgress[]> => {
  const existingBadgesMap = new Map<string, UserBadgeProgress>();
  try {
    const badgesRef = collection(db, 'users', uid, 'badges');
    const snap = await getDocs(badgesRef);
    
    snap.docs.forEach(doc => {
      existingBadgesMap.set(doc.id, doc.data() as UserBadgeProgress);
    });
  } catch (error) {
    console.warn('Failed to fetch user progress (offline), returning defaults:', error);
  }

  const fullProgress: UserBadgeProgress[] = initialBadges.map(badge => {
    if (existingBadgesMap.has(badge.id)) {
      // Keep existing status but update the latest metadata from initialBadges just in case it changed
      return {
        ...existingBadgesMap.get(badge.id)!,
        id: badge.id,
        badgeName: badge.badgeName,
        category: badge.category,
        difficultyLevel: badge.difficultyLevel,
        estimatedCredits: badge.estimatedCredits,
        estimatedHours: badge.estimatedHours,
      };
    }
    return {
      ...badge,
      status: 'Not touched',
      completionDate: null,
      notes: '',
      updatedAt: new Date().toISOString(),
    };
  });
  
  return fullProgress;
};

// Update a single badge's status
export const updateBadgeStatus = async (
  uid: string,
  badgeId: string,
  updates: Partial<Pick<UserBadgeProgress, 'status' | 'completionDate' | 'notes'>>
) => {
  try {
    const docRef = doc(db, 'users', uid, 'badges', badgeId);
    await setDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.warn('Failed to update badge status (offline):', error);
    // Optionally throw error so UI can show failure
  }
};

// Admin: Get all students
export const getAdminAllStudents = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snap = await getDocs(usersRef);
    return snap.docs.map(doc => doc.data() as UserProfile);
  } catch (error) {
    console.warn('Failed to fetch admin all students:', error);
    return [];
  }
};
