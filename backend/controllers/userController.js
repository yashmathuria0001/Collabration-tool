import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sendOTP, isOTPExpired, otpStore } from "./otpController.js";

let registrationDataStore = {};

export const registerUser = async (req, res) => {
    const { fullName, email, password, gender, profilePhoto} = req.body;

    try {

       if (!fullName || !email || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
       }

      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });

      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
     }

     let userProfilePhoto = profilePhoto || ""; 

      if(!userProfilePhoto){
        userProfilePhoto='../assets/male_pfp.jpg'
      }

       // Save user data temporarily
       registrationDataStore[email] = {
        fullName,
        email,
        password,
        profilePhoto:userProfilePhoto,
        gender,
    };

    sendOTP(email);
     
    return res.status(200).json({
        message: "OTP has been sent to your email. Please verify to complete registration.",
        success: true,
      });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again." });
      }
  };

  // Step 2: Verify OTP and Complete Registration
export const verify = async (req, res) => {
    try {
      const {otp } = req.body;
  
      if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }


    // Find the email associated with the OTP
    const email = Object.keys(otpStore).find((key) => otpStore[key]?.otp === otp);

    if (!email) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

  
      // Check if OTP is expired or incorrect
      if (isOTPExpired(email)) {
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
      }
  
      // Retrieve user data from the temporary store
      const userData = registrationDataStore[email];
      if (!userData) {
        return res.status(400).json({ message: "User data not found. Please try again." });
      }
  
      const { fullName, profilePhoto, password, gender } = userData;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save the user permanently in the database
      await User.create({
        fullName,
        email,
        password: hashedPassword,
        profilePhoto,
        gender,
      });
  
      // Clear temporary store and OTP store
      delete registrationDataStore[email];
      delete otpStore[email];
  
      return res.status(201).json({
        message: "Account created successfully!",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error. Please try again." });
    }
  };

  export const resendOTP = async (req, res) => {
    try {
        // Retrieve the email directly from registrationDataStore
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email not found. Please register first." });
        }

        // Check if OTP for the email already exists and is not expired
        if (otpStore[email] && !isOTPExpired(email)) {
          delete otpStore[email];
        }

        // Send OTP to the email
        sendOTP(email); // Resend OTP using the existing sendOTP function

        return res.status(200).json({
            message: "OTP has been resent to your email.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
};

  export const login= async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        };
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not registered",
                success:false
            })
        };
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        };
        const tokenData={
            userId:user._id //id is like primary key generated for each user
        };
        const token= await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, 
        httpOnly:true, sameSite:'strict'})
        .json({
            success: true, // Added this field
            message: "Login successful", // Added for consistency
            _id:user._id,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
}

export const logout=(req,res)=>{
    try {
        // Set headers to prevent caching on the client-side
        res.setHeader('Cache-Control', 'no-store'); // Prevent caching of sensitive data
        res.setHeader('Pragma', 'no-cache'); // For older HTTP/1.0 caches
        res.setHeader('Expires', '0'); // Set expiry time to 0 for older browsers
    
        // Clear the "token" cookie
        return res
          .status(200)
          .cookie("token", "", { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
          .json({
            message: "Logged out successfully!",
          });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An internal server error occurred." });
      }
}