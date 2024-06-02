import github from '../assets/github.png';

const Footer = () => {
  return (
    <div className='bg-black text-white p-10'>
        <div className='md:flex'>
            <div className='md:w-1/2'>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Style Share
          </span>
            </div>
            <div className='md:w-1/2 md:flex'>
                <div className='md:w-1/2'>
                    <p className='text-gray-200 font-bold mt-8 md:mt-0'>Company</p>
                    <ul className='text-gray-300 py-4'>
                        <li className='py-1 cursor-pointer'>About Us</li>
                        <li className='py-1 cursor-pointer'>Contact Us</li>
                        <li className='py-1 cursor-pointer'>Careers</li>
                        <li className='py-1 cursor-pointer'>Brand Center</li>
                    </ul>
                </div>
                <div className='md:w-1/2'>
                <p className='text-gray-200 font-bold'>Legal Pages</p>
                    <ul className='text-gray-300 py-4 cursor-pointer'>
                        <li className='py-1 cursor-pointer'>Privacy Policy</li>
                        <li className='py-1 cursor-pointer'>Terms and Conditions</li>
                        <li className='py-1 cursor-pointer'>Cookie Policy</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='block w-3/4 m-auto mt-20'>
            <div className='flex gap-4 justify-center md:justify-end'>
            <a href="https://github.com/VaibhavArora314/StyleShare"><img src={github} alt="github" className='pointer w-14 h-14'/></a>
            </div>
        </div>
        <div className='mt-20 text-gray-300 xl:flex justify-center text-md lg:text-xl xl:text-md'>Copyright {new Date().getFullYear()} @ Style Share</div>
    </div>
  )
}

export default Footer