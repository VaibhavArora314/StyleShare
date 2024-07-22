import { IUser } from "../types.ts";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "../styles/Model.css"

interface ProfileForm {
    user: IUser | null,
    dismiss: () => void,
    open: boolean,
}

export function ProfileForm({ user, dismiss, open }: ProfileForm) {
    const [email, setEmail] = useState(user?.email)
    const [username, setName] = useState(user?.username)
    const [error, setError] = useState({
        username: "",
        email: "",
        message: ""
    });

    async function updateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const updatedUser = {
                email,
                username
            }
            if (!email) {
                toast.error("Email cannot be empty")
                return;
            }
            if (!username) {
                toast.error("Username cannot be empty")
                return;
            }
            const response = await axios.put(`/api/v1/user/update/${user?.id}`, updatedUser);
            toast.success(response.data.message)
            dismiss()
            window.location.reload();
        } catch (e: any) {
            const axiosError: AxiosError<{
                error: {
                    message: string;
                };
            }> = e;

            const errorMessage = axiosError?.response?.data?.error?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            setError((e: any) => {
                if (axiosError?.response?.data?.error)
                    e = axiosError?.response?.data?.error;
                return e
            })
        }
    }

    return (
        <Modal open={open} onClose={dismiss} center classNames={{ modal: 'customModal', overlay: 'customOverlay' }}>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="flex items-center mb-6">
                    <img
                        className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                        src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`}
                        alt="profile photo"
                    />
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                </div>
                <form id="editProfile" onSubmit={updateUser}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                    className="block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                    className="block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="janesmith@gmail.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                {error.email && <p className="mt-2 text-sm text-red-600">{error.email}</p>}
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
