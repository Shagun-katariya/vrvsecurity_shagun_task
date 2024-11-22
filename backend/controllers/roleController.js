const Role = require('../models/role');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { name, permissions, description } = req.body;
  try {
    const role = new Role({ name, permissions, description });
    await role.save();
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  const { name, permissions, description } = req.body;
  try {
    // Find the role by ID
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Clear previous permissions
    role.permissions = [];

    // Update the role fields
    role.name = name;
    role.permissions = permissions;
    role.description = description;

    // Save the updated role
    const updatedRole = await role.save();

    res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
};


// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
};
