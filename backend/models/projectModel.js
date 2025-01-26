import mongoose from "mongoose"
import validator from "validator"

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    collaborators: [
      {
        email: {
          type: String,
          required: true,
          validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.value} is not a valid email!`,
          },
        },
        role: {
          type: String,
          enum: ["editor", "viewer"],
          default: "viewer",
        },
      },
    ],
  },
  { timestamps: true },
)

export const Project = mongoose.model("Project", projectSchema)

