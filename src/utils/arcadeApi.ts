import { useState, useEffect } from 'react';

export interface ArcadeGame {
  title: string;
  img: string;
  link: string;
  code: string;
}

export const fetchArcadeGames = async (): Promise<ArcadeGame[]> => {
  return [
    { title: "Trick-or-Metric", img: "https://services.google.com/fh/files/events/gcaf26_trick_or_metric_oct.png", code: "1q-spooky-33057", link: "https://www.skills.google/games/7488?utm_source=googleskills&utm_medium=lp&utm_campaign=trick-or-metric-Oct-arcade26" },
    { title: "Arcade Simulator: Site Reliability Engineer", img: "https://services.google.com/fh/files/events/gcaf26_arcade_sim_oct.png", code: "1q-reliability-21924", link: "https://www.skills.google/games/7485?utm_source=googleskills&utm_medium=lp&utm_campaign=spegame-Oct-arcade26" },
    { title: "Arcade Base Camp October 2026", img: "https://services.google.com/fh/files/events/gcaf26_basecamp_oct.png", code: "1q-basecamp-61332", link: "https://www.skills.google/games/7484?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Oct-arcade26" },
    { title: "Arcade Adventure: Google Cloud ML APIs", img: "https://services.google.com/fh/files/events/gcaf26_adventure_oct.png", code: "1q-endpoint-01297", link: "https://www.skills.google/games/7481?utm_source=qwiklabs&utm_medium=lp&utm_campaign=adv-Oct-arcade26" },
    { title: "Arcade Voyage: Language, Voice, and Multimodal Processing", img: "https://services.google.com/fh/files/events/gcaf26_voyage_oct.png", code: "1q-synthesis-10713", link: "https://www.skills.google/games/7482?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Oct-arcade26" },
    { title: "Arcade Trail: Containers & Load Balancing", img: "https://services.google.com/fh/files/events/gcaf26_trail_oct.png", code: "1q-package-53921", link: "https://www.skills.google/games/7483?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Oct-arcade26" }
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
