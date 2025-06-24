import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import toast from 'react-hot-toast';

const Login = () => {
	const { login } = useContext(LoginContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
    	try {
			const response = await fetch('http://localhost:5001/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (response.ok && data.token) {
				login(data.token, data.user.userName, data.user.id); 
				navigate('/');
			} else {
				toast.error("Login Failure")
			}
		} catch (err) {
			console.error(err);
			toast.error("Login Failure")
		}
	};

	return (
	<div className="min-h-screen flex items-center justify-center bg-base-200">	
		<form onSubmit={handleSubmit} className="card w-full max-w-sm shadow-2xl bg-base-100 p-6 space-y-4">
			<div className="form-control">
				<label className="label">
					<span className="label-text">Email</span>
				</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="input input-bordered"
					required
					/>
			</div>

			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="input input-bordered"
					required
					/>
			</div>

			<div className="form-control mt-4 flex flex-col gap-2">
				<button type="submit" className="btn btn-accent btn-md">Login</button>
				<button type="button" onClick={() => navigate("/")} className="btn btn-secondary btn-sm">Go Home</button>
			</div>
		</form>
	</div>

	);
};

export default Login;
