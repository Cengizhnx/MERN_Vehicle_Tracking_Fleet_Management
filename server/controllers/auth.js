import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new Customer({
      email,
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
    const user = await Customer.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json("Böyle bir kullanıcı yok !");
    }

    if (user.status === "passive") {
      res.status(404).json("Hesabınız aktif değil !");
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json("Hatalı e-mail veya şifre !");
    }

    const token = jwt.sign({ user: user }, process.env.JWT);

    return res.json({ message: "Welcome Back", token: token });

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
