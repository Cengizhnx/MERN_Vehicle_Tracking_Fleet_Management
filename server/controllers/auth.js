import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new Admin({
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Admin.findOne({
      username: req.body.username,
    });
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email!"));
    }

    const token = jwt.sign({ user: user }, process.env.JWT);
    
    res.json({ message: "Welcome Back", token: token });

    // const { password, ...otherDetails } = user._doc;

    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
