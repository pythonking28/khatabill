import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "All Fields are required",
        success: false,
      });
    }

    const user = await pool.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length != 0) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );
    const data = await pool.query(
      "INSERT INTO Users (username, password, email) VALUES ($1,$2,$3) RETURNING *",
      [username, hashedPassword, email]
    );
    if (!data.rows.length) {
      return res.status(500).json({
        message: "Failed to create user",
        success: false,
      });
    }
    return res.status(201).json({
      message: `User ${username} created successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All Fields are required",
        success: false,
      });
    }
    const user = await pool.query("SELECT * From Users WHERE email = $1", [
      email,
    ]);
    if (!user.rows.length) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }
    const isVerifiedUser = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isVerifiedUser) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user.rows[0].user_id },
      process.env.JWT_PRIVATE_KEY,
      {expiresIn: '1d'}
    );
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        message: `User ${user.rows[0].username} loggedIn successfully`,
        success: true
      });
  } catch (error) {
    console.log(error);
  }
};


export const getUser = async(req,res) => {
  const userId = req.userId;
  if(!userId){
    return res.status(400).json({
      message: "Failed to get user",
      success: false
    })
  }
  return res.status(200).json({
    userId,
    success: true
  })
}

export const verifyUser = (req, res) => {
    const token = req.cookies?.token;
    try {
        if(!token){
            return res.status(200).json({
                message: "Unauthorized Access",
                success: false
            })
        }
        const decodedUser = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if(!decodedUser.userId){
            return res.status(401).json({
                message: "Invalid User",
                success: false
            })
        }
        return res.status(200).json({
          message: "Welcome User",
          success: true
        })
    } catch (error) {
        console.log(error)
    }
    
}
