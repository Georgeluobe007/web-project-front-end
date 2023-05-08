import './App.css';
import {useState} from 'react'
import NavBar from './Components/NavBar';
import {ContextAuth} from './Components/ContextApi'
import {Routes,Route} from 'react-router-dom'
import NewUser from './Components/NewUser';
import OldUser from './Components/OldUser';
import ProfileImage from './Components/ProfileImage';
import ForgetPassword from './Components/ForgetPassword';
import FrontPage from './Components/FrontPage';
import UserPage from './Components/UserPage';
import PasswordRecovery from './Components/PasswordRecovery';
import EditProfileImage from './Components/EditProfileImage';
import Search from './Components/Search';
import EditPost from './Components/EditPost';
function App() {
const [authState,setAuthState] = useState({
name:"",
id: 0,
photo: "",
status: false,
userName: "",
email: "",
otp: ""
});

const [searchBar,setSearchBar] = useState("")
  return (
    <div className="App">
  <ContextAuth.Provider value={{authState,setAuthState,searchBar,setSearchBar}} >
      <NavBar/>
      <Routes>
        <Route path='/new-user' element={<NewUser/>}/>
        <Route path='/old-user' element={<OldUser/>}/>
        <Route path='/front-page' element={<FrontPage/>}/>
        <Route path='/profile-image' element={<ProfileImage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/edit-profile-image/:id' element={<EditProfileImage/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/' element={<UserPage/>}/>
       <Route path='/recovery/:id/:token' element={<PasswordRecovery/>}/>
       <Route path='/edit-post/:id' element={<EditPost/>}/>
      </Routes>
     
      </ContextAuth.Provider>
    </div>
  );
}

export default App;
