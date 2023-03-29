import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import { createError } from "../utils/error.js";

export const addCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, password, status } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new Customer({
      name,
      email,
      phone,
      password: passwordHash,
      status,
    });

    const user = await Customer.findOne({
      email: req.body.email,
    });
    if (user) {
      res.status(404).json("E-mail kullanılıyor !");
      return next(createError(404, "User email already!"));
    }

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.password
    ) {
      res.status(401).json("Tüm alanları doldurun !");
      return next(createError(401, "Fill in all fields!"));
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: passwordHash,
    status: status,
  };

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      updateUser
    );
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateStatusCustomer = async (req, res, next) => {
  const { name, email, phone, password, status } = req.body;

  const tempStatus = req.body.status == "active" ? "passive" : "active";

  const updateUser = {
    name: name,
    email: email,
    phone: phone,
    password: password,
    status: tempStatus,
  };

  try {
    const customer = await Customer.findByIdAndUpdate(req.body._id, updateUser);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted !");
  } catch (error) {
    next(error);
  }
};

export const getAllCustomers = async (req, res, next) => {
  try {
    const customer = await Customer.find();
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Customer.findOne({
      email: req.body.email,
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
