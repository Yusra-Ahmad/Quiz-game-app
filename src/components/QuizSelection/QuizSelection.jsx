import { useState } from "react";
import "./QuizSelection.css";
import { useNavigate } from "react-router-dom";
import {GiThink } from "react-icons/gi";
import { FcAcceptDatabase } from "react-icons/fc";
import { TbWorldHeart } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaFaceGrinStars } from "react-icons/fa6";

export const QuizSelection = () => {
  const navigate = useNavigate();

  const handleClick = (selectedCatagory) => {
    navigate(`/quiz/${selectedCatagory}`);
  };

  return (
    <>
      <div>
        <h2 style={{ fontSize: "100px", marginBottom: "37px" }}>
            <GiThink />
          WELCOME TO QUIZ GAME 
          <GiPerspectiveDiceSixFacesRandom />
        </h2>
        <h2 style={{ fontSize: "6em", textAlign: "center" }}>

       

          
          Quiz Selection  <FcAcceptDatabase  style={{fontSize:"5rem"}}/>
        </h2> 
        <div style={{ fontSize: "30px" }}>
          <div
            className="category"
            onClick={()=>handleClick("general-knowledge")}
          >
            General Knowledge <TbWorldHeart />
          </div>
          <div
            className="category"
            onClick={()=>handleClick("science-computers")}
          >
            Science Computers <FaLaptopCode />
          </div>
          <div
            className="category"
            onClick={()=>handleClick("entertainment")}
          >
            Entertainment
            <FaFaceGrinStars />
          </div>
        </div>
      </div>

      
    </>
  );
};
