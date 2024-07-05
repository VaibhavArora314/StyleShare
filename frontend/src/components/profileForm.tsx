import background from "../assets/bgHero.png";
import {IUser} from "../types.ts";
import {useState} from "react";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

interface ProfileForm{
    user : IUser | null,
    dismiss : () => void
}

export function ProfileForm({user, dismiss} : ProfileForm ){
    const [email, setEmail] = useState(user?.email)
    const [username, setName] = useState(user?.username)
    const [errorMessage, setErrorMessage] = useState("")

    const [error, setError] = useState({
        username: "",
        email: "",
    });

    async function updateUser(e){
        e.preventDefault()
        try {
            const updatedUser = {
                email,
                username
            }
            if(!email){
                toast.error("Email cannot be empty")
            }
            if(!username){
                toast.error("Username cannot be empty")
            }
            const response = await axios.put(`/api/v1/user/update/${user?.id}`,updatedUser);
            toast.success(response.data.message)

        }catch (err){
            console.log(err)
            const axiosError = e as AxiosError<{
                error: {
                    message: string;
                };
            }>;

            setError((e) => {
                if (axiosError?.response?.data?.error)
                    return axiosError?.response?.data?.error as typeof e;

                toast.error("An unexpected error occurred");
                return e;
            });
        }
        dismiss()
    }

    // if (error) {
    //     return <div className='text-red-500 font-semibold text-lg text-center'>{error}</div>
    // }

    return(
        <>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-gray-300  pb-4 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="relative bg-white h-24 w-full">
                                        <img className="h-24 w-full aspect-auto object-cover" src={background} alt="cover photo"/>
                                        <div className="absolute -bottom-10 left-10">
                                            <img
                                                className="inline-block h-20 w-20  ring-2 ring-white"
                                                src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=false&bold=true`}
                                                alt="profile photo"
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div>
                                        <h3 className=" font-semibold mx-5  mt-16 text-gray-900">Personal Information</h3>
                                        <form id="editProfile" onSubmit={updateUser}>
                                            <div className="space-y-12">
                                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-12 mx-5">
                                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Username
                                                        </label>
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                <input
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    autoComplete="username"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                                                    placeholder="janesmith"
                                                                    value={username}
                                                                    onChange={(e)=>{setName(e.target.value)}}
                                                                />
                                                                <p className="text-sm font-semibold mb-2 text-red-600">
                                                                    {error.username}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-12 mx-5">
                                                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Email
                                                        </label>
                                                        <div className="mt-2">
                                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                <input
                                                                    value={email}
                                                                    onChange={(e)=>{setEmail(e.target.value)}}
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    autoComplete="email"
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 w-75"
                                                                    placeholder="janesmith@gmail.com"
                                                                />
                                                                <p className="text-sm font-semibold mb-2 text-red-600">
                                                                    {error.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button form="editProfile" type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Save</button>
                                <button onClick={dismiss} type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}