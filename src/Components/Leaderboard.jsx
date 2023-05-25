import React, { useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import FirebaseContext from '../Context/FirebaseContext';
import { useContext } from 'react';

const Leaderboard = () => {
    const {getCollDb} = useContext(FirebaseContext);
    const [currentTable, setCurrentTable] = useState([]);

    const setTable = (item) => {
        const setDb = getCollDb(item);

        onSnapshot(setDb, (snapshot) => {
            let record = [];
            snapshot.docs.forEach((doc) => {
                record.push({...doc.data(), id: doc.id});
                setCurrentTable(record);
            });
            console.log(currentTable);
        });
    };

  return (
    <div className='leaderboard'>
        <div className='chooseLevel'>
            <button onClick={() => {setTable(1)}} className='level-btn first'>Level 1</button>
            <button onClick={() => {setTable(2)}} className='level-btn second'>Level 2</button>
            <button onClick={() => {setTable(3)}} className='level-btn third'>Level 3</button>
            <button onClick={() => {setTable(4)}} className='level-btn fourth'>Level 4</button>
        </div>
        <div className='leaders'>
            <div className='table'>
                <div className='row'>
                    <div className='firstCol lead-title'>Name</div>
                    <div className='secondCol lead-time'>Time in seconds</div>
                </div>
                {currentTable.map(obj => {
                    return(
                        <div className='row'>
                        <div className='data1'>{obj.name}</div>
                        <div className='data2'>{obj.time}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Leaderboard