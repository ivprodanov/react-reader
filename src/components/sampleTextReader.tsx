// @ts-nocheck
import React, {useState, useEffect} from 'react'
import texts from '../assets/sample-texts.js'

function SampleTextReader(props) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const wordsArray = Object.values(texts[currentTextIndex])[0].split(" ");
    setWords(wordsArray);
  }, [currentTextIndex]);

  useEffect(() => {
    if (currentIndex < words.length) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, props.speed); // Change the interval as needed
      return () => clearInterval(interval);
    }
  }, [currentIndex, words]);

  const handleNextText = () => {
    setCurrentIndex(0);
    setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
  };

  return (
    <div>
      <div className="text-display">
        {words[currentIndex]}
      </div>
      <button className='next-text' onClick={handleNextText}>Next Text</button>
    </div>
  );
}

export default SampleTextReader