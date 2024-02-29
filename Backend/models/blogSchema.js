import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [10, "Title must contain at least 10 characters"],
        maxLength: [40, "Title must be at most 40 characters"]
    },
    mainImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    intro: {
        type: String,
        required: true,
        minLength: [50, "Intro must contain at least 250 characters"],
    },
    paraOneImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    paraOneDescribtion: {
        type: String,
        minLength: [50, "Description must contain at least 50 characters"],
    },
    paraOneTitle: {
        type: String,
        minLength: [10, "Title must contain at least 10 characters"],
    },
    paraTwoImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    paraTwoDescribtion: {
        type: String,
        minLength: [50, "Description must contain at least 50 characters"],
    },
    paraTwoTitle: {
        type: String,
        minLength: [10, "Title must contain at least 10 characters"],
    },
    paraThreeImage: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    paraThreeDescribtion: {
        type: String,
        minLength: [50, "Description must contain at least 50 characters"],
    },
    paraThreeTitle: {
        type: String,
        minLength: [10, "Title must contain at least 10 characters"],
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
});

export const Blog = mongoose.model('Blog', blogSchema);
