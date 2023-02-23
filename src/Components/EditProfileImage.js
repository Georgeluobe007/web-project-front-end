import React,{useState} from 'react'
import "../CSS-Components/ProfileImage.css"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function EditProfileImage() {
    const [profileImage,setProfileImage] = useState("");
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
       let navigate = useNavigate()
  const upload = () => {
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append('upload_preset',  'ulkg70ud');

   axios.post('https://api.cloudinary.com/v1_1/georgecancode/image/upload',formData).then((response) => {
    const fileName = response.data.public_id;
    console.log(fileName);
    axios.post("http://localhost:3002/editProfile/editImage",{
       newImage : fileName
    },{
        headers:{
            accessToken1:localStorage.getItem("accessWebToken")
          }
    }).then((response) => {
       if(!response.data){
        console.log(response.data);
       }else{
        console.log(response.data);
       }
    })
   })
  }
  return (
    <div className='editprofileimg1'>
        <div className='editprofileimg'>
                <h1 className='times' onClick={()=>navigate("/user-page")}>+</h1>
 
     <div>
        <img src={profileImage} style={{width:"15rem",height:"15rem"}}/>
        <div className='didiud'>
<input type="file" onChange={imageHandler} id="input" className='input-img'/>
<label htmlFor='input' className='image-upload'>
         <i className="fa fa-camera">Edit Photo</i>
         </label>
         <button className='btn-upload' onClick={upload}>Upload</button>
         </div>
         </div>
</div>
    </div>
  )
}

export default EditProfileImage