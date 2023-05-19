import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import FirebaseContext from '../Context/FirebaseContext';
import {gameObjects} from '../Context/GameContext';
import { useContext } from 'react';
import { getDocs } from 'firebase/firestore';

const LevelPage = () => {
    const {id} = useParams();
    const {getCollDb} = useContext(FirebaseContext);

    let conNum = parseInt(id);
    let newGameObj = gameObjects.filter(old => old.level === conNum);

    const styles = {
      left: 0,
      top: 0,
    }

    const [levelCharacters, setLevelCharacters] = useState(newGameObj);
    const [optionPos, setOptionPos] = useState(styles);
    let collection;

    let xPos;
    let yPos;

    const mousePos = (e) => {
      xPos = e.target.getBoundingClientRect().left;
      yPos = e.target.getBoundingClientRect().top;

      const target = {
        x: 91,
        y: 85,
        padding: 2
      }

      const x = Math.floor((e.clientX - xPos) / e.target.getBoundingClientRect().width * 10000)/100;
      const y = Math.floor((e.clientY - yPos) / e.target.getBoundingClientRect().height * 10000)/100;

      console.log(`X: ${x} || Y: ${y}`)

      setOptionPos({
        left: x+"%",
        top: y+"%",
      });

      console.log(optionPos);

      const charOptions = document.getElementById("options").classList.remove("hidden");

      if(x > target.x - target.padding &&
        x < target.x + target.padding &&
        y > target.y - target.padding &&
        y < target.y + target.padding){
        console.log("Found");
      } else{
        console.log("Not Found");
      }
    };

    let finalItems = [];
    useEffect(() => {
      //getting the coordinates from the db
      collection = getCollDb(id);

      getDocs(collection)
        .then((snapshot) => {
          let items = [];
          snapshot.docs.forEach((doc) => {
            items.push({...doc.data(), id: doc.id});
          });
          finalItems = items;
        }).catch(err => {
          console.log(err.message);
        });
    },[]);

  return (
    <div className='levelPage'>
    
        <div className='game'>
            <img className='game-level' src={`./img/${id}.jpg`} alt='game' onClick={(e) => mousePos(e)}/>

          <div id='options' className='options hidden' style={optionPos}>
            <ul>
              {levelCharacters.map(names => {
                return(
                  <li>{names.name}</li>
                )
              })}
            </ul>
          </div>
      </div>

        <div className='characters'>
          {levelCharacters.map(obj => {
            return(
            <div className='char-con'>
              <img className='char-img' src={`./img/level/${obj.image}.jpeg`} alt = 'character' />
            </div>
            )
          })
          }
        </div>

        
    </div>
  )
}

export default LevelPage