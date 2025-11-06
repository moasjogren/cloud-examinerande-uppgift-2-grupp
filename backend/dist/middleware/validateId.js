"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = exports.validateEntryId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
const entryModel_1 = require("../models/entryModel");
const userModel_1 = require("../models/userModel");
exports.validateEntryId = [
    (0, express_validator_1.param)("id").custom(async (id) => {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new Error("Invalid ObjectId");
        const entry = await entryModel_1.Entry.findById(id);
        if (!entry)
            throw new Error("Entry not found");
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map((e) => e.msg));
        }
        next();
    },
];
exports.validateUserId = [
    (0, express_validator_1.param)("id").custom(async (id) => {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new Error("Invalid ObjectId");
        const user = await userModel_1.User.findById(id);
        if (!user)
            throw new Error("User not found");
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map((e) => e.msg));
        }
        next();
    },
];
