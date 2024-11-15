import mongoose from "mongoose";
import chapterSchema from "./chapter.model.js"

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
    set: (v) => parseFloat(v),
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
  image: {
    type: String, // Ruta de la imagen
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  chapters: [chapterSchema],
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
