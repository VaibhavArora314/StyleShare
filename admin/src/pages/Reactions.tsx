import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { ColorRing } from 'react-loader-spinner';
import { MdAddReaction } from "react-icons/md";
import { IReaction} from "../types";  

const Reactions = () => {
  const [reactions, setReactions] = useState<IReaction[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title = "Style Share Admin | Manage Reactions 📊"

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get("/api/v1/admin/getreactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReactions(response.data.reactions.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reactions:", error);
        setLoading(true);
      }
    };

    fetchReactions();
  }, [token]);

  return (
    <div>
      <div className="flex-1 flex flex-col lg:ml-80">
        <div className="mx-5 mb-5">
        <span className="flex  items-center  text-xl font-bold decoration-sky-500 decoration-dotted underline">
          <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <MdAddReaction size={23} />
          </div>
          All Reactions
        </span>
      </div>
      {loading ? 
        <div className="flex justify-center items-center h-80">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)','#000435','rgb(14 165 233)']}
        />
      </div>
      :
      <div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
      <table className="w-full rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-sm text-white uppercase bg-sky-500 text-center">
          <tr>
            <th scope="col" className="px-5 py-3">Photo</th>
            <th scope="col" className="px-6 py-3 text-left">User</th>
            <th scope="col" className="px-9 py-3">Reaction Type</th>
            <th scope="col" className="px-6 py-3 ">Post Title</th>
            <th scope="col" className="px-6 py-3">Author</th>
            <th scope="col" className="px-6 py-3">Reacted At</th>
          </tr>
        </thead>
        <tbody>
          {reactions.map(reaction => (
            <tr key={reaction.user.id + reaction.post.id + reaction.type} className="text-xs md:text-sm text-center border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
            <td className="pl-7">
                <img className="h-10 w-10 rounded-full" src={reaction.user?.avatar?.replace('/app', '/admin') || `https://ui-avatars.com/api/?name=${reaction.user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
            </td>
              <td className="px-6 py-4 font-semibold">
                <div className="flex flex-col items-start">
                  <span className="font-bold">{reaction.user.username}</span>
                  <span className="font-thin text-gray-300">{reaction.user.email}</span>
                </div>
              </td>
              <td className="py-4 font-semibold">{reaction.type}</td>
              <td className="px-8 py-4 font-semibold">{reaction.post.title}</td>
              <td className="px-8 py-4 font-semibold">{reaction.post.author.username}</td>
              <td className="px-8 py-4 font-semibold">{new Date(reaction.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
      }
      </div>
    </div>
  );
};

export default Reactions;
