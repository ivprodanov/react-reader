import React, { useState, useEffect } from "react";
import { texts } from "../assets/sample-texts";

interface SampleTextReaderProps {
  speed: number;
}

const SampleTextReader: React.FC<SampleTextReaderProps> = ({ speed }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const textObject = texts[currentTextIndex];
    const text = textObject.text;
    const wordsArray = text.split(" ");
    setWords(wordsArray);
  }, [currentTextIndex]);

  useEffect(() => {
    if (currentIndex < words.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearInterval(interval);
    }
  }, [currentIndex, words, speed]);

  const handleNextText = () => {
    setCurrentIndex(0);
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  return (
    <div>
      <div className="text-display">{words[currentIndex]}</div>
      <button className="next-text" onClick={handleNextText}>
        Next Text
      </button>
    </div>
  );
};

export default SampleTextReader;
