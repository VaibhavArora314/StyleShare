import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreLoader: React.FC = () => {
  const [isWhite, setIsWhite] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsWhite((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{
        color: isWhite ? 'black' : 'white',
        backgroundColor: isWhite ? 'white' : 'black',
      }}
      transition={{ type: 'spring', stiffness: 15 }}
      className="w-full h-svh overflow-hidden flex justify-center items-center transition ease-out duration-500"
    >
      <motion.div
        initial={{ scale: 3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, delay: 0.1, type: 'spring', stiffness: 30 }}
        className="xl:text-5xl text-xl sm:text-2xl md:text-3xl lg:text-6xl uppercase font-extrabold font-sans"
      >
        <p>Welcome  to  StyleShare</p>
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;
