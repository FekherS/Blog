import React from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
	const navigate = useNavigate();

	const formatDate = (dateStr) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
	};

	const navPost = () => navigate(`/post/${post._id}`);

	const navUser = (e) => {
		e.stopPropagation();
		navigate(`/user/${post.user._id}`);
	};

	const dateLabel =
		post.updatedAt && post.updatedAt !== post.createdAt
			? `updated ${formatDate(post.updatedAt)}`
			: `posted ${formatDate(post.createdAt)}`;

	const MAX_LENGTH = 500;
	const truncateBody = (body) => {
		if (body.length > MAX_LENGTH) {
			return body.slice(0, MAX_LENGTH) + '...';
		}
		return body;
	};

	return (
		<div className='flex flex-col w-full p-6 gap-3 cursor-pointer' onClick={navPost}>
			<div className='flex justify-between items-center mb-2'>
				<h1 className='text-2xl font-semibold'>{post.title}</h1>
				<p className='text-sm text-gray-500 italic'>{dateLabel}</p>
			</div>
			<p className='text-sm text-primary font-medium mb-2 cursor-pointer hover:underline' onClick={navUser}>
				{post.user.name}
			</p>
			<div className='text-base text-gray-700 whitespace-pre-line'>
				{truncateBody(post.body)}
				{post.body.length > MAX_LENGTH && (
					<span className='text-blue-500 underline ml-2'>Read more</span>
				)}
			</div>
		</div>
	);
};

export default Post;
