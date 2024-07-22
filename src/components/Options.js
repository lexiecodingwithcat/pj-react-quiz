import { useQuiz } from "../contexts/QuizContext";

function Options({question}) {
  const { dispatch, answer } = useQuiz();

  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          //   disabled the button if alreadt has a answer
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
