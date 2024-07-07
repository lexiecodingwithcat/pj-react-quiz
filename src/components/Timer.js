import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  // we start the timer when the component is mounted
  useEffect(
    function () {
      const id = setInterval(() => {
        //   console.log("tick");
        dispatch({ type: "tick" });
      }, 1000);
      //clean up the timer
      //otherwise it will keep working after the component is unmounted
      //each time we restart the quiz, a new timer will be added
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
