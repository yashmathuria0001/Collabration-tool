import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import validator from 'validator';



export const registerUser = async (req, res) => {
    const { fullName, email, password, gender} = req.body;

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
     
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        profilePhoto: userProfilePhoto,
        gender,
      });
  
      // Save user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
          { userId: newUser._id, email: newUser.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
      );

      res.status(201).json({ message: "User registered successfully!", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
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
        return res.status(500).json({ message: "An internal server error occurred." });
      }
}

  