import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const { userId, isLoggedIn, logout } = useContext(LoginContext); 
	
	return (
		<nav className='navbar bg-base-300'>
			<div className="flex-1">
				{/* logo  TBA */}
				<Link to="/" className="btn btn-ghost text-xl" >Home Page</Link>
			</div>

			{isLoggedIn ? (
				<div className="flex-none">
					<Link to={`/create`} className="btn btn-ghost text-xl">New Post</Link>
					<Link to={`/profil/${userId}`} className="btn btn-ghost text-xl">Profil</Link>
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
