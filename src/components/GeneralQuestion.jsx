import React, { useState, useEffect } from "react";
import "./GeneralQuestion.css";

function GeneralQuestion() {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const entities = { "&#039;": "'", "&quot;": '"', "&ndash;": "-" };
  const fetchingData = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setQuestions(result.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const shuffleAnswers = (question) => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    return shuffledAnswers.sort(() => Math.random() - 0.5);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const isQuizComplete = currentQuestionIndex === questions.length - 1;

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = shuffleAnswers(currentQuestion);

  return (
    <>
      {isQuizComplete ? (
        <div>
          <h4>Quiz Complete!</h4>
          <p>Correct Answers: {correctAnswers}</p>
          <button>Back to menu</button>
          <button>Play again</button>
        </div>
      ) : (
        <div>
          <h3>
            {currentQuestion.question.replace(
              /&#?\w+;/,
              (match) => entities[match]
            )}
          </h3>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerClick(answer)}
                  //   className={selectedAnswer === answer ? "selected" : ""}
                  //   disabled={selectedAnswer !== null}
                >
                  {answer.replace(/&#?\w+;/, (match) => entities[match])}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default GeneralQuestion;
