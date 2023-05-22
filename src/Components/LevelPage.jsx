import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import FirebaseContext from '../Context/FirebaseContext';
import {gameObjects} from '../Context/GameContext';
import { useContext } from 'react';
import { onSnapshot, where, getDoc, doc } from 'firebase/firestore';

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
    let collection;

    let xPos = 0;
    let yPos = 0;
    let x;
    let y;

    const mousePos = (e) => {
      xPos = e.target.getBoundingClientRect().left;
      yPos = e.target.getBoundingClientRect().top;

      const target = {
        x: 91,
        y: 85,
        padding: 2
      }

      x = Math.floor((e.clientX - xPos) / e.target.getBoundingClientRect().width * 10000)/100;
      y = Math.floor((e.clientY - yPos) / e.target.getBoundingClientRect().height * 10000)/100;

      setCoordinated({
        posX: x,
        posY: y
      });

      // console.log(`X: ${x} || Y: ${y}`)

      setOptionPos({
        left: x+"%",
        top: y+"%",
      });

      const charOptions = document.getElementById("options").classList.remove("hidden");

      if(x > target.x - target.padding &&
        x < target.x + target.padding &&
        y > target.y - target.padding &&
        y < target.y + target.padding){
        // console.log("Found");
      } else{
        // console.log("Not Found");
      }
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
              
              console.log("Found");
          } else{
              console.log("Not Found");
          };
        });
        const charOptions = document.getElementById("options").classList.add("hidden");
      // const updatedCharacters = levelCharacters.map((obj) => {
      //   finalItems.map((coord) => {
      //     if(x > coord.x - padding &&
      //       x < coord.x + padding &&
      //       y > coord.y - padding &&
      //       y < coord.y + padding){
      //       console.log("Found");
      //     } else{
      //       console.log("Not Found");
      //     }
      //   });
      // });

      // let selectedItem = finalItems.find((obj) => {
      //   return obj.name === item;
      // })
    };

    let finalItems = [];

    useEffect(() => {
      //getting the coordinates from the db
        console.log(levelCharacters)
    },[]);

  return (
    <div className='levelPage'>

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