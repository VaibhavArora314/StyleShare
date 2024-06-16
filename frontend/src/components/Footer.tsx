import { useRecoilValue } from 'recoil';
import github from '../assets/github.png';
import { Link} from 'react-router-dom';
import { loggedInState } from '../store/atoms/auth';
import {CgBoard , CgProfile} from 'react-icons/cg';
import { BsFilePost } from 'react-icons/bs';
import {FaEnvelope , FaHome   , FaPortrait} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logo from "../assets/favicon.png";

const Footer = () => {
    const { t } = useTranslation();
    const isLoggedIn = useRecoilValue(loggedInState);
    const currentYear = new Date().getFullYear();

    return (
        <div className='bg-black text-white p-10'>
            <div className='md:flex'>
                <div className='md:w-1/4'>
                    <div className="flex flex-col items-center">
                        <div className="flex  ">
                            <img src={logo} className="h-8" alt="Styleshare Logo" />
                            <span className="ml-4 text-2xl font-semibold whitespace-nowrap text-white">
                                {t('footer.heading')}
                            </span>
                        </div>
                        <div className='block  m-auto mt-10'>
                            <div className='flex gap-4 justify-center md:justify-end'>
                                <a href="https://github.com/VaibhavArora314/StyleShare" className="hover:scale-110 hover:shadow-[0_0_10px_2px_blue] transition-transform transition-shadow duration-300 ease">
                                    <img src={github} alt="github" className='pointer w-14 h-14' />
                                </a>
                                <Link to='/app' className="hover:scale-110 hover:shadow-[0_0_10px_2px_blue] transition-transform transition-shadow duration-300 ease flex items-center justify-center p-2 text-white rounded-full focus:outline-none">
                                    <FaHome size={35} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:w-2/4 md:flex'>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold mt-8 md:mt-0'>{t('footer.company')}</p>
                        <ul className='text-gray-300 py-4'>
                            <li className='py-1 cursor-pointer'>
                                <Link to='/app/about'>{t('footer.c.l1')}</Link>
                            </li>
                            <li className='py-1 cursor-pointer'>
                                <Link to='/app/contact-us'>{t('footer.c.l2')}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold'>{t('footer.quick')}</p>
                        <ul className='text-gray-300 py-4 cursor-pointer'>
                            <li className='py-1 cursor-pointer'>
                                <Link className='flex items-center gap-1' to='/app/posts'>
                                    {t('footer.q.q1')}
                                    <BsFilePost size={20} />
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer'>
                                <Link className='flex items-center gap-1' to={isLoggedIn ? '/app/profile' : '/app/signin'}>
                                    {t('footer.q.q2')}
                                    <CgProfile size={20} />
                                </Link>
                            </li>
                            <li className='py-1 cursor-pointer'>
                                <Link className='flex items-center gap-1' to='/app/leaderboard'>
                                    {t('footer.q.q3')}
                                    <CgBoard size={20} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-gray-200 font-bold'>{t('footer.legal')}</p>
                        <ul className='text-gray-300 py-4 cursor-pointer'>
                            <li className='py-1 cursor-pointer'>
                                <Link to='/app/policy#privacy-policy'>{t('footer.l.le1')}</Link>
                            </li>
                            <li className='py-1 cursor-pointer'>
                                <Link to='/app/policy#terms-and-conditions'>{t('footer.l.le2')}</Link>
                            </li>
                            <li className='py-1 cursor-pointer'>
                                <Link to='/app/policy#cookie-policy'>{t('footer.l.le3')}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='md:w-4/4 md:flex flex-col'>
                        <div className="m-2 mb-2">{ t('footer.subscribe') }</div>
                        <form className="flex flex-col gap-3">
                            <div className="flex">
                                <label className="p-2 text-2xl border-2 border-white"><FaPortrait/></label>
                                <input placeholder="Full Name " className="p-2 "/>
                            </div>
                            <div className="flex">
                                <label className="p-2 text-2xl border-2 border-white"><FaEnvelope/></label>
                                <input placeholder="Email"  className="p-2 "/>
                            </div>
                            <button className="p-2 border-2 border-white hover:bg-white hover:text-black">{t('footer.button') }</button>
                        </form>

                </div>
            </div>

            <hr className="mt-10"/>
            <div className='mt-5 text-gray-300 xl:flex justify-center text-md lg:text-xl xl:text-md gap-5'>
                <div>{t('footer.Accessibility_Statement') }  </div>|
                <div>{t('footer.copy1')} {currentYear}{t('footer.copy2')} </div>|
                <div>{ t('footer.code_of_conduct') }</div>
            </div>
        </div>
    )
}

export default Footer;