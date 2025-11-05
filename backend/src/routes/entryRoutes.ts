import { Router } from "express";

import {
  getAllEntries,
  createEntry,
  getEntryById,
  deleteEntry,
  updateEntry,
} from "../controllers/entryController";

const router = Router();

router.get("/entries", getAllEntries);
router.post("/entries", createEntry);
router.get("/entries/:id", getEntryById);
router.patch("/entries/:id", updateEntry);
router.delete("/entries/:id", deleteEntry);


export default router;
