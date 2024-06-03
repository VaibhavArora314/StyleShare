import { useRecoilValue } from 'recoil';
import github from '../assets/github.png';
import { Link } from 'react-router-dom';
import { loggedInState } from '../store/atoms/auth';
import { CgProfile } from 'react-icons/cg';
import { BsFilePost } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';

const Footer = () => {

    const isLoggedIn = useRecoilValue(loggedInState);
    const currentYear = new Date().getFullYear();

  return (
    <div className='bg-black text-white p-10'>
        <div className='md:flex'>
            <div className='md:w-1/2'>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Style Share
          </span>
            </div>
            <div className='md:w-3/4 md:flex'>
                <div className='md:w-1/3'>
                    <p className='text-gray-200 font-bold mt-8 md:mt-0'>Company</p>
                    <ul className='text-gray-300 py-4'>
                        <li className='py-1 cursor-pointer'>
                            <Link to='/app/about'>About Us</Link>
                        </li>
                        <li className='py-1 cursor-pointer'>
                            <Link to='/app/contact-us'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className='md:w-1/3'>
                <p className='text-gray-200 font-bold'>Quick Links</p>
                    <ul className='text-gray-300 py-4 cursor-pointer'>
                        <li className='py-1 cursor-pointer'>
                            <Link className='flex items-center gap-1' to='/app/posts'>
                                All Posts
                                <BsFilePost size={20} />
                            </Link>
                        </li>
                        <li className='py-1 cursor-pointer'>
                            <Link className='flex items-center gap-1' to={isLoggedIn ? '/app/profile' : '/app/signin'}>
                                User profile
                                <CgProfile size={20} />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='md:w-1/3'>
                <p className='text-gray-200 font-bold'>Legal Pages</p>
                    <ul className='text-gray-300 py-4 cursor-pointer'>
                        <li className='py-1 cursor-pointer'>
                            <Link to='/app/policy'>Privacy Policy</Link> 
                        </li>
                        <li className='py-1 cursor-pointer'>
                            <Link to='/app/policy'>Terms and Conditions</Link> 
                        </li>
                        <li className='py-1 cursor-pointer'>
                            <Link to='/app/policy'>Cookie Policy</Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='block w-3/4 m-auto mt-10'>
            <div className='flex gap-4 justify-center md:justify-end'>
            <a href="https://github.com/VaibhavArora314/StyleShare"><img src={github} alt="github" className='pointer w-14 h-14'/></a>
            <Link to='/app'
            className="flex items-center justify-center p-2 text-white rounded-full focus:outline-none"
            >
            <FaHome size={35} />
          </Link>
            </div>
        </div>
        <div className='mt-10 text-gray-300 xl:flex justify-center text-md lg:text-xl xl:text-md'>Copyright {currentYear} @ Style Share</div>
    </div>
  )
}

export default Footer