"use client";

import { TypewriterEffectSmooth } from "./ui/TypeWriter";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Welcome",
      className:"text-5xl text-white"
    },
    {
      text: "To",
      className:"text-5xl text-white"
    },
    {
      text: "Style",
      className: "text-blue-500 text-5xl",
    },
    {
      text: "Share",
      className: "text-blue-500 text-5xl",
    },
    
  ];
  return (
    <div className=" mx-autofont-bold mb-4">
      <TypewriterEffectSmooth words={words} />
      </div>
     
  );
}
