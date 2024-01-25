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
          url = "https://opentdb.com/api.php?amount=10&type=multiple";
          break;
        case "science-computers":
          url =
            "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
          break;
        case "entertainment":
          url =
            "https://opentdb.com/api.php?amount=40&category=32&type=multiple";
          break;
        default:
          break;
      }
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setQuestions(result.results);
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
          <div className="question">{decodeHtmlEntities(currentQuestion.question)}</div>
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
