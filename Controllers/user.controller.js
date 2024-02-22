const { getAllTheUsers } = require("../Models/user.model")

exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await getAllTheUsers();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };