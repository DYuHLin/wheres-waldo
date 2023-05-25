import React from 'react'
import { useContext } from 'react';
import FirebaseContext from '../Context/FirebaseContext';
import { useParams } from "react-router-dom";
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Popup = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();
    const {getCollDb,db} = useContext(FirebaseContext);

    const database = getCollDb(id);

    const addDb = () => {
        const nameInp = document.getElementById('name-text');
        addDoc(database, {
            name: nameInp.value,
            time: props.time,
        })
        .then(() => {
            nameInp.value = "";
            navigate('/');
            alert("You have been put into the leaderboard");
        })
    };

  return (
    <div className='popup'>
        <div className='content'>
            <div className='congrats'>Congratulations! You finished in {props.time} seconds!</div>

            <div className='input-container'>
                <div className='name-title'>Input your name to be on the leaderboard: </div>
                <div className='name-input'><input id='name-text' className='texter' type='text' autoComplete='off'></input></div>
                <div className='popup-buttons'>
                    <button onClick={() => {navigate('/')}} className='home-btn'>Home</button>
                    <button onClick={() => {addDb()}} className='submit-btn'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Popup