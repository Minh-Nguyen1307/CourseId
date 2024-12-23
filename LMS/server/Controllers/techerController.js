import TeacherModel from "../Models/TeacherModel.js";
import UserModel from "../Models/UserModel.js";

export const createTeacher = async (req, res) => {
    try {
      const { userId, code, startDate, endDate, teacherPositionsId, degrees } = req.body;
  

      const newTeacher = new TeacherModel({
        userId,
        code,
        startDate,
        endDate,
        teacherPositionsId,
        degrees,
      });
  
      
      await newTeacher.save();
  
      
      res.status(201).json({
        message: "Teacher created successfully",
        teacher: newTeacher,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };






export const getAllTeachers = async (req, res) => {
  try {
   
    const teachers = await UserModel.find({ role: 'TEACHER' });

   
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllDetailTeachers = async (req, res) => {
    try {
    
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 5; 
  
      
      const skip = (page - 1) * limit;
  
   
      const totalTeachers = await TeacherModel.countDocuments();
  
     
      const teachers = await TeacherModel.find()
        .skip(skip) 
        .limit(limit) 
        .populate('userId', 'email name')  
        .populate('teacherPositionsId', 'code des isActive isDeleted name') 
        .exec();
  
      
      const totalPages = Math.ceil(totalTeachers / limit);
  
     
      res.status(200).json({
        page,
        limit,
        totalPages,
        totalTeachers,
        teachers,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };