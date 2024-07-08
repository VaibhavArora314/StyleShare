import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";

const userBlock = () => {
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
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

    checkBlockedStatus();
  }, [token]);

  return { loading, isBlocked };
};

export default userBlock;