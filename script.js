
let logIn = (user,pass)=>{
  axios({
    method:'post',
    url:'http://localhost:5000/log-in',
    proxy:'http://localhost:3000',
    data:{
      username:user,
      password:pass,
    }
  }).catch(console.error)
}

let logInButton = document.querySelector('.log-btn')
let username = document.querySelector('.username-li').value
let password = document.querySelector('.password-li').value

logInButton.addEventListener('click',()=>{
  logIn(username,password)
})
