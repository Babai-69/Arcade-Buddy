import { useState, useEffect } from 'react';

export interface ArcadeGame {
  title: string;
  img: string;
  link: string;
  code: string;
}

export const fetchArcadeGames = async (): Promise<ArcadeGame[]> => {
  return [
    { title: "Arcade Simulator: DevOps Engineer", img: "https://services.google.com/fh/files/events/gcaf26_arcade_sim_sep.png", code: "1q-devops-065131", link: "https://www.skills.google/games/7445?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-Sep-arcade26" },
    { title: "Pitch Perfect", img: "https://services.google.com/fh/files/events/gcaf26_pitch_perfect_game_sep.png", code: "1q-analysis-5026", link: "https://www.skills.google/games/7446?utm_source=googleskills&utm_medium=lp&utm_campaign=Special-Sep-arcade26" },
    { title: "Arcade Base Camp September 2026", img: "https://services.google.com/fh/files/events/gcaf26_basecamp_sep.png", code: "1q-basecamp-09304", link: "https://www.skills.google/games/7444?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Sep-arcade26" },
    { title: "Arcade Adventure September 2026", img: "https://services.google.com/fh/files/events/gcaf26_adventure_sep.png", code: "1q-architecture-01381", link: "https://www.skills.google/games/7441?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-Sep-arcade26" },
    { title: "Arcade Voyage September 2026", img: "https://services.google.com/fh/files/events/gcaf26_voyage_sep.png", code: "1q-microservice-9210", link: "https://www.skills.google/games/7442?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Sep-arcade26" },
    { title: "Arcade Trail September 2026", img: "https://services.google.com/fh/files/events/gcaf26_trail_sep.png", code: "1q-vpcpeering-3469", link: "https://www.skills.google/games/7443?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Sep-arcade26" }
  ];
};

export const useArcadeGames = () => {
  const [activeGames, setActiveGames] = useState<ArcadeGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadGames = async () => {
      setLoading(true);
      try {
        const fetchedGames = await fetchArcadeGames();
        if (isMounted) {
          setActiveGames(fetchedGames);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load active games.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadGames();
    return () => {
      isMounted = false;
    };
  }, []);

  return { activeGames, loading, error };
};
