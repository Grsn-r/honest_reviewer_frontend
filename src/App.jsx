import { useState } from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main/main.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './components/register.jsx';
import Login from './components/login.jsx';

function App() {
  

  return (
    <div className='page'>
      <Header/>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Main/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
