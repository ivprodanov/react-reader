import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <div className="buttons-container">
        <Link to={"/eval"}><button className='homepage-button-eval'>
        <h2>Evaluate</h2>
      </button></Link>
        <h2>or</h2>
        <Link to={"/read"}>
        <button className='homepage-button-read'><h2>Read</h2></button>
        </Link>
        </div>
    </div>
  )
}

export default HomePage