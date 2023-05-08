import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import "../CSS-Components/Modal.css"
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Modal({modal}) {
 const navigate = useNavigate()
  const schma = yup.object().shape({
   title: yup.string().required("title is required"),
   post: yup.string().required("post is require")
  })
  const {register,handleSubmit,formState:{errors}} = useForm({
   resolver:yupResolver(schma)
  })
  const onSubmit = data => {
Axios.post("http://localhost:3002/UserPost/post",data,{
  headers:{
    accessToken1:localStorage.getItem("accessWebToken")
  }
}).then((response) => {
  if(response){
 modal(false);
  }else{
    console.log("data did not go through");
  }
})
  }
  return (
    <div className='write-post'>
        <div className='title-post'>
               <p className='counsel' onClick={() => modal(false)}>+</p>
               <form onSubmit={handleSubmit(onSubmit)}>
            <div className='title'>
            <label>Title:</label>
            <input type="text" className='input-text' {...register("title")}/> 
            </div>
            <p>{errors.title?.message}</p>
         <div className='write-post'>
            <label className='label-write-post'>Write post:</label>
            <textarea rows="10" cols="50"  {...register("post")}/>
            </div>  
            <p>{errors.post?.message}</p>
            <input type="submit" className='send-post'/>
        </form>
        </div>
    </div>
  )
}

export default Modal