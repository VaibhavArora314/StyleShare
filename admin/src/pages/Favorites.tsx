import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { IFavoritePost } from "../types";
import { ColorRing } from 'react-loader-spinner';
import { RiHeartsFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

const Favorites = () => {
  const [favoritePosts, setFavoritePosts] = useState<IFavoritePost[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title = "Style Share Admin | Users Favorites 💓";

  useEffect(() => {
    const fetchFavoritePosts = async () => {
      try {
        const response = await axios.get("/api/v1/admin/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritePosts(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
        setLoading(true);
      }
    };

    fetchFavoritePosts();
  }, [token]);

  const downloadUsersFavoritesReport = async () => {
    try {
      const response = await axios.get('/api/v1/admin/downloadusersfavoritesreport', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'StyleShare_Favorites_Report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading users favorites report:', error);
    }
  };

  return (
    <div>
      <div className="flex-1 flex flex-col lg:ml-80">
        <div className="mx-5 mb-5">
          <span className="flex items-center text-xl font-bold decoration-sky-500 decoration-dotted underline">
            <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
              <RiHeartsFill size={23} />
            </div>
            Users Favorite Posts
          </span>
        </div>
        {loading ?
          <div className="flex justify-center items-center h-80">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
            />
          </div>
          :
          <>
          <div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
            <table className="w-full rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs md:text-sm text-white uppercase bg-sky-500 text-center">
                <tr>
                  <th scope="col" className="px-8 py-3 text-start">Photo</th>
                  <th scope="col" className="px-8 py-3 text-start">Name</th>
                  <th scope="col" className="px-6 py-3">Post Title</th>
                  <th scope="col" className="px-6 py-3">Marked At</th>
                </tr>
              </thead>
              <tbody>
                {favoritePosts.map(favorite => (
                  <tr key={favorite.id} className="text-xs md:text-sm text-center border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                    <td className="pl-7">
                      <img className="h-10 w-10 rounded-full" src={favorite.user?.avatar?.replace('/app', '/admin') || `https://ui-avatars.com/api/?name=${favorite.user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                    </td>
                    <td className="px-8 py-4 font-semibold">
                      <div className="flex flex-col items-start">
                        <span className="font-bold">{favorite.user.username}</span>
                        <span className="font-thin text-gray-300">{favorite.user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-semibold">{favorite.post.title}</td>
                    <td className="px-8 py-4 font-semibold">{new Date(favorite.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-5 overflow-x-auto rounded-xl mb-5">
          <button onClick={downloadUsersFavoritesReport} className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 bg-yellow-500 hover:bg-yellow-600 text-gray-100"><TbReportAnalytics size={23} className='mr-3'/>
              Download Favorites Info
            </button>
          </div>
          </>
        }
      </div>
    </div>
  );
};

export default Favorites;
