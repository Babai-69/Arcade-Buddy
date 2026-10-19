import { useState, useEffect } from 'react';

export interface ArcadeGame {
  title: string;
  img: string;
  link: string;
  code: string;
}

export const fetchArcadeGames = async (): Promise<ArcadeGame[]> => {
  return [
    { title: "Trick-or-Metric", img: "https://cdn.qwiklabs.com/egGXB2O1a%2FE9AyKSEhqR6VT%2B2q2IYzRUVpnKq01t8Vs%3D", code: "1q-spooky-33057", link: "https://www.skills.google/games/7501?utm_source=googleskills&utm_medium=lp&utm_campaign=Special-oct-arcade26" },
    { title: "Arcade Simulator: Site Reliability Engineer", img: "https://cdn.qwiklabs.com/L1FH5LXPUmyNNjsh0wi7dvLLkEDrUKFi3eCr19ACahk%3D", code: "1q-reliability-21924", link: "https://www.skills.google/games/7500?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-Oct-arcade26" },
    { title: "Arcade Base Camp October 2026", img: "https://cdn.qwiklabs.com/XX6TBY4WGw0qTQBzPkf5z8hpAPsIOfDbwNPwHp3LR%2FY%3D", code: "1q-basecamp-61332", link: "https://www.skills.google/games/7499?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Oct-arcade26" },
    { title: "Arcade Adventure: Google Cloud ML APIs", img: "https://cdn.qwiklabs.com/mkoIY%2BWP3AjkE2pV28nDchQkvg3VDSxJ2Maf%2FEheDVc%3D", code: "1q-endpoint-01297", link: "https://www.skills.google/games/7496?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-Oct-arcade26" },
    { title: "Arcade Voyage: Language, Voice, and Multimodal Processing", img: "https://cdn.qwiklabs.com/Jd67MBegBqwMu3lOagKDHP0%2F9%2F%2FTPrS%2BVuLObJE63kc%3D", code: "1q-synthesis-10713", link: "https://www.skills.google/games/7497?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Oct-arcade26" },
    { title: "Arcade Trail: Containers & Load Balancing", img: "https://cdn.qwiklabs.com/hFJgxpXlvVjsfaiyu4L9VUhfwA169ubJBgyd76uAj%2Bg%3D", code: "1q-package-53921", link: "https://www.skills.google/games/7498?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Oct-arcade26" }
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
