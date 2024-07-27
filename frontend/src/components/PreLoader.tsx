import "../index.css"

const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <svg viewBox="0 0 1320 300">
        <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="uppercase animate-stroke">
          style share
        </text>
      </svg>
    </div>
  );
}

export default Preloader;
