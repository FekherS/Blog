import React, { useContext, useState } from 'react';


const PostForm = ({ initialTitle, initialBody, handleSubmit }) => {
        const [title, setTitle] = useState(initialTitle);
        const [body, setBody] = useState(initialBody);
    return (
        <div className="flex flex-1 items-center justify-center bg-base-200">	
            <form onSubmit={(e) => {
                	e.preventDefault();
                    handleSubmit(title, body);
            }}
                className="card w-full max-w-2xl shadow-2xl bg-base-100 p-6 space-y-4">
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
    )
}
export default PostForm