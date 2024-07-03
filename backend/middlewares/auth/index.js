import JWT from "jsonwebtoken";
import createError from "http-errors";
import User from "../../models/user/index.js";

//====================================================================
// Generate token
//====================================================================
export const generateToken = (user) => {
  const token = JWT.sign(
    { id: user._id, admin: user.role.admin },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

//====================================================================
// Verify token
//====================================================================

export const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

//====================================================================
// Is user authenticated
//====================================================================
export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, "Authorization header is missing."));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(createError(401, "User is not authenticated. Please login!"));
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return next(createError(403, "Forbidden"));
  }
};
//====================================================================
// Is user auth
//====================================================================
export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError(401, "Authorization header is missing."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createError(401, "User is not authenticated. Please login!"));
    }

    let decodedToken;
    try {
      //   const user = verifyToken(token);
      //   next();
      decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(401, "Invalid token. Please login again."));
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return next(createError(403, "User is not authorized."));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(createError(500, "User could not access such data."));
  }
};

//====================================================================
// Is admin auth
//====================================================================
export const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(createError(401, "Authorization header is missing."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(
        createError(401, "Admin is not authenticated. Please login!")
      );
    }

    let decodedToken;
    try {
      decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(401, "Invalid token. Please login again."));
    }

    const user = await User.findById(decodedToken.id);
    if (user && user.role === "admin") {
      req.user = user; // Store the user info in req.user for further use
      next();
    } else {
      return next(createError(403, "User is not authorized."));
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Admin could not access such data."));
  }
};
