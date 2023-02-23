import axios from 'axios';
import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {useForm} from 'react-hook-form'

function PasswordRecovery() {
 let {id,token} = useParams();
    const schma = yup.object().shape({
      password: yup.string().required("password is needed"),
       confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  
      })
    const { register, handleSubmit, formState: { errors }} = useForm({
      resolver:yupResolver(schma)
    });
 
    const OnSubmit = (data) =>  {
useEffect(() => {
   axios.get("http://localhost:3002/user/reset-password/:id/:token",{
      id:id,
      token:token
  }).then((response) => {
if(response.data){
  console.log("gdudgdshks");
}else{
  console.log("hbdjdhdhjdj");
}
  },[])
})
      }
  return (
    <div>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div>
      <label>New Password</label>
      <input type='password' {...register("password")}/>
     </div>
     <p>{errors.password?.message}</p>
     <div>
      <label>Confirm New Password</label>
      <input type='password' {...register("confirmpassword")}/>
     </div>
     <p>{errors.confirmpassword?.message}</p>
     <input type="submit"/>
        </form>
    </div>
  )
}

export default PasswordRecovery