const express = require('express');
const userController = require('./../controller/userController');


const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.insertUser);
router
    .route('/:id')
    .get(userController.getOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteOneUser);

module.exports = router;