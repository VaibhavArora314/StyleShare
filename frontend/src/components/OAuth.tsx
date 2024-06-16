import {GoogleAuthProvider,getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {
    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        }
        catch(err){
            console.log('error',err)
        }
    }
  return (
    <div >
        <button onClick={handleGoogleClick} className="flex justify-center items-center  py-1 m-2 px-10 bg-white border border-gray-300 rounded-md shadow focus:ring-blue-500">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google logo" className="w-5 h-5 mr-2"/>
        <span className="text-lg text-gray-700  ">Continue with Google</span>
    </button>
    </div>
  )
}
