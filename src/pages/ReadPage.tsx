import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SampleTextReader from "../components/sampleTextReader";
import { PDFReader } from "./PDFReader";

const ReadPage: React.FC = () => {
  const [averageSpeed, setAverageSpeed] = useState<number | null>(null);
  const [adjustedSpeed, setAdjustedSpeed] = useState<number | null>(null);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    const durationAverage = localStorage.getItem("duration-average");
    if (durationAverage) {
      const average = parseInt(durationAverage);
      setAverageSpeed(average);
      setAdjustedSpeed(average);
    } else {
      setAverageSpeed(0);
    }
  }, []);

  const toggleFaster = () => {
    if (adjustedSpeed !== null && adjustedSpeed > 10) {
      setAdjustedSpeed(adjustedSpeed - 10);
    }
  };

  const toggleSlower = () => {
    if (adjustedSpeed !== null) {
      setAdjustedSpeed(adjustedSpeed + 50);
    }
  };

  const toggleStart = () => {
    setStart((prev) => !prev);
  };

  return (
    <div className="read-page-container">
      {averageSpeed !== 0 ? (
        !start ? (
          <div className="adjust">
            <h2 className="all-clicked">
              Your current reading speed is:{" "}
              {averageSpeed !== null ? averageSpeed.toFixed() + "ms per word" : ""}
            </h2>
            <div className="adjust-controls">
              <h3>You can adjust this speed with the buttons below</h3>
              <div className="adjust-speed">
                <button className="faster" onClick={toggleFaster}>
                  Faster
                </button>
                <h2>{adjustedSpeed !== null ? adjustedSpeed + "ms" : ""}</h2>
                <button className="slower" onClick={toggleSlower}>
                  Slower
                </button>
              </div>
              <button className="start-read" onClick={toggleStart}>
                START
              </button>
            </div>
          </div>
        ) : (
          // <SampleTextReader speed={adjustedSpeed !== null ? adjustedSpeed : 0} />
          <PDFReader speed={adjustedSpeed !== null ? adjustedSpeed : 0} />

        )
      ) : (
        !start ? (
          <div className="adjust-self">
            <h2>
              Take the <Link to={"/eval"}>evaluation</Link> first to calculate your
              reading speed or set it manually below.
            </h2>
            <button onClick={() => { setAdjustedSpeed(500); localStorage.setItem('duration-average', "500"); }}>
              Speed per word: 500ms
            </button>
            <button onClick={() => { setAdjustedSpeed(250); localStorage.setItem('duration-average', "250"); }}>
              Speed per word: 250ms
            </button>
            <button
              disabled={!adjustedSpeed}
              className="start-read"
              onClick={toggleStart}
            >
              START
            </button>
          </div>
        ) : (
          <SampleTextReader speed={adjustedSpeed !== null ? adjustedSpeed : 0} />
        )
      )}
    </div>
  );
};

export default ReadPage;
