import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        ticket_type: String,
        ticket_price: Int32Array,
        ticket_photo: String,
        ticket_name: String,
        ticket_detail: String,
    },
    {
        timestamps: true
    }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;