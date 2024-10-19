import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  materials: [
    {
      type: {
        type: String,
        enum: ["video", "image", "document"],
        required: true,
      },
      url: { type: String, required: true },
      description: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
