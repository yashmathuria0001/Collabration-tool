import express from 'express';
import { registerUser, login, logout, resendOTP, verify } from '../controllers/userController.js';

const router= express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/resendOTP').post(resendOTP);
router.route('/verify').post(verify);
router.route("/logout").get(logout);

export default router;
