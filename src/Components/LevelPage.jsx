import React, {useState, useEffect, useRef} from 'react'
import { useParams } from "react-router-dom";
import FirebaseContext from '../Context/FirebaseContext';
import {gameObjects} from '../Context/GameContext';
import { useContext } from 'react';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import Popup from './Popup';

const LevelPage = () => {
    const {id} = useParams();
    const {getCollDb,db} = useContext(FirebaseContext);

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

    let xPos = 0;
    let yPos = 0;
    let x;
    let y;

    const mousePos = (e) => {
      xPos = e.target.getBoundingClientRect().left;
      yPos = e.target.getBoundingClientRect().top;

      x = Math.floor((e.clientX - xPos) / e.target.getBoundingClientRect().width * 10000)/100;
      y = Math.floor((e.clientY - yPos) / e.target.getBoundingClientRect().height * 10000)/100;

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
      console.log(coordinated);
      getDoc(docRef)
        .then((doc) => {
          coordinates = doc.data();
          console.log(coordinates, doc.id);

          if(coordinated.posX > coordinates.x - padding &&
            coordinated.posX < coordinates.x + padding &&
            coordinated.posY > coordinates.y - padding &&
            coordinated.posY < coordinates.y + padding){
              const changeIndex = levelCharacters.map(e => e.name).indexOf(item);

              levelCharacters[changeIndex].found = true;
              console.log(levelCharacters);
              const icon = document.getElementById(`${item}`);
              timerStop();
              icon.classList.remove("false");
              icon.classList.add("true");
              console.log("Found");
          } else{
              console.log("Not Found");
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
      };
    };

    useEffect(() => {
      //getting the coordinates from the db
        console.log(levelCharacters)
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