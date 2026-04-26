import { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header';
import Footer from './components/Footer';
import Main from './components/main/Main';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import * as auth from './utils/auth.js';
import UserContext from './context/userContext';
import api from './utils/api';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const [logged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [reviews, setReviews] = useState([]);

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
            api.getUserData(),
            api.getReviews()
          ])
          .then(([userData, reviewsData]) => {
            setUser(userData);
            setReviews(reviewsData);
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
      api.getReviews(),
      api.getUserData()
    ])
    .then(([rvData, userData]) => {
      setUser(userData);
      setReviews(rvData);
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

  const handlesSetPassword = (data) => {
    api.setPassword(data)
    .then(modified => {
      if (modified) {
        handleClosePopup();
      }
    }).catch(err => {
      console.error(err);
    })
  }

  const handlePostReview = (data) => {
    api.setReview(data)
    .then(review => {
      api.getReviews().then(rvs => {
        setReviews(rvs); 
        handleClosePopup();
      })
    })
    .catch(err => {
      return console.error(err);
    })
  }

  const handleReviewDelete = (rv) => {
    api.eraseReview(rv._id).then(() => {
      setReviews(revs => revs.filter(currentRv => currentRv._id !== rv._id));
    }).catch(err => console.error(err));
  }


  const handleComment = (rv, text) => {
    api.setComment(rv._id, text).then((newCmnt) => {
      setReviews(reviews.map(review => {
        if (rv._id === newCmnt._id) {
          return newCmnt 
        } else { return review } //devolver la review intacta
      }))
    }).then(err => console.err(err));
  }

  return (
    <div className='page'>
      <UserContext.Provider value={{
        user,
        reviews,
        popup,
        logged,
        handleComment,
        handlePopup,
        handlePostReview,
        handleClosePopup, 
        setUser,
        handleUpdateInfo,
        handlesSetPassword,
        handleReviewDelete,
        }}>
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
