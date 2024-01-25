
import { createContext, useContext, useState } from "react";
const AnswerContext = createContext();
export const AnswerProvider = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };
  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
  };
  const contextValue = {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    correctAnswers,
    quizComplete,
    handleAnswerClick,
    setQuestions,
    resetQuiz,
  };
  return (
    <AnswerContext.Provider value={contextValue}>
      {props.children}
    </AnswerContext.Provider>
  );
};
export const useAnswerContext = () => {
  return useContext(AnswerContext);
};