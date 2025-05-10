import express from "express";
import {
  getPollingUnitResults,
  getLgaResults,
  newPollingUnitForm,
  savePollingUnitResult,
  showStateSelectionPage,
} from "../controllers/pollingController.js";

const router = express.Router();

router.get("/polling-unit/:uniqueid", getPollingUnitResults);
router.get("/lga-results", getLgaResults);
router.get("/new-polling-unit", newPollingUnitForm);
router.post("/save-polling-unit-result", savePollingUnitResult);

router.get("/select-state", showStateSelectionPage);

export default router;
