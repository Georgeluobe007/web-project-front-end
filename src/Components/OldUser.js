import React,{useContext,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import '../CSS-Components/NerUser.css'
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'
import {ContextAuth} from "../Components/ContextApi"
import {Icon} from "react-icons-kit"
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
function OldUser() {
  
  const {setAuthState} = useContext(ContextAuth);
const [passwordEye,setPasswordEye] = useState("password")
const [icon,setIcon] = useState(eyeOff)
const eyeIcon = () => {
 
  if(passwordEye === "password"){
     setPasswordEye("text");
     setIcon(eye)
  }else{
    setPasswordEye("password");
    setIcon(eyeOff)
  }
}
  const schema = yup.object().shape({
    userName: yup.string().required(),
       password: yup.string().min(5).required(),
   })
   const {handleSubmit,register,formState: {errors}} = useForm({
    resolver:yupResolver(schema)
  });
  let navigator = useNavigate();
  const submitForm = (data) => {
    const{userName,password} = data
Axios.post("http://localhost:3002/user/login",{
  userName:userName,
  password:password
}).then((response) => {
  if(response.data.usermessage){
   console.log("i am here with you");
  }else{
   localStorage.setItem("accessWebToken", response.data.token1); 
   setAuthState({
    name: response.data.Name,
    photo: response.data.UserImage,
    id: response.data.id,
    status: true
   })
   navigator("/")
   window.location.reload(true)
  }
})
  }



  return (
   <div className='logIn-class'>
   <form onSubmit={handleSubmit(submitForm)}>
 <div>
       <label>User Name:</label>
       <input type="text" {...register("userName")} className="input1"/>
       </div>
      <p>{errors.userName?.message}</p>
    <div className='password-input'>
     <label>Password:</label>
      <div className='icon-input'>
      <input type={passwordEye} {...register("password")}/>
     <span onClick={eyeIcon} className="icon"><Icon icon={icon}/></span> 
     </div>
      </div>
      <div className='forgetpassword-link'>
        <Link to="/forgetpassword" className='link-forget'>
          Forget Password ?</Link></div>
      <p>{errors.password?.message}</p>
      
      <input type="submit" />
    
    </form>

   </div>
  )
  
  
}

export default OldUser