import React,{useState,useEffect,useContext} from 'react'
import "../CSS-Components/Modal.css"
import {ContextAuth} from "../Components/ContextApi"
import { Navigate, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"


function EditPost({editPost}) {
  const {id} = useParams();
  const [editPostWork,setEditPostWork] = useState([]);
  const [editpost,setEditPost] = useState("");
 
    const schma = yup.object().shape({
      
        post: yup.string().required("post is require")
       })
       const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(schma)
       })
    const navigate = useNavigate();   
       const onSubmit = data => {
       const editPost = data;
       console.log(editPost);
        Axios.put(`http://localhost:3002/UserPost/update/${id}`,data
  
        ).then((response) => {
   if(!response){
    console.log("no response");
   }else{
   navigate("/");
   }
        })
       }
       useEffect(() => {
     Axios.get(`http://localhost:3002/UserPost/editPost/${id}`,
        
        ).then((response) => {
         if(response){
           console.log(response.data);
           setEditPostWork(response.data)
        }else{
           console.log("no data loged");
         }
        })
       
     },[])
    
  return (
    <div className='editPost'>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div><p>{errors.post?.message}</p></div>
        <div>
        <textarea rows="10" cols="50" {...register("post")} className="teaxtArea" 
         defaultValue={editPostWork.post}>
        </textarea>
        </div>
      <div><input type="submit" className='send-post'/></div>
        
        </form>
       
     </div>
  )
}

export default EditPost