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

const router = Router();

router.get("/entries", getAllEntries);
router.post("/entries", validateEntry, createEntry);
router.get("/entries/user/:id", validateUserId, getAllEntriesByUser);
router.get("/entries/:id", validateEntryId, getEntryById);
router.patch(
  "/entries/:id",
  validateEntryId,
  validateUpdatedEntry,
  updateEntry
);
router.delete("/entries/:id", validateEntryId, deleteEntry);

export default router;
