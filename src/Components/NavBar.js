import React,{useState,useContext,useEffect} from 'react'
import {ContextAuth} from "../Components/ContextApi"
import Axios from 'axios'
import '../CSS-Components/NavBar.css'
import {Link,useNavigate} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import ProfileImage from './ProfileImage'
import UserPage from './UserPage'
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
//import styled from 'styled-components'
import styled from '@emotion/styled'



function NavBar() {

  const  [showhidden,setShowhidden] = useState(false)
  const  [showLogInReg,setShowLogInReg] = useState(false)
  const [imageOpt,setImageOpt] = useState({});
const [toogle,setToogle] = useState(false);
const {setSearchBar} = useContext(ContextAuth)
const {authState,setAuthState} = useContext(ContextAuth);



useEffect(() => {
  Axios.get("http://localhost:3002/user/auth",{
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
    status: true,
    userName: response.data.UserName,
  })
  setImageOpt(response.data);
  console.log(response.data);
}
//if(navigator.geolocation){
 // navigator.geolocation.getCurrentPosition((position) =>{
 //let lat = position.coords.latitude;
 //let long = position.coords.longitude
  //})
//}
  })
},[])
const navigate = useNavigate();
const logOut = () => {
  localStorage.removeItem("accessWebToken");
  setAuthState({
    photo: "",
    id: 0,
    name: ""
  })

  navigate("/new-user");
  window.location.reload(true)
}

  return (
    <div className='nav-bar'>
        <div className='left-side'>
          <div>
            <input type="search" className='search-input' 
            onChange={event => {setSearchBar(event.target.value)}}
            />
            </div>
       
       </div>
  {!authState.status ? (
    
    <>
    
    <div className='right-side' id={showLogInReg ? "logInAndRegButton": ""}>

    <div className='leftSide-link' onClick={() => setShowLogInReg(!showLogInReg)}>
    <Link to="new-user" className='new-user-link'>
      Don't have account ?
      </Link>
    </div>
    
     <div className='rightSide-link'onClick={() => setShowLogInReg(!showLogInReg)}>
     <Link to="old-user" className='old-user-link'>
      Already have account ?
      </Link>
     </div>
     
   </div>
   <div className='reglogIn'onClick={() => setShowLogInReg(!showLogInReg)}>{<DensityMediumIcon/>}</div>
  </>
 
  ):(
    <>
    <div className='navBar-logIn'  id={showhidden ? "hidden" : ""} onClick={() => setShowhidden(!showhidden)}>
    <div className='image-user' onClick={() => {setToogle(!toogle)}}>
    
     {imageOpt.UserImage === "userimage.jpg" ? (
   <img src={authState.photo} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}
   
   />
):(
     <>
   <Image cloudName="georgecancode"  public_id={authState.photo} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}/>
        </>
)}
    
     </div>
     <div className='name-user'>
     <Link className='username-link'>
    {`Welcome ${authState.name}`}
     </Link>
     </div>
     <div className='resume-user'>
     <Link className='resume-link'onClick={() => setShowhidden(!showhidden)}>
        resume
     </Link>
     </div>
     <div className='logOut-user' onClick= {logOut}>
     <Link className='logout-link' onClick={() => {setToogle(!toogle)}}>
         Log Out
     </Link>
     </div>
     </div>
     <div className='openOption'onClick={() => setShowhidden(!showhidden)}>{<DensityMediumIcon/>}</div>
    </>
    
  )}
{toogle &&<ProfileImage toogle={setToogle}/>}
   

    </div>
    
      )
}



export default NavBar
