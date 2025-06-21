import React from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePage from './Pages/CreatePage';
import ViewPage from './Pages/ViewPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/post/:id" element={<ViewPage/>} />
      </Routes>
    </div>
  );
};

export default App;