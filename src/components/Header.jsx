import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="App-header">
      <Link to="/">
        <h1>Just Do It</h1>
      </Link>

      <h2>A to-do list ready to be done.</h2>

      <GiHamburgerMenu className='App-header-hamIcon' size={30} />
    </header>
  )
}

export default Header