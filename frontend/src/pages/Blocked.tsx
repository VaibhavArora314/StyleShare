import block from '../assets/block.png';
import bg from '../assets/bgHero.png';
import toast, { Toaster } from 'react-hot-toast';

const Blocked = () => {

  const handleCopy = () => {
    navigator.clipboard.writeText("admin@gmail.com");
    toast.success("Admin Email copied");
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="mx-2 bg-white p-10 rounded-lg shadow-xl text-center">
        <div className="flex items-center justify-center mb-5">
          <img src={block} className="sm:w-11 w-7 mr-1" alt="Blocked" />
          <h1 className="sm:text-3xl font-extrabold text-red-600 text-xl">Account Suspended</h1>
        </div>
        <p className="sm:text-lg font-semibold text-gray-700 mb-3 text-sm">
          We have detected suspicious activity on your account. As a precaution, your account has been temporarily suspended.
        </p>
        <p className="sm:text-lg font-semibold text-gray-700 mb-8 text-sm">
          If you believe this is a mistake, please contact the admin to resolve this issue.
        </p>
        <button onClick={handleCopy}
          className="text-sm inline-block px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full font-semibold sm:text-xl"
        >
          Contact Admin
        </button>
      </div>
      <Toaster/>
    </div>
  );
}

export default Blocked;
