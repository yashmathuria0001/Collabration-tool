import express from 'express';
import { registerUser, login, logout } from '../controllers/userController.js';

const router= express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route("/logout").get(logout);

export default router;
