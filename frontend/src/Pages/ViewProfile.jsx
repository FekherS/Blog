import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import Posts from '../components/Posts';
import { useParams, useNavigate } from 'react-router-dom';

const ViewProfile = () => {
  const { isLoggedIn, userName } = useContext(LoginContext); 
  const { id } = useParams();

	return (
		<>
			<NavBar/>
			<div className="bg-base-100 p-5" >
				<Posts userId={id}/>
			</div>
		</>
	)
}

export default ViewProfile

