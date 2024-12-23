import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    identity: { type: String, unique: true, required: true },
    dob: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["STUDENT", "TEACHER", "ADMIN"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const UserModel = mongoose.model("User", userSchema);
export default UserModel;