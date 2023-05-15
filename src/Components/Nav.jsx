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

        <div className='right'>
            
        </div>
    </nav>
  )
}

export default Nav