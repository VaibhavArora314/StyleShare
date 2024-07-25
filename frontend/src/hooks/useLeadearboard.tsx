import { useEffect, useState } from "react";
import { ILeaderboardUser } from "../types";
import axios from "axios";

const useLeaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/v1/posts/all/leaderboard");
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { loading, leaderboard };
};

export default useLeaderboard;
