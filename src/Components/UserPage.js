import React,{useState,useContext,useEffect} from 'react'
import {ContextAuth} from "../Components/ContextApi"
import {Image} from 'cloudinary-react'
import Modal from './Modal';
import Axios from 'axios';
import '../CSS-Components/UserPage.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import EditPost from './EditPost';
import {useNavigate,useParams} from 'react-router-dom';
export default function UserPage() {
const [editPost,setEditPost] = useState(false)
  const {authState} = useContext(ContextAuth);
  const {searchBar} = useContext(ContextAuth);
  const {postWork1,setPostWork1} = useContext(ContextAuth)
  console.log(searchBar);
  const [postWork,setPostWork] = useState([]);


  //const [vanguard,setVanguard] = useState("");
         // console.log(vanguard);
       
          
  const {id} = useParams();
        const [modal,setModal] = useState(false)
        console.log(modal);
      useEffect(() => {

  
        
       Axios.get("http://localhost:3002/UserPost/getPost").then((response) => {
        if(response){
          console.log(response.data);
          setPostWork(response.data);
   
        }else{
          console.log("no data loged");
        }
       })
      
    },[])
    const navigate = useNavigate();
    
      const deleteBtn = (id) => {
       Axios.delete(`http://localhost:3002/UserPost/delete/${id}`).then((response) => {
        if(response.data){
          console.log("delete successfuly");
          console.log(id);
        }else{
          console.log("delete not successful");
        }
       })
      }  

 
  return (
    <div className='post-work'>
     <div className='post-work-btn'>
     {authState.photo === "userimage.jpg" ?(
        <>
        <img src={authState.photo} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}/>
       </>
      ):(
        <>
         <Image cloudName="georgecancode"  public_id={authState.photo} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}/>
        </>
      )}
      <button onClick={() =>{setModal(!modal)}}>hi {authState.name}, do you want to post a job ?</button>
     </div>
    {modal &&<Modal modal = {setModal}/>}
<div className='three-column'>
<div  className='slider1'>
     
        <img src='verve-2.jpg' style={{height:'10rem',width:'10rem'}}/>
        <img src='verve.jpg' style={{height:'10rem',width:'10rem'}}/>
        <img src='wine.jpg' style={{height:'10rem',width:'10rem'}} />
     
 </div >
 <div className='writting'>
{postWork.filter((val) => {
  if(searchBar == "") {
     return val;
  } else if (val.title.toLowerCase().includes(searchBar.toLowerCase())){
    return val;
  }
  
}).
map((value,key) => {
  const time = new Date(value.createdAt);
console.log(`want to get from you ${time}`);

    return <div className='image-userName' key={key}>
      <div className='image-userName-2'>
{value.image === "userimage.jpg" ? (
  <>
   <img src={value.image} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}/>
  </>
):(
<>
<Image cloudName="georgecancode"  public_id={value.image} style={{width:"3rem",height:"3rem",borderRadius:"5rem"}}/>
</>
)}
<div className='username'>
{value.username}

</div>
</div>
{value.post}
<div className='footer-post'>
  <div className='date-time'>{`This was posted on ${time.toDateString()}`}</div>
  {authState.userName === value.username && (
    <div className='delete-post' onClick={()=>deleteBtn(value.id)}> Delete Post {<DeleteIcon className='celeteIcon'/>}</div>
   
  )}

<div className='edit-btn'>
{authState.userName === value.username && (
    <button className='btn-edit' onClick={() => navigate(`/edit-post/${value.id}`) }>
    Edit Post {<CreateIcon/>}
    </button>
   
  )}
 
    </div>
</div>
 </div>
  })} 
  </div>
  <div className='api'>
<script src='https://www.vanguardngr.com/'></script>
hfjfhfbfgkgfhffhgfjhfgbnfjlddhnmdd
  </div>
</div>

   </div>
  )
}
