import { Link } from "react-router-dom";
import { TypewriterEffectSmoothDemo } from "../components/HeroText";
import MagicButton from "../components/ui/MagicButton";

function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">
            {/* Welcome to Style Share */}
            <TypewriterEffectSmoothDemo/>
            </h1>
          <p className="md:text-[1.3rem] text-[1.1rem]  mb-6 text-gray-300">
            A simple web based platform where users can easily create, explore,
            and share Tailwind CSS components and designs with fellow users.
          </p>
          <div className=" text-white py-2 rounded-md">
            <Link to="/app/posts">
            <MagicButton title="Explore" ></MagicButton>
            </Link>
          </div>
         </div>
        {/* <div className="h-58 w-45 bg-red"></div> */}
        <div className="hidden md:block">
          <img src={"https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?w=996&t=st=1717153877~exp=1717154477~hmac=e1058df089e7d3f064f8e2a261e53f09f5aac845bf99095fcd7bf80767d31fa1"} alt="Code" className="rounded-lg shadow-lg shadow-blue-500/50 w-144" />
        </div>
      </div>
    </div>
  );
}

export default Home;
