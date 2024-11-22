const User = require('../models/user');
const Role = require('../models/role');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role', 'name permissions'); // Populates role details
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role', 'name permissions');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, roleId, status } = req.body;
  try {
    const role = await Role.findById(roleId);
    if (!role) return res.status(400).json({ message: 'Invalid role ID' });

    const user = new User({ name, email, role: roleId, status });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { name, email, roleId, status } = req.body;
  try {
    const role = roleId ? await Role.findById(roleId) : null;
    if (roleId && !role) return res.status(400).json({ message: 'Invalid role ID' });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role: roleId || undefined, status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

exports.searchUsers = async (req, res) => {
  const { name, status, role } = req.query;

  // Build a dynamic query object
  let query = {};

  // Perform case-insensitive and partial matching for name
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
  }

  // Perform case-insensitive match for status
  if (status) {
    query.status = { $regex: status, $options: "i" }; // Case-insensitive match for status
  }

  // Match role as ObjectId or string (if role is passed as an ObjectId, it's fine)
  if (role) {
    query.role = role;
  }

  try {
    const users = await User.find(query); // Execute the query to find users
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error });
  }
};

