import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  student_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  purchase_date: { type: Date, default: Date.now },
  amount_paid: { type: Number, required: true },
});

export default mongoose.model("Purchase", purchaseSchema);