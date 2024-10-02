const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const user = await User.create({ firstName, lastName, email, role });
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Email already exists.' });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    await user.save();
    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Email already exists.' });
    } else if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
