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
import FullReview from './components/main/reviews/Full-review'
import Popup from './components/popups/Popup'
import InfoTool from './components/InfoTool.jsx';


function App() {

  const [logged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [iTool, setItool] = useState(false);

  const review = popup?.reviewId ? reviews.find(r => r._id === popup.reviewId) : null ;

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
        setItool(true);
        setTimeout(() => {navigate('login')}, 2000);
      }
    })
    .catch(err => {
      return console.error(err);
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
    api.eraseReview(rv._id).then((res) => {
        return setReviews(revs => revs.filter(currentRv => currentRv._id !== rv._id))
    }).catch(err => {
      return alert('no puedes borrar post ajenos')
    });
  }


  const handleComment = (rv, text) => {
    api.setComment(rv._id, text).then(newCmnt => {
      setReviews(prev => prev.map(review => {
        if (review._id === newCmnt._id) {
          return { ...review, comments: newCmnt.comments};
        } else { return review }
      }))
    }).catch(err => console.error(err));
  }

  const handleCommentDelete = (reviewId, commentId) => {
    api.removeComment(reviewId, commentId).then(updated => {setReviews(
      prev => prev.map(review => review._id === updated._id ? {...review, comments: updated.comments} : review )
    )})
    .then(err => {
      console.log(err)
    })
  }

  const handleLike = (reviewId) => {
    api.likeReview(reviewId)
    .then(liked => {
      setReviews(prev => prev.map(rv => rv._id === liked._id ? {...rv, likes: liked.likes, dislikes: liked.dislikes} : rv))
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDislike = (reviewId) => {
    api.dislikeReview(reviewId)
    .then(disliked => {
      setReviews(prev => prev.map(rv => rv._id === disliked._id ? {...rv, likes: disliked.likes, dislikes: disliked.dislikes} : rv))
    })
  }

  return (
    <div className='page'>
      <UserContext.Provider value={{
        user,
        reviews,
        popup,
        logged,
        handleDislike,
        handleLike,
        handleComment,
        handleCommentDelete,
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
        <Route path='/register' element={<Register handleRegister={handleRegister}>
          {iTool && <InfoTool/>} </Register>} />
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/' element={
          <ProtectedRoute>
            <Main 
              onOpenPopup={handlePopup}/>
            {popup?.reviewId &&  <Popup title={review.title} onClose ={handleClosePopup} >
              <FullReview review={review}/>
              </Popup>}
          </ProtectedRoute>
          } />
      </Routes>
      <Footer/>
      </UserContext.Provider>
    </div>
  )
}

export default App
