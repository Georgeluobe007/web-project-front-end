import React,{useState} from 'react'

import axios from 'axios';
import "../CSS-Components/NerUser.css"
function ForgetPassword() {
   const [recoverEmail,setRecoverEmail] = useState("");
   const [post,setPost] = useState(null)
  

    const submitEmail = () =>{
axios.post("http://localhost:3002/user/forgetPassword",{
  email:recoverEmail
}).then((response) => {
  if(response.data.recovery){
  console.log(response.data.recovery);
  setPost(response.data.recovery)
  }else{
    console.log(response.data.usermail);
    setPost(response.data.usermail)
  }
})
    }
  return (
    <div className='bigContainer'>
  <div className='container'>
  <div className='inside-container'>
       <label>Email..</label>
       <input type="email" className='forget-email'
        onChange={(event) => setRecoverEmail(event.target.value)}/>
       </div>
       <button onClick={submitEmail} className="submit-email">Send</button>
      <h1>{post?post:<i className="fa-solid fa-loader"></i>}</h1>
  </div>
        
        </div>
  )
}

export default ForgetPassword