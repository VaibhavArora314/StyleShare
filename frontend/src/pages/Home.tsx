import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">Welcome to Style Share</h1>
          <p className="text-xl  mb-6">
            A simple web based platform where users can easily create, explore,
            and share Tailwind CSS components and designs with fellow users.
          </p>
          <button className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            <Link to="/app/posts">Explore</Link>
          </button>
        </div>
        <div className="hidden md:block">
          {/* <img src={""} alt="Code" className="rounded-lg shadow-xl" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
