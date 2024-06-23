import axios from "axios";

export const followUser = async (userId: string, token: string) => {
    const response = await axios.post(
      `/api/v1/user/${userId}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  
  export  const unfollowUser = async (userId: string, token: string) => {
    const response = await axios.post(
      `/api/v1/user/${userId}/unfollow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  
export  const getFollowStatus = async (userId: string, token: string) => {
    const response = await axios.get(
      `/api/v1/user/${userId}/follow-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };