import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, unique: true, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherPositions" }],
    degrees: [
      {
        type: { type: String, required: true },
        school: { type: String, required: true },
        major: { type: String, required: true },
        year: { type: Number, required: true },
        isGraduated: { type: Boolean, required: true }
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  teacherSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const TeacherModel = mongoose.model("Teacher", teacherSchema);
  export default TeacherModel;