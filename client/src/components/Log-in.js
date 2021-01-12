import React, {useEffect, useState, useContext} from 'react'
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

let LogIn = () =>{
  let {user, setUser, sub, setSub}= useContext(UserContext)

  useEffect(()=>{
    return(
      <Redirect to="/Home"/>
    )
  },[user])

  useEffect(()=>
    {
      setSub('Log In')
    }
    ,[])


  let logIn = (user,pass)=>{
    axios({
      method:'post',
      url:'/log-in',
      data:{
        username:user,
        password:pass,
      }
    })
    .then(data=>setUser(data.data))
  }

    return(
      (!user) ?
        <div className='log-in-ctnr'>
          <input className='username-li' placeholder='Username' />
          <input className='password-li' placeholder='Password' />
          <button className='submit-li' onClick={()=>
              {
              let username = document.querySelector('.username-li').value
              let password = document.querySelector('.password-li').value
              logIn(username,password)
              }
            }>submit</button>
          <Link to='/signup'>Create Account</Link>
        </div>
      :
      <Redirect to='/' />
    )
}

export default LogIn
