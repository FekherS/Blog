import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';

const HomePage = () => {
	
	return (
		<>
			<NavBar/>
			<div className="bg-base-100 p-5" >
				<Posts/>
			</div>
		</>
	)
}

export default HomePage
