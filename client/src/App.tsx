import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
