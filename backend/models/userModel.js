import mongoose from "mongoose";
import validator from 'validator';

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        enum: ["male", "female"], // either of these values
        required: true,
    },

    role: {
        type: String,
        enum: ["editor", "viewer"], // Role of the user in the document collaboration
        default: "viewer",
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document", // Reference to the documents the user is collaborating on
    }],
    lastActive: {
        type: Date,
        default: Date.now, // Timestamp for the last time the user was active
    },
}, { timestamps: true });

export const User = mongoose.model("User", userModel);
