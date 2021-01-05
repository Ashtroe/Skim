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


let SignUp = (props)=>{

  let {user, setUser, sub, setSub}= useContext(UserContext)

  let signUp = (user,pass)=>{
    axios({
      method:'post',
      url:'/sign-up',
      data:{
        username:user,
        password:pass,
      }
    })
    .then(data=>setUser(data.data))
  }

  useEffect(()=>
    {
      setSub('Sign Up')
    }
    ,[])

  useEffect(()=>{
    return(
      <Redirect to="/home"/>
    )
  },[user])

  return(
    (!user) ?
    <div className='sign-up-ctnr'>
      <input className='username-su' placeholder='Username' />
      <input className='password-su' placeholder='Password' />
      <button className='submit-su' onClick={()=>
          {
          let username = document.querySelector('.username-su').value
          let password = document.querySelector('.password-su').value
          signUp(username,password)
          }
        }>submit</button>
    </div>
    : <Redirect to="/Log-in"/>
  )
}
export default SignUp
