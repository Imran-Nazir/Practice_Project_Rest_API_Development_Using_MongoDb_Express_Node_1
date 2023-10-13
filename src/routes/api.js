const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const TodoListController = require('../controllers/TodoListController');
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const router = express.Router();


router.post('/CreateProfile', ProfileController.CreateProfile);
router.post('/UserLogin', ProfileController.UserLogin);
router.get('/SelectProfile', AuthVerifyMiddleware, ProfileController.SelectProfile);
router.post('/UpdateProfile', AuthVerifyMiddleware, ProfileController.UpdateProfile);

router.post('/CreateTodo', AuthVerifyMiddleware, TodoListController.CreateTodo);
router.get('/SelectTodo', AuthVerifyMiddleware, TodoListController.SelectTodo);
router.post('/UpdateTodo', AuthVerifyMiddleware, TodoListController.UpdateTodo);

module.exports = router;
