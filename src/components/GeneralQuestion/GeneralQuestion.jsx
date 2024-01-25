import { useEffect } from "react";
import "./GeneralQuestion.css";
import { useParams } from "react-router-dom";
import { useAnswerContext } from "../context/AnswerContext";

function GeneralQuestion() {
  const obj = useAnswerContext();
  let { category } = useParams();
  let url = "https://the-trivia-api.com/v2/questions";
  const fetchingData = async () => {
    try {
      // switch (category) {
      //   case "general-knowledge":
      //     url = "https://opentdb.com/api.php?amount=10&type=multiple";
      //     break;
      //   case "science-computers":
      //     url =
      //       "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
      //     break;
      //   case "entertainment":
      //     url =
      //       "https://opentdb.com/api.php?amount=40&category=32&type=multiple";
      //     break;
      //   default:
      //     break;
      // }
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      obj.setQuestions(result.results);
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
      ...question.incorrectAnswers,
      question.correctAnswer,
    ];
    return shuffledAnswers.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    fetchingData();
  }, []);

  if (obj.questions.length === 0) {
    return <div>Loading...</div>;
  }

  const isQuizComplete = obj.currentQuestionIndex === obj.questions.length - 1;

  const currentQuestion = obj.questions[obj.currentQuestionIndex];
  const shuffledAnswers = shuffleAnswers(currentQuestion);
  return (
    <>
      {isQuizComplete ? (
        <div>
          <h4>Quiz Complete!</h4>
          <p>Correct Answers: {obj.correctAnswers}</p>
          <button>Back to menu</button>
          <button>Play again</button>
        </div>
      ) : (
        <div>
          <h3>{decodeHtmlEntities(currentQuestion.question)}</h3>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => obj.handleAnswerClick(answer)}>
                  {decodeHtmlEntities(answer)}
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
