import React,{useState} from 'react'
import "../CSS-Components/ProfileImage.css"
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';

function EditProfileImage() {
  // const {authState} = useContext(ContextAuth);
    const [profileImage,setProfileImage] = useState("");

const {id} = useParams();
   
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
    axios.put("http://localhost:3002/editProfile/editImage",{ 
       newImage : fileName,
       id:id
    },{
        headers:{
            accessToken1:localStorage.getItem("accessWebToken")
          }
    }).then((response) => {
       if(!response.data){
        console.log("there is no response data");
       }else{
        console.log("there is data");
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