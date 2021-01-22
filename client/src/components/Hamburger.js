import React, {useEffect, useState, useContext, useRef} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

let Hamburger = () =>{
  return (
    <div className='nav-menu' onClick={()=>{
        document.querySelector('.menu-ctnr').style.visibility = 'visible'
      }}>
      <div className='hamburger-line'></div>
      <div className='hamburger-line'></div>
      <div className='hamburger-line'></div>
      <div className='menu-ctnr'>
        <Link to='/'>Home</Link>
        <Link to='/account'>View Account</Link>
        <Link to='/createpost'>Create Post</Link>
        <Link to='/signout'>Sign Out</Link>
      </div>
    </div>
  )
}

export default Hamburger
