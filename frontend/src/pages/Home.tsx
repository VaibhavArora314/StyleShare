import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css'

function Home() {
  return (
    <div className="min-h-screen bg-[#000435] text-white" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          <div>
            <h1 className="text-6xl font-extrabold mb-4 leading-tight">👋 Welcome to Style Share</h1>
            <h6 className="text-xl mb-3 text-gray-400">
              A simple web-based platform where users can easily <br/>
            </h6>
            <div className="text-xl mb-3 text-gray-400">
              <span > ✅ create</span><br/>
              <span> ✅ explore</span><br/>
              <span> ✅ share</span><br/>
            </div>
            <h6 className="text-xl mb-6 text-gray-400">
            Tailwind CSS components and designs with fellow users.<br/>
            </h6>
            <Link
              to="/app/posts"
              className="inline-block bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              Explore Now
            </Link>
          </div>
          <div className="md:block">
            <img
              src={hero}
              alt="Code"
              className="imgAnimate w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
