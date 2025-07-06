import React, { useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePage from './Pages/CreatePage';
import ViewPost from './Pages/ViewPost';
import ViewProfile from './Pages/ViewProfile';
import EditPage from './Pages/EditPage';
import { LoginProvider } from './context/LoginContext';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <LoginProvider>
        <Content/>
      </LoginProvider>
    </ThemeProvider>
  );
};

const Content = () => {
  const { theme, setDarkMode } = useContext(ThemeContext);

  return (
    <div data-theme={theme} className="min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/user/:id" element={<ViewProfile />} />
      </Routes>
    </div>
  );
};
export default App;
