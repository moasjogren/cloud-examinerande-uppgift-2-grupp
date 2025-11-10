import { Router } from "express";

import {
  getAllEntries,
  getAllEntriesByUser,
  createEntry,
  getEntryById,
  deleteEntry,
  updateEntry,
} from "../controllers/entryController";

import { validateEntryId, validateUserId } from "../middleware/validateId";
import {
  validateEntry,
  validateUpdatedEntry,
} from "../middleware/validateEntry";
import authUser from "../middleware/authentication";

const router = Router();

router.get("/entries", authUser, getAllEntries);
router.post("/entries", authUser, validateEntry, createEntry);
router.get("/entries/user/:id", authUser, validateUserId, getAllEntriesByUser);
router.get("/entries/:id", authUser, validateEntryId, getEntryById);
router.patch(
  "/entries/:id",
  authUser,
  validateEntryId,
  validateUpdatedEntry,
  updateEntry
);
router.delete("/entries/:id", authUser, validateEntryId, deleteEntry);

export default router;
