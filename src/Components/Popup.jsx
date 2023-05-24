import React from 'react'

const Popup = (props) => {
  return (
    <div className='popup'>
        <div className='content'>
            <div className='congrats'>Congratulations! You finished in {props.time} seconds!</div>

            <div className='input-container'>
                <div className='name-title'>Input your name to be on the leaderboard: </div>
                <div className='name-input'><input className='texter' type='text' autoComplete='off'></input></div>
                <div className='popup-buttons'>
                    <button className='home-btn'>Home</button>
                    <button className='submit-btn'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Popup