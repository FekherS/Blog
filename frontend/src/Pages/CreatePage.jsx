import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import toast from 'react-hot-toast';

const CreatePage = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const { token, isLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
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
				toast.error("Post Failure")
			}
		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar/>
			<div className="flex flex-1 items-center justify-center bg-base-200">	
				<form onSubmit={handleSubmit} className="card w-full max-w-2xl shadow-2xl bg-base-100 p-6 space-y-4">
					<div className="form-control">
						<label className="label">
						<span className="label-text">title</span>
						</label>
						<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="title"
						className="input input-bordered"
						required
						/>
					</div>

					<div className="form-control">
						<label className="label">
						<span className="label-text">body</span>
						</label>
							<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							placeholder="body"
							className="textarea textarea-bordered h-60"
							required
							></textarea>
					</div>

					<div className="form-control mt-4 flex flex-col gap-2">
						<button type="submit" className="btn btn-accent btn-md">Post</button>
						<button type="button" onClick={() => navigate("/")} className="btn btn-secondary btn-sm">Go Home</button>
					</div>
				</form>
			</div>
		</div>
  )
}

export default CreatePage

