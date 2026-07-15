const Coach = require("../models/coachModel");

exports.addCoach = async (req, res) => {
  try {
    const coach = await Coach.create(req.body);
    res.status(201).json({ status: "success", data: coach });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.viewCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.searchCoach = async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, "i");

    const coaches = await Coach.find({
      $or: [
        { FullName: searchRegex },
        { EmailProfile: searchRegex },
        { CoachId: searchRegex },
        { SpecializationSport: searchRegex },
      ],
    });

    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoach = await Coach.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoach) {
      return res.status(404).json({ status: "error", message: "Coach not found" });
    }

    res.status(200).json({ status: "success", data: updatedCoach });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteCoach = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoach = await Coach.findByIdAndDelete(id);

    if (!deletedCoach) {
      return res.status(404).json({ status: "error", message: "Coach not found" });
    }

    res.status(200).json({ status: "success", message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
