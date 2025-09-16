"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";

interface ColourfulTextProps {
  text: string;
}

const ColourfulText: React.FC<ColourfulTextProps> = ({ text }) => {
  const baseColors = useMemo(
    () => [
      "rgb(131, 179, 32)",
      "rgb(47, 195, 106)",
      "rgb(42, 169, 210)",
      "rgb(4, 112, 202)",
      "rgb(107, 10, 255)",
      "rgb(183, 0, 218)",
      "rgb(218, 0, 171)",
      "rgb(230, 64, 92)",
      "rgb(232, 98, 63)",
      "rgb(249, 129, 47)",
    ],
    []
  );

  const [currentColors, setCurrentColors] = useState(baseColors);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...baseColors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCycleCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [baseColors]);

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${cycleCount}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre font-sans tracking-tight"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};

export default ColourfulText;