const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

//Home route
router.get('/', homeController.home);

//Route to create a task
router.post('/create-task', homeController.create);

//Route to delete a task
router.post('/delete-tasks', homeController.delete);

module.exports = router;