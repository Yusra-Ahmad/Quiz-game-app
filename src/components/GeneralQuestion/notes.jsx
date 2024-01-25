import { useState, useEffect } from "react";
import "./GeneralQuestion.css";
import { useParams } from "react-router-dom";

function GeneralQuestion() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  let { category } = useParams();

  const fetchingData = async () => {
    let url;
    try {
      switch (category) {
        case "general-knowledge":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=general_knowledge&type=text_choice";
          break;
        case "science-computers":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=science&type=text_choice";
          break;
        case "entertainment":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=film_and_tv&type=text_choice";
          break;
        default:
          break;
      }
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setQuestions(
        result.map((item) => {
          return {
            incorrect_answers: item.incorrectAnswers,
            correct_answer: item.correctAnswer,
            question: item.question.text,
          };
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
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
        <div className="questionanswer">
          <div className="question">
            {decodeHtmlEntities(currentQuestion.question)}
          </div>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer)}>
                {decodeHtmlEntities(answer)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default GeneralQuestion;
