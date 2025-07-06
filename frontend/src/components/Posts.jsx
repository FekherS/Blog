import React, { useEffect, useState } from 'react';
import Post from './Post.jsx';

const Posts = ({userId = null}) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/posts?page=${currentPage}&limit=${postsPerPage}${userId? "&user=" + userId :""}`);
                const data = await response.json();
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [currentPage, userId]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <h2 className='text-center text-4xl font-bold my-8'>Posts</h2>
            <div className='flex flex-col items-center w-full max-w-4xl mx-auto gap-8 px-4'>
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className='w-full bg-base-200 rounded-lg shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-300'
                    >
                        <Post post={post} />
                    </div>
                ))}
            </div>

            <div className='flex justify-center items-center gap-4 my-8'>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Posts;
