import UserModel from "../Models/UserModel.js";

export const createUser = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    
    const users = await UserModel.find();

    
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
