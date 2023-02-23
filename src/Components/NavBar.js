import React,{useState,useContext,useEffect} from 'react'
import {ContextAuth} from "../Components/ContextApi"
import Axios from 'axios'
import '../CSS-Components/NavBar.css'
import {Link,useNavigate} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import ProfileImage from './ProfileImage'
function NavBar() {
  const [showhidden,setShowhidden] = useState(false);
  const [imageOpt,setImageOpt] = useState({});
const [toogle,setToogle] = useState(false)

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
    status: true
  })
  setImageOpt(response.data);
  console.log(response.data);
}
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
  navigate("/");
}

  return (
    <div className='nav-bar'>
        <div className='left-side'>
          <div><input type="search" className='search-input'/></div>
        <div className='div-serach-btn'><button className='search-btn'>Search</button></div>
       </div>
  {!authState.status ? (
    
    <>
    
    <div className='right-side' id={showhidden ? "hidden": ""}>
    <div className='leftSide-link' onClick={() => setShowhidden(!showhidden)}>
    <Link to="new-user" className='new-user-link'>
      Don't have account ?
      </Link>
    </div>
     <div className='rightSide-link'onClick={() => setShowhidden(!showhidden)}>
     <Link to="old-user" className='old-user-link'>
      Already have account ?
      </Link>
     </div>
   </div>
 <button className='openOption'onClick={() => setShowhidden(!showhidden)}>Open</button>
</>
 
  ):(
    <div className='user-log'>
    <div className='image-user' onClick={() => {setToogle(!toogle)}} >
    
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
     <Link className='resume-link'>
        resume
     </Link>
     </div>
     <div className='logOut-user' onClick= {logOut}>
     <Link className='logout-link'>
         Log Out
     </Link>
     </div>
    
    </div>
  )}
{toogle &&<ProfileImage toogle={setToogle}/>}
    </div>
    
  )
}

export default NavBar