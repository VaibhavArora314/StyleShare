import { IUser } from "../types.ts";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "../styles/Model.css"
import avatar1 from "../assets/avatars/avatar1.jpg"
import avatar2 from "../assets/avatars/avatar2.jpg"
import avatar3 from "../assets/avatars/avatar3.jpg"
import avatar4 from "../assets/avatars/avatar4.jpg"
import avatar5 from "../assets/avatars/avatar5.jpg"

interface ProfileForm {
    user: IUser | null,
    dismiss: () => void,
    open: boolean,
}

export function ProfileForm({ user, dismiss, open }: ProfileForm) {
    const [email, setEmail] = useState(user?.email);
    const [username, setName] = useState(user?.username);
    const [twitter, setTwitter] = useState(user?.twitter || "");
    const [github, setGithub] = useState(user?.github || "");
    const [linkedin, setLinkedin] = useState(user?.linkedin || "");
    const [portfolio, setportfolio] = useState(user?.portfolio || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");
    const [error, setError] = useState({
        username: "",
        email: "",
        twitter: "",
        facebook:"",
        github:"",
        linkedin:"",
        portfolio:"",
        avatar: "",
        message: ""
    });

    const avatars = [
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5
    ];

      async function updateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          const updatedUser = {
            email,
            username,
            twitter,
            github,
            linkedin,
            portfolio,
            avatar
          };
          if (!email) {
            toast.error("Email cannot be empty");
          }
          if (!username) {
            toast.error("Username cannot be empty");
          }
          const response = await axios.put(`/api/v1/user/update/${user?.id}`, updatedUser);
          toast.success(response.data.message);
          dismiss();
          window.location.reload();
        } catch (e: any) {
          const axiosError: AxiosError<{
            error: {
              message: string;
            };
          }> = e;
    
          const errorMessage = axiosError?.response?.data?.error?.message || "An unexpected error occurred";
          toast.error(errorMessage);
          setError((e : any)=> {
            if(axiosError?.response?.data?.error)
                e = axiosError?.response?.data?.error ;
            return e
        });
        }
      }

    return (
        <Modal open={open} onClose={dismiss} center classNames={{ modal: 'customModal', overlay: 'customOverlay' }}>
    <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Personal Information</h3>
        <div className="flex flex-col sm:flex-row items-center mb-6">
            <img
                className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                src={avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=false&bold=true`}
                alt="profile photo"
            />
            <div className="sm:ml-4 mt-4 sm:mt-0">
                <p className="text-sm font-bold text-gray-900">{user?.username}</p>
                <p className="text-sm font-semibold text-gray-600">{user?.email}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-5 w-full sm:w-auto">
                <label htmlFor="avatar" className="block text-sm font-semibold leading-6 text-gray-900">
                  Select Avatar
                </label>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {avatars.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt="avatar"
                      className={`h-16 w-16 cursor-pointer rounded-full ${avatar === img ? 'ring-4 ring-sky-600' : ''}`}
                      onClick={() => setAvatar(img)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="my-3 px-4 rounded-md border border-transparent bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
                  onClick={() => setAvatar('')}
                >
                  Reset
                </button>
                <p className="text-sm font-semibold text-red-600">{error.avatar}</p>
            </div>
        </div>
        <form id="editProfile" onSubmit={updateUser}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="janesmith"
                            value={username}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        {error.username && <p className="mt-2 text-sm text-red-600">{error.username}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="janesmith@gmail.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {error.email && <p className="mt-2 text-sm text-red-600">{error.email}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="twitter" className="block text-sm font-semibold text-gray-900">
                        Twitter Url
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            name="twitter"
                            id="twitter"
                            autoComplete="twitter"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://twitter.com/yourprofile"
                            value={twitter}
                            onChange={(e) => { setTwitter(e.target.value) }}
                        />
                        {error.twitter && <p className="mt-2 text-sm text-red-600">{error.twitter}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="github" className="block text-sm font-semibold text-gray-900">
                        Github Url
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            name="github"
                            id="github"
                            autoComplete="github"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://github.com/yourprofile"
                            value={github}
                            onChange={(e) => { setGithub(e.target.value) }}
                        />
                        {error.github && <p className="mt-2 text-sm text-red-600">{error.github}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-900">
                        Linkedin Url
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            name="linkedin"
                            id="linkedin"
                            autoComplete="linkedin"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://linkedin.com/yourprofile"
                            value={linkedin}
                            onChange={(e) => { setLinkedin(e.target.value) }}
                        />
                        {error.linkedin && <p className="mt-2 text-sm text-red-600">{error.linkedin}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-900">
                        Portfolio Url
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            name="portfolio"
                            id="portfolio"
                            autoComplete="portfolio"
                            className="w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://yourportfolio.com"
                            value={portfolio}
                            onChange={(e) => { setportfolio(e.target.value) }}
                        />
                        {error.portfolio && <p className="mt-2 text-sm text-red-600">{error.portfolio}</p>}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button onClick={dismiss} type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Cancel
                </button>
                <button form="editProfile" type="submit" className="inline-flex justify-center px-6 rounded-md border border-transparent bg-sky-500 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Save
                </button>
            </div>
        </form>
    </div>
</Modal>

    )
}
