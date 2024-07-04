import createError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../../models/user/index.js";
import { validationResult } from "express-validator";
import { generateToken } from "../../middlewares/auth/index.js";

// ===========================================================================================
// Create new User account
// ===========================================================================================

export const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthDate,
    gender,
    phoneNumber,
    profession,
    languages,
    agree,
  } = req.body;
  const errors = validationResult(req); // Get validation errors, if any

  // Check if there are validation errors
  if (!errors.isEmpty()) {
    // If there are errors, send a 400 status response with the errors
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: email });

    // If user exists in the database
    if (user) {
      return next(
        createError(400, "Email has been taken. Please try another one!")
      );
    }

    // If user does exist in the database
    if (!user) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        // image: `http://localhost:8000/images/${req.file.filename}`,
        birthDate: birthDate,
        gender: gender,
        phoneNumber: phoneNumber,
        profession: profession,
        languages: languages,
        agree: agree,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      const token = generateToken(user);

      res.status(201).json({
        success: true,
        user: newUser,
        token: token,
        message: "Your account is successfully created!",
      });
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(500, "You are unable to create an account! please try again!")
    );
  }
};

// ===========================================================================================
// Login User
// ===========================================================================================

export const loginUser = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return next(
        createError(400, "This email does not exist! Please sign up!")
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Invalid password! Please sign up!"));
    }

    if (user && isPasswordValid) {
      // To prevent password and admin sending to the frontend, you can do ....
      const { password, ...userDetails } = user._doc;

      // if (rememberMe) {
      //   req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
      // }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        user: { ...userDetails },
        token: token,
        message: "User successfully logged in!",
      });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "User could not login. Please try again!"));
  }
};

//==========================================================================
// User logout
//==========================================================================
export const userLogout = async (req, res, next) => {
  try {
    res.cookie("user_token", null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    res
      .status(200)
      .json({ success: true, message: `You have successfully logged out` });
  } catch (error) {
    console.log(error);
    next(createError(500, "User could not logout. Please try again!"));
  }
};

//====================================================================
// Get single user
//====================================================================
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(createError(500, "User could not be deleted! Please try again!"));
  }
};

//====================================================================
// Get all users
//====================================================================
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return next(createError(400, "User not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    next(createError(500, "Users could not be deleted! Please try again!"));
  }
};

//====================================================================
// Delete single user
//====================================================================
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(createError(500, "User could not be deleted! Please try again!"));
  }
};
