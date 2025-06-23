import React, { useEffect, useState } from 'react'
import Post from './Post.jsx'

const Posts = () => {

	const [posts, setPosts] = useState([])

	useEffect(() => {
		fetch('http://localhost:5001/api/posts')
			.then((response) => response.json())
            .then((data) => setPosts(data))
			.catch((error) => console.error('Error fetching posts:', error))
	}, [])

    console.log(posts);

	return (
		<>
			<h2 className='text-center text-4xl font-bold my-8'>Posts</h2>
			<div className='flex flex-col items-center w-full max-w-4xl mx-auto gap-8 px-4'>
                {
                    posts.map((post) => (

					<div
						key={post._id}
						className='w-full bg-base-200 rounded-lg shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-300'
					>
						<Post post={post} />
					</div>
				))}
			</div>
		</>
	)
}

export default Posts
