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

const router = Router();

router.get("/entries", getAllEntries);
router.post("/entries", createEntry);
router.get("/entriesByUser/:id", validateUserId, getAllEntriesByUser);
router.get("/entries/:id", validateEntryId, getEntryById);
router.patch("/entries/:id", validateEntryId, updateEntry);
router.delete("/entries/:id", validateEntryId, deleteEntry);

export default router;
