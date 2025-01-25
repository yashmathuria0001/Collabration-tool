import mongoose from "mongoose";

const textModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title of the document
      trim: true,
    },
    content: {
      type: String,
      required: true, // The content of the document (HTML or plain text format)
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who owns the document
      required: true,
    },
    collaborators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References to users collaborating on the document
    }],
    lastModified: {
      type: Date,
      default: Date.now, // Timestamp of when the document was last modified
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp of when the document was created
    },
    versionHistory: [{
      content: String,
      modifiedAt: Date,
      modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User who made the change
      },
    }],
    // Optional: To track roles in document editing
    roles: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user with a specific role
      },
      role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer",
      },
    }],
  },
  { timestamps: true }
);

// Create the Text model using the schema
export const Text = mongoose.model("Text", textModel);
