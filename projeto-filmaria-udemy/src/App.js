import React from 'react'
import Routes from './routers'
import './style.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

// https://sujeitoprogramador.com/r-api/?api=filmes/


export default function App() {
  return(
    <div className='app'> 
     <Routes/>
     <ToastContainer autoClose={3000}/>
    </div>
  )
}