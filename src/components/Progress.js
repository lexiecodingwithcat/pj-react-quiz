import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index, answer, points, maxPossiblePoints } = useQuiz();
  return (
    <header className="progress">
      {/* //if there is an answer, it will be 1, otherwise it is 0 */}
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question
        <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong>/ {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
