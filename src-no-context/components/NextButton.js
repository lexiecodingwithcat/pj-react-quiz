function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;
  //not display the next question button when reach to the last question
  //when index is 14, no button
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
    // if it is the last question 
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
