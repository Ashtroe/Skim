import React, {useEffect, useState, useContext, useRef} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import axios from 'axios'
import UserContext from './UserContext'
import Hamburger from './Hamburger'

let NavBar = (props)=>{
  let {user, setUser, sub, setSub}= useContext(UserContext)
  const wrapperRef = useRef(null);

  useEffect(() => {
   document.addEventListener("click", handleClickOutside, false);
   return () => {
     document.removeEventListener("click", handleClickOutside, false);
   };
 }, [])

  let handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      document.querySelector('.menu-ctnr').style.visibility = 'hidden'
    }
  }

  return(
    <div className='nav' ref={wrapperRef}>
      <Hamburger />
      <div className='nav-subreddit'>
        <h4>{props.subreddit}</h4>
      </div>
    </div>
  )
}

export default NavBar
