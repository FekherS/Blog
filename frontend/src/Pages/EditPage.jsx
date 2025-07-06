import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../components/NavBar'
import { useParams, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import toast from 'react-hot-toast';
import PostForm from '../components/PostForm';

const EditPage = () => {
    const { id } = useParams();
	const { token, isLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    
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

	const handleSubmit = async (title, body) => {
		try {
			if (!isLoggedIn) throw new Error("Login First");
			const response = await fetch(`http://localhost:5001/api/posts/${id}`, {
				method: 'PUT',
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
            {post && (
                <PostForm initialTitle={post.title} initialBody={post.body} handleSubmit={handleSubmit} />
            )}
		</div>
  )
}

export default EditPage

