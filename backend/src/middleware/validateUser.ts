import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { User } from "../models/userModel";

type UserRules = {
  email: ValidationChain;
  password: ValidationChain;
  username: ValidationChain;
};

const userRules: UserRules = {
  email: body("email")
    .isEmail()
    .withMessage("Must be a valid email adress")
    .isLength({ min: 6 })
    .withMessage("Email must be at least 6 characters")
    .custom(async (email) => {
      const emailInUse = await User.findOne({ email: email });
      if (emailInUse) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  password: body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  username: body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (username) => {
      const usernameInUse = await User.findOne({ username: username });
      if (usernameInUse) {
        throw new Error("Username already in use");
      }
      return true;
    }),
};

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((e) => e.msg));
  }
  next();
};

export const validateUser = [
  userRules.email,
  userRules.password,
  userRules.username,
  handleErrors,
];

export const validateUpdatedUser = [
  userRules.email.optional(),
  userRules.password.optional(),
  userRules.username.optional(),
  handleErrors,
];
