import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className='header'>
        <div className='left'>
            <Link to = "/">
                <div className='logo-text'>
                    Find/Found
                </div>
            </Link>
        </div>

        <div className='center'>
          <div className='characters'>
          <div className='char-con'>
            <img className='char-img' src='./img/level/1/dude.jpeg' alt = 'character' />
          </div>

          <div className='char-con'>
            <img className='char-img' src='./img/level/1/iceking.jpeg' alt = 'character' />
          </div>

          <div className='char-con'>
            <img className='char-img' src='./img/level/1/tom.jpeg' alt = 'character' />
          </div>
        </div>
        </div>

        <div className='right'>
            <div className='leader'>
              <button>Leader</button>
            </div>
        </div>
    </nav>
  )
}

export default Nav