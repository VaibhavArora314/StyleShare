import { Link } from "react-router-dom";
import about from '../assets/about.png'
import bgHero from "../assets/bgHero.png";
import Tilt from 'react-parallax-tilt';

function About() {
  
  return (
    <div className="w-full  text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
      <Tilt>
        <img className="w-[550px] mx-auto my-4" src={about} alt="About Us" />
      </Tilt>
        <div className="flex flex-col justify-center">
        <p className="bg-gradient-to-r from-blue-600 via-blue-500 to-white inline-block text-transparent bg-clip-text text-4xl font-bold py-1" >👨‍💻 About Style Share</p>
        <h1 className='md:text-4xl sm:text-3xl font-bold py-4 text-white'>Unleashing Creativity - Tailwind CSS</h1>
        <p className="text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] text-justify">
            💁‍♂️ Our mission is to make the design process more accessible and efficient for everyone. 
            Whether you are a seasoned developer looking for inspiration or a beginner taking your first steps into the world of web design, our platform offers a wealth of resources tailored to your needs.    
          </p>
          <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435]'>🤔 How it Works !</p>
          <p className="text-lg  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
              <span> ✅ Search any component with search bar from various developers.</span><br/>
              <span> ✅ contribute to open source for more tailwind components.</span><br/>
              <span> ✅ Create your own component to help other developers.</span><br/>
              <span> ✅ Create posts from New Posts section.</span><br/>
              <span> ✅ And that's it you are ready to go.</span><br/>
              <span> ✅ Other features coming soon.</span><br/>
            </p>
            <Link
            to="/app/posts"
            className='bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[170px] text-center font-medium my-6 mx-auto md:mx-0'
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;