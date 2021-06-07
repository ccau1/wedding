import { useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number, onComplete?: () => void) => {
  const [, update] = useState(seconds);
  const secondsLeft = useRef(seconds);

  useEffect(() => {
    const startTime = new Date().valueOf();
    // on mount, count down from seconds to zero, giving user time
    // to see message
    const intervalRef = setInterval(() => {
      const timePast = new Date().valueOf() - startTime;
      const timeLeft = Math.ceil(seconds - timePast / 1000);

      if (timeLeft > 0) {
        secondsLeft.current = timeLeft;
        // can still deduct from seconds left, so deduct it
        update(secondsLeft.current);
      } else {
        // seconds left equals 0
        // clear interval
        clearInterval(intervalRef);
        // set seconds left to 0
        secondsLeft.current = 0;
        update(secondsLeft.current);
        // trigger onComplete listener
        onComplete?.();
      }
    }, 300);
  }, []);

  // returns seconds left
  return secondsLeft.current;
};

export default useCountdown;
