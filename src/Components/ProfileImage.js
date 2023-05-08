

import React,{useContext,useEffect,useState} from 'react'
import "../CSS-Components/ProfileImage.css"
import axios from 'axios'
import {ContextAuth} from "../Components/ContextApi"
import {Image} from 'cloudinary-react'
import {Link,useNavigate} from 'react-router-dom'

export default function ProfileImage({toogle}) {
  const [imageOpt,setImageOpt] = useState({});
  const {authState,setAuthState} = useContext(ContextAuth);


  
  useEffect(() => {
    axios.get("http://localhost:3002/user/auth",{
      headers:{
        accessToken1:localStorage.getItem("accessWebToken")
      }
    }
    ).then((response) => {
  if(response.data.error){
    setAuthState({...authState,status:false})
    console.log("there is no data");
  }else{
    setAuthState({
      name: response.data.Name,
      id: response.data.id,
      photo: response.data.UserImage,
      status: true
    })
    setImageOpt(response.data);
    console.log(response.data);
  }
    })
  },[])
const navigate = useNavigate();
  return (
    <div className='user-container' onClick={() => toogle(false)}>
    <div className='user-row'> 
      <div className='image-edit'>
    {imageOpt.UserImage === "userimage.jpg" ? (
   <img src={authState.photo} style={{width:"10rem",height:"10rem",borderRadius:"5rem"}}/>
):(
     <>
   <Image cloudName="georgecancode"  public_id={authState.photo} style={{width:"10rem",height:"10rem",borderRadius:"5rem"}}/>
        </>
)}

<button className='edit-button' onClick={()=>navigate(`/edit-profile-image/${authState.id}`)}>Edit</button> 


</div>
<div className='name-edit'>
<h3>{authState.name}</h3>
<button className='edit-button2'>Edit</button>
</div>
      </div>
     </div>
  )
}
