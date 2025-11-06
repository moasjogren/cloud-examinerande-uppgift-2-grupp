import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { Entry } from "../models/entryModel";

type EntryRules = {
  title: ValidationChain;
  content: ValidationChain;
  tags: ValidationChain;
};

const entryRules: EntryRules = {
  title: body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  content: body("content")
    .isString()
    .withMessage("Entry content must be a string")
    .isLength({ min: 3 })
    .withMessage("Entry content must be at least 3 characters"),
  tags: body("tags")
    .isArray({ min: 0 })
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag: any) => typeof tag === "string"))
    .withMessage("All tags must be strings"),
};

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((e) => e.msg));
  }
  next();
};

export const validateEntry = [
  entryRules.title,
  entryRules.content,
  entryRules.tags,
  handleErrors,
];

export const validateUpdatedEntry = [
  entryRules.title.optional(),
  entryRules.content.optional(),
  entryRules.tags.optional(),
  handleErrors,
];
