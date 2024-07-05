import { useRecoilValue } from 'recoil';
import { Link } from "react-router-dom";
import { loggedInState } from '../store/atoms/auth';
import { CgProfile } from 'react-icons/cg';
import { BsFilePost } from 'react-icons/bs';
import { FaHome, FaRegCopyright, FaGithub, FaEnvelope, FaInfoCircle, FaTools } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from "../assets/favicon.png";

const Footer = () => {
    const { t } = useTranslation();
    const isLoggedIn = useRecoilValue(loggedInState);
    const currentYear = new Date().getFullYear();

    return (
        <div className='bg-black text-white p-10'>
            <div className='md:flex'>
                <div className="md:w-1/2 lg:-mt-8 md:-mt-14 sm:mt-1 sm:w-full content-center">
                    <div className=" flex flex-col  md:items-start">
                        <div className="flex items-center sm:w-full">
                            <Link to="/app" className="flex items-center gap-2">
                                <img src={logo} className="h-8" alt="Styleshare Logo" />
                                <span className="ml-4 text-2xl font-semibold whitespace-nowrap text-white ">
                                    {t('footer.heading')}
                                </span>
                            </Link>
                        </div>
                        <p className="mt-2 text-gray-300 text-sm md:text-base md:text-left lg:w-1/2 sm:w-full pr-2">
                            {t('A simple web-based platform where users can easily contribute, create, explore, share components.')}
                        </p>
                    </div>
                </div>
                <div className='md:w-3/4 md:flex'>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold mt-8 md:mt-0'>{t('footer.company')}</p>
                        <ul className='text-gray-300 py-4'>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link to='/app/about' className='flex items-center gap-2'>
                                    <FaInfoCircle />
                                    {t('footer.c.l1')}
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link to='/app/contact-us' className='flex items-center gap-2'>
                                    <FaEnvelope />
                                    {t('footer.c.l2')}
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <a href='/admin' className='flex items-center gap-2'>
                                    <FaTools />
                                    Admin Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold'>{t('footer.quick')}</p>
                        <ul className='text-gray-300 py-4 cursor-pointer'>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link className='flex items-center gap-2' to='/app/posts'>
                                    <BsFilePost size={20} />
                                    {t('footer.q.q1')}
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link className='flex items-center gap-2' to={isLoggedIn ? '/app/profile' : '/app/signin'}>
                                    <CgProfile size={20} />
                                    {t('footer.q.q2')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold'>{t('footer.legal')}</p>
                        <ul className='text-gray-300 py-4 cursor-pointer'>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link to='/app/policy#privacy-policy'>
                                    {t('footer.l.le1')}
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link to='/app/policy#terms-and-conditions'>
                                    {t('footer.l.le2')}
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer hover:text-[#2563EB]'>
                                <Link to='/app/policy#cookie-policy'>
                                    {t('footer.l.le3')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='block w-3/4 m-auto mt-10'>
                <div className='flex gap-4 justify-center md:justify-end'>
                    <a href="https://github.com/VaibhavArora314/StyleShare" className="hover:scale-110 hover:shadow-[0_0_10px_2px_blue] transition-transform duration-300 ease-in-out flex items-center justify-center p-2 rounded-full">
                        <FaGithub size={35} className="text-white" />
                    </a>
                    <Link to='/app' className="hover:scale-110 hover:shadow-[0_0_10px_2px_blue] transition-transform duration-300 ease-in-out flex items-center justify-center p-2 text-white rounded-full focus:outline-none">
                        <FaHome size={35} />
                    </Link>
                </div>
            </div>
            <div className='mt-10 text-gray-300 flex justify-center text-md lg:text-xl xl:text-md'>
                {t('footer.copy1')} <FaRegCopyright className="ml-2 mr-1 mt-1" /> {currentYear} {t('footer.copy2')}
            </div>
        </div>
    )
}

export default Footer;
