import { useEffect } from "react";
import "./GeneralQuestion.css";
import { useParams } from "react-router-dom";
import { useAnswerContext } from "../context/AnswerContext";

function GeneralQuestion() {
  const obj = useAnswerContext();
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
      obj.setQuestions(
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
