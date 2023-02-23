import {useForm} from 'react-hook-form'
import  '../CSS-Components/NerUser.css'
import Axios from 'axios'
import { useState} from 'react'
import * as yup from "yup"
import {useNavigate} from "react-router-dom"
import {yupResolver} from '@hookform/resolvers/yup'
import {Base64} from 'js-base64'

  const NewUser = () => {
    const [profileImage,setProfileImage] = useState("userimage.jpg");
  
const schma = yup.object().shape({
  //photo: yup.mixed().test("fileSize", "please profile image is needed", value => {
 //   return value && value.length;
 // }),
  name: yup.string().required("name is needed"),
  userName: yup.string().required("user name is needed"),
  password: yup.string().required("password is needed"),
 confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup.string().email().required("email is needed"),
})

const imageHandler = (e) => {
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
      
     if(fileReader.readyState === 2){
      setProfileImage(fileReader.result);
     
     }
     
    }
    fileReader.readAsDataURL(e.target.files[0]);
    // console.log(e.target.files[0]);
 }

  
  const { register, handleSubmit, formState: { errors },watch } = useForm({
    resolver:yupResolver(schma)
  });

  
  const onSubmit = data => {

    const {name,userName,password,email} = data;
       console.log(data);
       const formData = new FormData();
       formData.append("file", profileImage)
       formData.append('upload_preset',  'ulkg70ud');
 //console.log("empty work",profileImage);
 if(profileImage === "userimage.jpg"){
 Axios.post("http://localhost:3002/user/userRegister",{
  photo: profileImage,
  userName:  userName,
  password: password,
  email: email,
  name: name
 }).then((response) => {
  if(!response.data){
    console.log("erro occur while trying to submit");
  }else{
    console.log("success"); 
  }
 })
 }else{
  Axios.post('https://api.cloudinary.com/v1_1/georgecancode/image/upload',formData).then((response) => {
    const fileName = response.data.public_id;
   // console.log(fileName);
   Axios.post("http://localhost:3002/user/userRegister",{
    photo: fileName,
    userName:  userName,
    password: password,
    email: email,
    name: name
   }).then((response) =>{
 if(!response.data){
  console.log("erro occur while trying to submit");
 }else{
  console.log("success");
 }
   })
  })
 }
  }

  return(
    <div> 
     <img src={profileImage} className='image-screen'/>
      <form onSubmit={handleSubmit(onSubmit)}>
       
          <div>
    <input type="file"  className='input-img'  id='input' accept="image/png, image/jpeg"  onChange={imageHandler} />
           <label htmlFor='input' className='image-upload'>
         <i className="fa fa-camera">Edit Photo</i>
         </label>
           </div>
  
     
      <p>{errors.photo?.message}</p>
     <div>
      <label>Name</label>
      <input type='text' {...register("name")}/>
     </div>
     <p>{errors.name?.message}</p>
     <div>
      <label>User Name</label>
      <input type='text' {...register("userName")}/>
     </div>
     <p>{errors.userName?.message}</p>
     <div>
      <label>Email..</label>
      <input type='text' {...register("email")}/>
     </div>
     <p>{errors.email?.message}</p>
     <div>
      <label>Password</label>
      <input type='password' {...register("password")}/>
     </div>
     <p>{errors.password?.message}</p>
     <div>
      <label>Confirm Password</label>
      <input type='password' {...register("confirmpassword")}/>
     </div>
     <p>{errors.confirmpassword?.message}</p>
      <input type="submit"/>
    </form>

    </div>
  )


}
export default NewUser;