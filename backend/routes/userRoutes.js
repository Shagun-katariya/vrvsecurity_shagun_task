const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Place the search route above the dynamic ID route
router.get("/search-users", userController.searchUsers);
router.get('/:id', userController.getUserById); // Dynamic route comes after specific routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
