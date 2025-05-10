import PollingUnit from "../models/pollingUnit.js";
import AnnouncedPuResult from "../models/AnnouncedPuResult.js";
import LGA from "../models/lga.js";
import State from "../models/state.js";
import Party from "../models/party.js";

// Get results for a specific polling unit
export const getPollingUnitResults = async (req, res) => {
  const { uniqueid } = req.params;

  if (!uniqueid) {
    return res.status(400).send("Polling unit ID is required");
  }

  try {
    const pollingUnit = await PollingUnit.findByPk(uniqueid);
    if (!pollingUnit) {
      return res.status(404).send("Polling unit not found");
    }

    const results = await AnnouncedPuResult.findAll({
      where: { polling_unit_uniqueid: uniqueid },
    });

    res.render("polling_unit", { pollingUnit, results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get aggregated LGA results
export const getLgaResults = async (req, res) => {
  const state_id = req.query.state_id;
  const lga_id = req.query.lga_id;

  if (!state_id) {
    return res.status(400).send("state_id is required");
  }

  try {
    const state = await State.findOne({ where: { state_id } });
    if (!state) {
      return res.status(404).send("Invalid state_id. State not found.");
    }

    const lgas = await LGA.findAll({
      where: { state_id },
      attributes: ["lga_id", "lga_name"],
    });

    if (!lga_id) {
      // If no lga_id, just render dropdown with LGAs
      return res.render("lga_results", { state_id, lgas, results: [] });
    }

    const pollingUnits = await PollingUnit.findAll({
      where: { lga_id },
      attributes: ["uniqueid"],
    });

    if (!pollingUnits || pollingUnits.length === 0) {
      return res.render("lga_results", {
        lgas,
        results: [],
        message: "No polling units found for this LGA",
      });
    }

    const pollingUnitIds = pollingUnits.map((pu) => pu.uniqueid);

    const results = await AnnouncedPuResult.findAll({
      where: { polling_unit_uniqueid: pollingUnitIds },
      attributes: [
        "party_abbreviation",
        [
          AnnouncedPuResult.sequelize.fn(
            "SUM",
            AnnouncedPuResult.sequelize.col("party_score")
          ),
          "total_score",
        ],
      ],
      group: ["party_abbreviation"],
    });

    res.render("lga_results", { lgas, results });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Render form for adding new polling unit result
export const newPollingUnitForm = (req, res) => {
  res.render("new_polling_unit");
};

// Save polling unit result
export const savePollingUnitResult = async (req, res) => {
  const { polling_unit_uniqueid, party_abbreviation, party_score } = req.body;

  if (!polling_unit_uniqueid || !party_abbreviation || party_score == null) {
    return res
      .status(400)
      .send("Polling unit ID, party abbreviation, and party score are required");
  }

  if (isNaN(party_score)) {
    return res.status(400).send("Party score must be a number");
  }

  try {
    await AnnouncedPuResult.create({
      polling_unit_uniqueid,
      party_abbreviation,
      party_score,
      entered_by_user: "admin", // can later be updated to req.user if you have authentication
      date_entered: new Date(),
      user_ip_address: req.ip,
    });

    res.send("Polling unit result saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Show state selection page
export const showStateSelectionPage = async (req, res) => {
  try {
    const states = await State.findAll({
      attributes: ["state_id", "state_name"],
    });
    res.render("select_state", { states });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load states.");
  }
};
