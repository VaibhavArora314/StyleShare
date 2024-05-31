import { useEffect, useState } from "react";
import { IUser } from "../types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleGenerateOtp = async () => {
    try {
      await axios.post('/api/v1/user/generate-otp', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOtpSent(true);
      setVerificationError("");
    } catch (error) {
      setVerificationError('Failed to generate OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('/api/v1/user/verify-otp', { otp:Number(otp) }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(u => {
        if (!u) return u;

        u.verified = true;
        return u
      });
      setOtpSent(false);
      setOtp("");
      setVerificationError("");
    } catch (error) {
      setVerificationError('Failed to verify OTP');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='text-red-500 font-semibold text-lg text-center'>{error}</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 text-white">
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>

      <p>{user?.verified ? "Verified" : "User is not verified"}</p>

      {!user?.verified && (
        <div>
          <button onClick={handleGenerateOtp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {otpSent ? "Regenerate OTP" : "Verify Email"}
          </button>
          {otpSent && (
            <div>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-2 p-2 border rounded text-gray-800"
              />
              <button onClick={handleVerifyOtp} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Verify OTP
              </button>
            </div>
          )}
          {verificationError && (
            <div className='text-red-500 mt-2'>{verificationError}</div>
          )}
        </div>
      )}

      {user?.posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Profile;
