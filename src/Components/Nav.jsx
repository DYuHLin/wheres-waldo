import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <nav className='header'>
        <div className='left'>
            <Link to = "/" style={{textDecoration: 'none'}}>
                <div className='logo-text'>
                    Find/Found
                </div>
            </Link>
        </div>

        <div className='right'>
          <Link to = "/leaderboard" style={{textDecoration: 'none'}}>
            <div className='leader'>
              Leaderboard
            </div>
          </Link>
        </div>
    </nav>
  )
}

export default Nav