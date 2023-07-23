import "./styles.css";
import React, { useEffect, useState, useCallback } from "react";
export default function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const minStr = minutes < 10 ? "0" + minutes : minutes;
  const secStr = seconds < 10 ? "0" + seconds : seconds;

  const checkSeconds = useCallback(() => {
    if (minutes > 0) {
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(60);
      }
    } else {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }
    if (start && seconds && minutes) {
      setSeconds(seconds - 1);
    }
  }, [seconds, minutes, start]);

  useEffect(() => {
    if (start) {
      setTimeout(checkSeconds, 1000);
    }
  }, [start, seconds, checkSeconds]);

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    setStart(false);
  };

  return (
    <div className="App">
      <label> Minutes</label>
      <input
        type="number"
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
          setStart(false);
        }}
      />
      <br />
      <br />
      <label> seconds</label>
      <input
        type="number"
        value={seconds}
        onChange={(e) => {
          setSeconds(e.target.value);
          setStart(false);
        }}
      />
      <br />
      <br />

      <div>
        <button onClick={() => setStart(!start)}>start/pause</button>
        <button onClick={handleReset}>reset</button>
      </div>

      <div>
        <h2>
          {minStr}:{secStr}
        </h2>
      </div>
    </div>
  );
}
