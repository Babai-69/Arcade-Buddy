import { useState, useEffect } from 'react';

export interface ArcadeGame {
  title: string;
  img: string;
  link: string;
  code: string;
}

export const fetchArcadeGames = async (): Promise<ArcadeGame[]> => {
  try {
    const response = await fetch('/api/arcade-activity');
    if (!response.ok) {
      throw new Error('Failed to fetch arcade games');
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
      const text = await response.text();
      console.error("API returned non-JSON:", text.substring(0, 100));
      return [];
    }
    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching arcade games:', error);
    return [];
  }
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
