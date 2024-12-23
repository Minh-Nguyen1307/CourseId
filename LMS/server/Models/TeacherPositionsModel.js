import mongoose from "mongoose";
const teacherPositionsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  des: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

teacherPositionsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const TeacherPositions = mongoose.model("TeacherPositions", teacherPositionsSchema);
  
  export default TeacherPositions ;