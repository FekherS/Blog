import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePage from './Pages/CreatePage';
import ViewPost from './Pages/ViewPost';
import ViewProfile from './Pages/ViewProfile';
import { LoginProvider } from './context/LoginContext';

const App = () => {
  return (
    <LoginProvider>
      <div data-theme="retro" className='min-h-screen'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/profil/:id" element={<ViewProfile />} />
        </Routes>
      </div>
    </LoginProvider>
  );
};

export default App;
