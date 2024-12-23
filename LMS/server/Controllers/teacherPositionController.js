import TeacherPositionModel from "../Models/TeacherPositionsModel.js";



export const createTeacherPosition = async (req, res) => {
  try {
    const { code, des, isActive, isDeleted, name } = req.body;
    const existingPosition = await TeacherPositionModel.findOne({ code });

    if (existingPosition) {
      return res.status(400).json({ error: 'Position code must be unique. This code already exists.' });
    }

    const position = new TeacherPositionModel({
      code,
      des,
      isActive,
      isDeleted,
      name,
    });


    await position.save();

    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





export const getAllPositions = async (req, res) => {
  try {
  
    const positions = await TeacherPositionModel.find();

    res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
