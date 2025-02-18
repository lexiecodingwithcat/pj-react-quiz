import { createContext, useContext, useReducer, useEffect } from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active','finished'
  status: "loading",
  //we need another state to keep track of current question
  //because we will display the question one by one by re-rendering the screen
  index: 0,
  answer: null,
  points: 0,
  //we need a new state to remember the points
  highestScore: 0,
  secondsRemaining: 10,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          //this action.payload is the index we used before to set the answer
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    //moving to the next question basically means to increase the index
    //because we are using questions[index] to display the question
    case "nextQuestion":
      //set answer back to null, otherwise the answer will be the one in the last question
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      //if only change the UI then set the status
      //if it is a handle event function then no need to set status
      return {
        ...state,
        status: "finished",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        //we still need to update the highest score here
        //the status change only display the 'finished' UI
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };
    default:
      throw new Error("action unkown");
  }
}
const QuizContext = createContext();
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highestScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    //start from 0
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highestScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside cities Provider");
  return context;
}

export {QuizProvider, useQuiz}