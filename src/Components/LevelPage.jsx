import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

const LevelPage = () => {
    const {id} = useParams();

    let xPos;
    let yPos;

    const mousePos = (e) => {
      console.log(e)
      xPos = e.target.getBoundingClientRect().left;
      yPos = e.target.getBoundingClientRect().top;

      // console.log(`X: ${xPos} || Y: ${yPos}`);

      const target = {
        x: 90,
        y: 83,
        padding: 5
      }

      const x = Math.floor((e.clientX - xPos) / e.target.getBoundingClientRect().width * 10000)/100;
      const y = Math.floor((e.clientY - yPos) / e.target.getBoundingClientRect().height * 10000)/100;

      console.log(`X: ${x} || Y: ${y}`)

      if(x > target.x - target.padding &&
        x < target.x + target.padding &&
        y > target.y - target.padding &&
        y < target.y + target.padding){
        console.log("Found");
      } else{
        console.log("Not Found");
      }
    };

  return (
    <div className='levelPage'>
      
        <div className='game'>
            <img className='game-level' src={`./img/${id}.jpg`} alt='game' onClick={(e) => mousePos(e)}/>
        </div>
    </div>
  )
}

export default LevelPage