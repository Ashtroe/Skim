import React, {useEffect, useState, useContext} from 'react'
import { Route, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from './UserContext'

let AccountPage = (props) =>{
  let {user, setUser, sub, setSub}= useContext(UserContext)
  let [userInfo, setUserInfo] = useState({})

  let getAccount = (id) =>{
    axios({
      method:'get',
      url:'/account',
      data: {
        id: id
      }
    }).then((response)=>setUserInfo(response))
  }

  useEffect(()=>
    {
      setSub('Account')
      getAccount(user._id)
    }
    ,[])

  return(
    <div className= 'account-ctnr'>
      <div className='overview-ctnr'>
        <div className='comment-karma'>

        </div>
        <div className='post-karma'>

        </div>
        <div className='account-age'>

        </div>
      </div>
    </div>
  )
}

export default AccountPage
