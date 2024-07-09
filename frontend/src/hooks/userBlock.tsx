import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";

const useUserBlock = (intervalMinutes = 5) => {
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const token = useRecoilValue(tokenState);

  const checkBlockedStatus = async () => {
    if (token) {
      try {
        const response = await axios.get("/api/v1/user/checkBlockedOrUnblock", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.blocked) {
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking blocked status:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBlockedStatus();

    const intervalId = setInterval(() => {
      checkBlockedStatus();
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [token, intervalMinutes]);

  return { loading, isBlocked };
};

export default useUserBlock;
