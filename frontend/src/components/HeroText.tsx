"use client";

import { TypewriterEffectSmooth } from "./ui/TypeWriter";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "👋Welcome",
      className:"md:text-3xl lg:text-5xl text-3xl text-white"
    },
    {
      text: "To",
      className:"text-white lg:text-5xl md:text-3xl text-3xl"
    },
    {
      text: "Style",
      className: "text-blue-500 lg:text-5xl  md:text-3xl text-3xl",
    },
    {
      text: "Share",
      className: "text-blue-500 lg:text-5xl  md:text-3xl text-3xl",
    },
    
  ];
  return (
    <div className="max-w-screen-xl mx-auto">
      
    <div className=" mx-autofont-bold mb-4">
      <TypewriterEffectSmooth words={words} />
      </div>
      </div>
    
     
  );
}
