import { useState } from "react";
import "./QuizSelection.css";
import { useNavigate } from "react-router-dom";

export const QuizSelection = () => {
  const [selectedCatagory, setCatagory] = useState("");
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/quiz/${selectedCatagory}`)

  };

  return (
    <>
      <div>
        <h2 style={{ fontSize: "50px", marginBottom: "37px" }}>
          WELCOME TO QUIZ GAME
        </h2>
        <h2 style={{ fontSize: "7em" }}>Quiz Selection</h2>
        <div style={{ fontSize: "30px" }}>
          <div
            className={`category ${
              selectedCatagory === "general-knowledge" ? "active" : ""
            }`}
            onClick={() => setCatagory("general-knowledge")}
          >
            General Knowledge
          </div>
          <div
            className={`category ${
              selectedCatagory === "science-computers" ? "active" : ""
            }`}
            onClick={() => setCatagory("science-computers")}
          >
            Science Computers
          </div>
          <div
            className={`category ${
              selectedCatagory === "entertainment" ? "active" : ""
            }`}
            onClick={() => setCatagory("entertainment")}
          >
            Entertainment
          </div>
         
        </div>
      </div>

      <button
        className="btn"
        onClick={handleClick}
        style={{
          padding: "12px 40px",
          fontFamily: "monospace",
          fontSize: "1rem",
          borderRadius: "1.3rem",
          border: "solid purple",
          boxShadow: "-4px 3px 4px  purple",
          backgroundColor: "pink",
        }}
      >
        Continue
      </button>
    </>
  );
};
