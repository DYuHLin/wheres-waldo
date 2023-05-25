import React, {useState, useEffect, useRef} from 'react'
import { useParams } from "react-router-dom";
import FirebaseContext from '../Context/FirebaseContext';
import {gameObjects} from '../Context/GameContext';
import { useContext } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import Popup from './Popup';

const LevelPage = () => {
    const {id} = useParams();
    const {db} = useContext(FirebaseContext);

    let conNum = parseInt(id);
    let newGameObj = gameObjects.filter(old => old.level === conNum);

    const styles = {
      left: 0,
      top: 0,
    }

    const [levelCharacters, setLevelCharacters] = useState(newGameObj);
    const [optionPos, setOptionPos] = useState(styles);
    const [coordinated, setCoordinated] = useState({posX: 0, posY: 0});
    const [time, setTime] = useState(0);
    const [popup, setPopup] = useState(false);

    const mousePos = (e) => {
      let xPos = e.target.getBoundingClientRect().left;
      let yPos = e.target.getBoundingClientRect().top;

      let x = Math.floor((e.clientX - xPos) / e.target.getBoundingClientRect().width * 10000)/100;
      let y = Math.floor((e.clientY - yPos) / e.target.getBoundingClientRect().height * 10000)/100;

      setCoordinated({
        posX: x,
        posY: y
      });

      setOptionPos({
        left: x+"%",
        top: y+"%",
      });

      const charOptions = document.getElementById("options").classList.remove("hidden");
    };

    const checkFind = (item) => {
      const padding = 2;
      let coordinates;
      const docRef = doc(db, 'characters', `${item}`);
      getDoc(docRef)
        .then((doc) => {
          coordinates = doc.data();

          if(coordinated.posX > coordinates.x - padding &&
            coordinated.posX < coordinates.x + padding &&
            coordinated.posY > coordinates.y - padding &&
            coordinated.posY < coordinates.y + padding){
              const changeIndex = levelCharacters.map(e => e.name).indexOf(item);

              levelCharacters[changeIndex].found = true;
              const icon = document.getElementById(`${item}`);
              timerStop();
              icon.classList.remove("false");
              icon.classList.add("true");
          } else{
              return;
          };
        });

        const charOptions = document.getElementById("options").classList.add("hidden");
    };

    let inter = useRef();

    const timer = () => {
      inter.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    };

    const timerStop = () => {
      const check = levelCharacters.every((obj) => obj.found === true);
      if(check){
        clearInterval(inter.current);
        setPopup(true);
        const reset = levelCharacters.map(obj => {obj.found = false});
      };
    };

    useEffect(() => {
        timer();
        return () => clearInterval(inter.current);
    },[]);

  return (
    <div id='container' className='levelPage'>
      
        <div className='game'>
          
            <img className='game-level' src={`./img/${id}.jpg`} alt='game' onClick={(e) => mousePos(e)}/>

          <div id='options' className='options hidden' style={optionPos}>
            <ul>
              {levelCharacters.map(names => {
                return(
                  <li onClick={() => {checkFind(names.name)}}>{names.name}</li>
                )
              })}
            </ul>
          </div>
      </div>

        <div className='characters'>
          {levelCharacters.map(obj => {
            return(
            <div id = {`${obj.name}`} className='char-con false'>
              <img className='char-img' src={`./img/level/${obj.image}.jpeg`} alt = 'character' />
            </div>
            )
          })
          }
        </div>
          <div className='timer'>{time}</div>
          
          {popup && (
            <div className='container-popup'>
              <Popup time = {time}/>
            </div>
          )}
    </div>
  )
}

export default LevelPage