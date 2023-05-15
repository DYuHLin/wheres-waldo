import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

const LevelPage = () => {
    const {id} = useParams();

    let xPos;
    let yPos;

    const mousePos = (e) => {
      xPos = e.clientX;
      yPos = e.clientY;

      console.log(`X: ${xPos} || Y: ${yPos}`);
    };

  return (
    <div className='levelPage'>
        <div className='game' onClick={(e) => mousePos(e)}>
            <img className='game-level' src={`./img/${id}.jpg`} alt='game' />
        </div>
    </div>
  )
}

export default LevelPage