import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date }

    },
    {timestamps : true,}
)
const Post = mongoose.model("Post", postSchema);

export default Post;