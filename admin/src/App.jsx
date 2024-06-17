
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const FOOD_LIST_URL = 'http://localhost:4000';
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          {/* <Route path='/' element={<Sidebar/>}/> */}
          <Route path='/add' element={<Add FOOD_LIST_URL={FOOD_LIST_URL}/>}/>
          <Route path='/list' element={<List FOOD_LIST_URL={FOOD_LIST_URL}/>}/>
          <Route path='/orders' element={<Orders FOOD_LIST_URL={FOOD_LIST_URL}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App