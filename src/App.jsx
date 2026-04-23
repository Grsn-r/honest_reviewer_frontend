import { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main/reviews/Main.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './components/register.jsx';
import Login from './components/login.jsx';
import * as auth from './utils/auth.js';
import UserContext from './context/userContext.js';
import api from './utils/api.js';
import ProtectedRoute from './ProtectedRoute.jsx';


function App() {

  const [logged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [popup, setPopup] = useState(null);

  function handlePopup(popup){
    setPopup(popup);
  }

  function handleClosePopup(){
    setPopup(null);
  }

  const navigate = useNavigate();
  
  const handleRegister = ({name, email, password}) => {
    auth.register(name, email, password)
    .then(data => {
      if (data) {
        setTimeout(() => {navigate('login')}, 2000);
      }
    })
    .catch(err => {
      return console.error(`Error: ${err}`);
    })
  }

  const handleLogin = ({email, password}) => {
    if (email && password) {
      auth.login(email, password)
      .then(data => {
        if (data && data.token) {
          api.setAuthJwt(data.token);
          Promise.all([
            api.getUserData()
          ])
          .then(([userData]) => {
            setUser(userData);
            setIsLogged(true);
            navigate('/');
          })
        }
      })
      .catch(error => {
        return console.error(error);
      })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsLogged(false);
    }
    api.setAuthJwt(token);
    setIsLogged(true);
    navigate('/');
    Promise.all([
      api.getUserData()
    ])
    .then(([response]) => {
      setUser(response);
    })
    .catch(err => {
      setIsLogged(false);
      console.error(err);
    })
  },[]);

  const logout = () => {
    localStorage.removeItem('jwt');
    setIsLogged(false);
    navigate('/login');
  }

  const handleUpdateInfo = (data) => {
    api.setUserData(data)
    .then(newData => {
      setUser(prev => ({...prev, ...data}));
      handleClosePopup();
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <div className='page'>
      <UserContext.Provider value={{user,
        popup,
        logged,
        handleClosePopup, 
        setUser,
        handleUpdateInfo}}>
        <Header
        logged={logged}
        logout={logout}
      />
      <Routes>
        <Route path='/register' element={<Register handleRegister={handleRegister}/>} />
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/' element={
          <ProtectedRoute>
            <Main 
              onOpenPopup={handlePopup}/>
          </ProtectedRoute>
          } />
      </Routes>
      <Footer/>
      </UserContext.Provider>
    </div>
  )
}

export default App
