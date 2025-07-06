import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { LoginContext } from '../context/LoginContext';
import toast from 'react-hot-toast';

const  ViewPost =  () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const { userId, isLoggedIn, token } = useContext(LoginContext); 

	const formatDate = (dateStr) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
	};

	useEffect(() => {
		fetch(`http://localhost:5001/api/posts/${id}`)
			.then((res) => {
				if (!res.ok) throw new Error('Failed to fetch post');
				return res.json();
			})
			.then((data) => {
				setPost(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

	const navUser = (e) => {
		e.stopPropagation();
		if (post?.user?._id) {
			navigate(`/user/${post.user._id}`);
		}
	};
	const handleEdit = (e) => {
		e.stopPropagation();
		navigate(`/edit/${id}`)

	};
	const handleDelete = async (e) => {
		e.stopPropagation();
		try {
			
			const response = await fetch(`http://localhost:5001/api/posts/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'authorization' : `Bearer ${token}`
				},
			});
			if (response.ok) {
				toast.success("Deleted successfully");
				navigate('/');
			} else {
				const data = await response.json();
				toast.error("Post Failure")
				console.log(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	};
	
	if (!post) return null;
	const dateLabel =
		post.updatedAt && (post.updatedAt !== post.createdAt)
			? `updated ${formatDate(post.updatedAt)}`
			: `posted ${formatDate(post.createdAt)}`;
			return (
				<>
					<NavBar />
					<div className="flex justify-center mt-10">
						<div className="card w-full max-w-3xl bg-base-200 shadow-xl p-6 relative">
							{isLoggedIn && post.user._id === userId ? (
								<div className="absolute top-4 right-4 flex gap-2">
									<button className="btn btn-sm btn-circle btn-primary" onClick={handleEdit}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
											viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
											<path strokeLinecap="round" strokeLinejoin="round"
												d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5H3v-3.5L16.732 3.732z" />
										</svg>
									</button>
									<button className="btn btn-sm btn-circle btn-error" onClick={handleDelete}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
											viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
											<path strokeLinecap="round" strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							) : null}
							<div className="card-body">
								<h1 className="card-title text-3xl mb-2">{post.title}</h1>
								<p
									className="text-sm text-primary font-medium mb-2 cursor-pointer hover:underline"
									onClick={navUser}
								>
									{post.user?.name || 'Unknown author'}
								</p>
								<p className="text-sm text-gray-500 italic mb-4">{dateLabel}</p>
								<p className="whitespace-pre-line text-base">{post.body}</p>
							</div>
						</div>
					</div>
				</>
			);
		};
export default ViewPost;