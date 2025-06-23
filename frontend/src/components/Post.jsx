import React from 'react'

const Post = ({ post }) => {
	const formatDate = (dateStr) => {
		const date = new Date(dateStr)
		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		})
	}

	const dateLabel =
		post.updatedAt && post.updatedAt !== post.createdAt
			? `updated ${formatDate(post.updatedAt)}`
			: `posted ${formatDate(post.createdAt)}`

	return (
		<div className='flex flex-col w-full p-6 gap-3'>
			<div className='flex justify-between items-center mb-2'>
				<h1 className='text-2xl font-semibold'>{post.title}</h1>
				<p className='text-sm text-gray-500 italic'>{dateLabel}</p>
			</div>
			<p className='text-sm text-primary font-medium mb-2'>{post.user.name}</p>
			<div className='text-base text-gray-700 max-h-40 overflow-hidden whitespace-pre-line'>
				{post.body}
			</div>
		</div>
	)
}

export default Post
