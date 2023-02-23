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

function App() {
const [authState,setAuthState] = useState({
name:"",
id: 0,
photo: "",
status: false,
email: "",
otp: ""
})
  return (
    <div className="App">
  <ContextAuth.Provider value={{authState,setAuthState}} >
      <NavBar/>
      <Routes>
        <Route path='new-user' element={<NewUser/>}/>
        <Route path='/old-user' element={<OldUser/>}/>
        <Route path='/' element={<FrontPage/>}/>
        <Route path='/profile-image' element={<ProfileImage/>}/>
        <Route path='/edit-profile-image' element={<EditProfileImage/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/user-page' element={<UserPage/>}/>
    
        <Route path='/recovery/:id/:token' element={<PasswordRecovery/>}/>
      </Routes>
      </ContextAuth.Provider>
    </div>
  );
}

export default App;
