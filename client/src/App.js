
import React, {useEffect, useState, useContext} from 'react'
import './css/styles.css';
import './css/iphone.css';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import UserContext from './components/UserContext'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignUp from './components/Sign-up'
import LogIn from './components/Log-in'
import CreatePost from './components/Create-Post'
import PostPage from './components/Post-page'


function App() {
  const [user, setUser] = useState(null)
  const [sub, setSub] = useState('Home')

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
  return (
<UserContext.Provider value={{user,setUser,sub,setSub}}>
    <Router>
      <div className='skim-ctnr'>
        <NavBar subreddit={sub} />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login' >
            <LogIn />
          </Route>
          <Route path='/signup' >
            <SignUp />
          </Route>
          <Route path='/comments/:id' >
            <PostPage />
          </Route>
          <Route path='/createpost' >
            <CreatePost />
          </Route>
        </Switch>
      </div>
    </Router>
</UserContext.Provider>
  )
}

export default App;
