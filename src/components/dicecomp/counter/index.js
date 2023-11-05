import React, { useEffect, useRef } from "react";
import "./styles.css";

function Counter(props) {
  const { onTimerEnd, startTimer } = props;
  const counterRef = useRef(null);
  useEffect(() => {
    if (startTimer) {
      let count = 0;
      let seconds = 0;
      var r = counterRef.current;
      const interval = setInterval(() => {
        count += 1;
        r.style.setProperty("--value", `${count}`);
        if (count % 10 === 0) {
          seconds += 1;
          r.style.setProperty("--seconds", `${seconds}`);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        onTimerEnd();
      }, 10000);
    }
  }, [startTimer]);
  return (
    <div
      ref={counterRef}
      role="progressbar"
      aria-valuenow="65"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ "--value": 0, "--seconds": 0 }}
    ></div>
  );
}

export default Counter;
