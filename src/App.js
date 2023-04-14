import React  from 'react'
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Register from './Register';
import Login from './Login';
import { BrowserRouter ,Route , Routes} from 'react-router-dom';
import { useState } from 'react';
import { LoginContext } from './LoginContext';

const App = () => {
  const [userLogin, setuserLogin] = useState(false);
  const [userName, setuserName] = useState('');
  return (
    <BrowserRouter>
      <div className="app">
        <LoginContext.Provider value={{ setuserLogin , setuserName}}> 
        {
          
          !userLogin?
          <div className="register_login">
            <Routes>
              <Route path='/' element={<Register/>}> </Route>
              <Route path='/login' element={<Login/>}> </Route>
            </Routes>
          </div>:
          (
          <div className="appBody">
            <Sidebar userName={userName}/>
            <Routes>
              <Route path='/' element={<Chat userName={userName}/>}></Route>
              <Route path='/group/:groupId' element={<Chat userName={userName}/>}></Route>
            </Routes>
          </div>)
        }
    </LoginContext.Provider>
    </div>
    </BrowserRouter>
  )
}

export default App