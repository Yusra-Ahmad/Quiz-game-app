import "./App.css";
import GeneralQuestion from "./components/GeneralQuestion/GeneralQuestion";
import { HomePage } from "./components/Main/HomPage";
import { QuizSelection } from "./components/QuizSelection/QuizSelection";
import { Route, Routes } from "react-router-dom";
import { AnswerProvider } from "./components/context/AnswerContext";

function App() {
  return (
    <>
      <AnswerProvider>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="quiz-selection" element={<QuizSelection />}></Route>
          <Route path="quiz/:category" element={<GeneralQuestion />}></Route>
        </Routes>
      </AnswerProvider>
    </>
  );
}

export default App;
