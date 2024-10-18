import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema({
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  type: {
    type: String,
    enum: ["video", "image", "document"],
    required: true,
  },
  url: { type: String, required: true },
  description: String,
  uploaded_at: { type: Date, default: Date.now },
});

export default mongoose.model("CourseContent", courseContentSchema);
