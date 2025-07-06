import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import toast from 'react-hot-toast';
import PostForm from '../components/PostForm';

const CreatePage = () => {

	const { token, isLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();

	const handleSubmit = async (title, body) => {
		try {
			if (!isLoggedIn) throw new Error("Login First");
			const response = await fetch('http://localhost:5001/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'authorization' : `Bearer ${token}`
				},
				body: JSON.stringify({ title, body }),
			});
			console.log(response);
			if (response.ok) {
				toast.success("Posted successfully");
				navigate('/');
			} else {
				const data = await response.json();
				toast.error("Post Failure")
				console.log(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar/>
			<PostForm initialTitle="" initialBody="" handleSubmit={handleSubmit}/>
		</div>
  )
}

export default CreatePage

