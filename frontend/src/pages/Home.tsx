import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css'
import About from "./About";
import HomePagePost from "./HomePagePosts";

function Home() {
  return (
    <div className="min-h-screen bg-[#000435] text-white" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full bg-[#000435] py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
        <h1 className="text-6xl font-extrabold leading-tight pb-3">👋 Welcome to <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-white inline-block text-transparent bg-clip-text">Style Share !</span></h1>
          <h1 className='md:text-3xl sm:text-3xl font-medium py-2'>A simple web-based platform where users can easily</h1>
          <p className="text-lg text-gray-300 font-semibold" >
          <span> ✅ Contribute</span><br/>
              <span> ✅ Create</span><br/>
              <span> ✅ Explore</span><br/>
              <span> ✅ Share</span><br/>
            </p>
            <Link
              to="/app/posts"
              className=' bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[150px] text-center font-medium my-6 mx-auto md:mx-0'            >
              Explore Now
            </Link>
        </div>
        <img className="w-[600px] imgAnimate" src={hero} alt="About Us" />
      </div>
    </div>
      <About/>
      <HomePagePost/>
    </div>
  );
}

export default Home;