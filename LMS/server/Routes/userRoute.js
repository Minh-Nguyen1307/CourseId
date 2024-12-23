import express from "express";
import { createUser, getAllUsers } from "../Controllers/userController.js";
import {createTeacherPosition,getAllPositions,} from "../Controllers/teacherPositionController.js";
import {createTeacher,getAllDetailTeachers,getAllTeachers,} from "../Controllers/techerController.js";

const userRouter = express.Router();

userRouter.post("/users", createUser);

userRouter.get("/allUsers", getAllUsers);
userRouter.post("/position", createTeacherPosition);
userRouter.get("/allPositions", getAllPositions);

userRouter.post("/teacher", createTeacher);
userRouter.get("/allTeachers", getAllTeachers);
userRouter.get("/allDetailTeachers", getAllDetailTeachers);

export default userRouter;
