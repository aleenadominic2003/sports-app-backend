const Team = require("../models/teamModel");

exports.addTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ status: "success", data: team });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.viewTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.searchTeam = async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, "i");

    const teams = await Team.find({
      $or: [
        { OfficialTeamName: searchRegex },
        { AssociatedSportCategory: searchRegex },
        { TeamId: searchRegex },
        { TeamCaptainName: searchRegex },
      ],
    });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeam) {
      return res.status(404).json({ status: "error", message: "Team not found" });
    }

    res.status(200).json({ status: "success", data: updatedTeam });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ status: "error", message: "Team not found" });
    }

    res.status(200).json({ status: "success", message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
