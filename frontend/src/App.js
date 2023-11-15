
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Register from './pages/Register';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';

import Main from './pages/Main';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';

function App() {

  return (
    <>
      <Router>
        {/* <CssBaseline /> */}
        <Routes>
          <Route path='/' element={<Main />} />
      
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Myposts' element={<MyPosts />} />
          <Route path='/update/profile' element={<UpdateProfile />} />
          <Route path='/update/password' element={<UpdatePassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App