const router = require('express').Router();
const userController = require('../controllers/user.controller');


router.post('/', userController.createUser);
router.get('/:userId', userController.findUserById);
router.get('/', userController.findAllUsers);
router.put('/:userId', userController.editUser);
router.delete('/:userId', userController.deleteUser);


module.exports = router;