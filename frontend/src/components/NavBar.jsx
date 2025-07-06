import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const NavBar = () => {
	const { userId, isLoggedIn, logout } = useContext(LoginContext); 
	const { theme, setDarkMode } = useContext(ThemeContext);
	const handleToggle = () => {
		setDarkMode(theme !== 'dark');
	  };
	return (
		<nav className='navbar bg-base-300'>
			<div className="flex-1">
				{/* logo  TBA */}
				<Link to="/" className="btn btn-ghost text-xl" >Home Page</Link>
				<label className="cursor-pointer flex items-center gap-2">
					<input 
						type="checkbox" 
						className="toggle toggle-primary" 
						checked={theme === 'dark'} 
						onChange={handleToggle} 
					/>
				</label>
			</div>

			{isLoggedIn ? (
				<div className="flex-none">
					<Link to={`/create`} className="btn btn-ghost text-xl">New Post</Link>
					<Link to={`/user/${userId}`} className="btn btn-ghost text-xl">Profil</Link>
					<button className="btn btn-ghost text-xl" onClick={logout}> Logout</button>
				</div>
			) : (
				<div className="flex-none">
					<Link to="/login" className="btn btn-ghost text-xl">Login</Link>
					<Link to="/register" className="btn btn-ghost text-xl">Register</Link>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
