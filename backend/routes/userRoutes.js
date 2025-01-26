import express from 'express';
import { registerUser, login, logout, verify, resendOTP, } from '../controllers/userController.js';

const router= express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route("/logout").get(logout);
router.route('/verify').post(verify);
router.route('/resend').post(resendOTP);

export default router;
