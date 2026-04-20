import { useState } from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main/main.jsx'

function App() {
  

  return (
    <div className='page'>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
