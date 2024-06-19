// import { Link } from "react-router-dom";
// import about from '../assets/about.png'
// import bgHero from "../assets/bgHero.png";
// import { useTranslation } from 'react-i18next';

// function About() {
//   const { t } = useTranslation();

//   return (
//     <div className="w-full bg-[#000435] py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
//         <img className="w-[550px] mx-auto my-4" src={about} alt="About Us" />
//         <div className="flex flex-col justify-center">
//           <p className="bg-gradient-to-r from-blue-600 via-blue-500 to-white inline-block text-transparent bg-clip-text text-4xl font-bold py-1" >
//             👨‍💻 {t('about.aboutHeading')}
//           </p>
//           <h1 className='md:text-4xl sm:text-3xl font-bold py-4 text-white'>
//             {t('about.head1.heading')}
//           </h1>
//           <p className="text-lg text-gray-300 text-justify">
//             💁‍♂️ {t('about.head1.paragraph')}
//           </p>
//           <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-white'>
//             🤔 {t('about.head2.heading')}
//           </p>
//           <p className="text-lg text-gray-300">
//             <span> ✅ {t('about.head2.list.l1')}</span><br />
//             <span> ✅ {t('about.head2.list.l2')}</span><br />
//             <span> ✅ {t('about.head2.list.l3')}</span><br />
//             <span> ✅ {t('about.head2.list.l4')}</span><br />
//             <span> ✅ {t('about.head2.list.l5')}</span><br />
//             <span> ✅ {t('about.head2.list.l6')}</span><br />
//           </p>
//           <Link
//             to="/app/posts"
//             className='bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[170px] text-center font-medium my-6 mx-auto md:mx-0'
//           >
//             {t('hero.button')}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;

import { Link } from "react-router-dom";
import about from '../assets/about.png'
// import bgHero from "../assets/bgHero.png";
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div className="w-full  text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4" >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[550px] mx-auto my-4" src={about} alt="About Us" />
        <div className="flex flex-col justify-center">
          <p className="bg-gradient-to-r from-blue-600 via-blue-500 to-white inline-block text-transparent bg-clip-text text-4xl font-bold py-1" >
            👨‍💻 {t('about.aboutHeading')}
          </p>
          <h1 className='md:text-4xl sm:text-3xl font-bold py-4 text-white'>
            {t('about.head1.heading')}
          </h1>
          <p className="text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] text-justify">
            💁‍♂️ {t('about.head1.paragraph')}
          </p>
          <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435]'>
            🤔 {t('about.head2.heading')}
          </p>
          <p className="text-lg  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
            <span> ✅ {t('about.head2.list.l1')}</span><br />
            <span> ✅ {t('about.head2.list.l2')}</span><br />
            <span> ✅ {t('about.head2.list.l3')}</span><br />
            <span> ✅ {t('about.head2.list.l4')}</span><br />
            <span> ✅ {t('about.head2.list.l5')}</span><br />
            <span> ✅ {t('about.head2.list.l6')}</span><br />
          </p>
          <Link
            to="/app/posts"
            className='bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[170px] text-center font-medium my-6 mx-auto md:mx-0'
          >
            {t('hero.button')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;

