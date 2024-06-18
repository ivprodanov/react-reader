import React, { useEffect, useState } from "react";
import evalJSON from "../assets/evaluation.json";
import { Link } from "react-router-dom";

interface WordInfo {
  word: string;
  index: number;
  length: number;
  duration: number;
}

const EvaluatePage: React.FC = () => {
  const [start, setStart] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [allWordsClicked, setAllWordsClicked] = useState<boolean>(false);
  const [wordData, setWordData] = useState<WordInfo[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [average, setAverage] = useState<number | null>(null);

  const toggleStart = () => {
    setStart((prev) => !prev);
  };

  useEffect(() => {
    if (currentWordIndex === evalJSON.length - 1) {
      calculateAverageTime();
      setAllWordsClicked(true);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    if (average !== null) {
      logToLocalStorage();
    }
  }, [average]);

  const wordClick = () => {
    if (startTime !== null) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      const wordInfo: WordInfo = {
        word: evalJSON[currentWordIndex],
        index: currentWordIndex,
        length: evalJSON[currentWordIndex].length,
        duration: duration,
      };

      setWordData((prevData) => [...prevData, wordInfo]);

      setStartTime(null);
    }

    if (currentWordIndex < evalJSON.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
      setAllWordsClicked(true);
    }

    setStartTime(performance.now());
  };

  const calculateAverageTime = () => {
    const totalDuration = wordData.reduce(
      (total, wordInfo) => total + wordInfo.duration,
      0
    );
    const averageDuration = totalDuration / wordData.length;
    console.log(averageDuration);
    setAverage(averageDuration);
  };

  const logToLocalStorage = () => {
    if (average !== null) {
      localStorage.setItem("duration-average", average.toString());
    }
  };

  return (
    <div className="evaluation-page">
      <h1 className="evaluate-heading">Evaluation</h1>
      {!start && (
        <div className="evaluate-instructions">
          <p>
            The purpose of this exercise is to evaluate your reading speed.
          </p>
          <p>
            After clicking start you will see a word appear on your screen.
          </p>
          <p>
            Click on the word when you've read it and repeat for the other words
            as well
          </p>
          <h2>Press start when you're ready.</h2>
          <button className="start-button" onClick={toggleStart}>
            START
          </button>
        </div>
      )}
      {start && !allWordsClicked && (
        <>
          <div className="words-evaluation" onClick={wordClick}>
            <h2>{evalJSON[currentWordIndex]}</h2>
          </div>
        </>
      )}
      {allWordsClicked && (
        <div className="all-clicked">
          All words clicked! Average time:{" "}
          {average ? average.toFixed(2) + "ms" : "loading..."}{" "}
          <h2>You can try<Link to={"/read"}> reading now!</Link></h2>
        </div>
      )}
    </div>
  );
}

export default EvaluatePage;
