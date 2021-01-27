const express = require('express');
const router = express.Router();
const UserController = require('../app/api/controllers/users');
router.post('/register', UserController.create);
router.get('/userlist', UserController.userlist);
router.get('/getall', UserController.getAll);
router.get('/:userId', UserController.getById);
router.put('/:userId', UserController.updateById);
router.delete('/:userId', UserController.deleteById);
module.exports = router;