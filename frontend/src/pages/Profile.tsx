import { useEffect, useState } from "react";
import { IUser } from "../types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { GoUnverified } from "react-icons/go";
import { GoVerified } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiTwotoneInfoCircle } from "react-icons/ai";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage('Failed to fetch user details');
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
      setVerificationError("OTP sent to your mail");
    } catch (error:any) {
      console.log(error)
      setVerificationError(error.response.data.error.message||'Failed to generate OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('/api/v1/user/verify-otp', { otp: Number(otp) }, {
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
    } catch (error:any) {
      console.log(error)
      setVerificationError(error.response.data.error.message||'Failed to generate OTP');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className='text-red-500 font-semibold text-lg text-center'>{errorMessage}</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 text-white flex flex-col items-center">
        <div className="w-80 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500">
          <div className="p-2 flex justify-end mr-2">
            {
              user?.verified ?
                <GoVerified className="text-2xl text-white" title="Verified" />
                :
                <GoUnverified className="text-2xl text-white" title="Unverified" />
            }
          </div>
          <div className="flex flex-col items-center mb-3">
            <img src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} width={60} alt="profile-pic" />
            <p className="p-4 text-xl">{user?.username}</p>
            <p className="text-sky-400 flex items-center"><MdOutlineMailOutline className="text-xl" /> <span className="ml-2 text-sm">{user?.email}</span></p>
          </div>
        </div>
        {
          !user?.verified && (
            <div className="w-80 mt-6 bg-red-950 backdrop-blur-sm rounded-sm p-3 border border-dashed border-red-500">
              <div className="flex justify-between items-center">
                <p className="font-sans text-sm text-white">Please verify your account</p>
                <button className="bg-red-500 py-2 px-3 rounded-md text-sm hover:bg-red-600" onClick={handleGenerateOtp}>{otpSent ? "Resend OTP" : "Verify"}</button>
              </div>
              {
                otpSent && (
                  <form method="post" action="#" className="flex justify-around items-center mt-5 mb-4" onSubmit={(e)=>{
                    e.preventDefault()
                    handleVerifyOtp()
                  }}>
                    <input className="outline-none py-2 px-8 text-black text-md box-content" placeholder="Enter OTP" type="number" name="otp" id="otp" onChange={(e) => { setOtp(e.target.value) }} value={otp} min={100000} max={999999} required />
                    <button className="bg-blue-500 py-2 px-5 rounded-md text-xs hover:bg-blue-600">Verify OTP</button>
                  </form>
                )
              }
              {
                verificationError && (
                  <div className="py-2 text-sm text-red-300 flex justify-start flex-wrap items-center font-mono"><AiTwotoneInfoCircle className="text-red-500 text-lg me-2" />{verificationError}</div>
                )
              }
            </div>
          )
        }
        <div className="mt-8 w-full">
          <h4 className="font-semibold">Posts ( {user?.posts.length} )</h4>
          <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">

            {user?.posts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
