const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); // to handle exceptions
const User = require("../models/userModel");

// @desc: Create User
// @route: POST/api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.name),
    });
  } else {
    res.status(400);
    throw new Error("Invaid user data");
  }
});

// @desc: Authenticate a User
// @route: POST/api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //user.password is hashed one

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.name),
    });
  } else {
    res.status(400);
    throw new Error("Invaid credential");
  }
});

// @desc: get User data
// @route: get/api/users/me
// @access: Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// create a JWT token
const generateToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser };
