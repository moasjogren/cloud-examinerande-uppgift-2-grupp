import { Router } from "express";
import {
  semanticSearch,
  getAvailableTags,
} from "../controllers/semanticSearchController";
import authUser from "../middleware/authentication";

const router = Router();

router.get("/search/semantic", authUser, semanticSearch);
router.get("/search/tags", authUser, getAvailableTags);

export default router;
