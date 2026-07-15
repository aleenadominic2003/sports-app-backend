const Player = require("../models/playerModel");

exports.addPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({ status: "success", data: player });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.viewPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.searchPlayer = async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, "i");

    const players = await Player.find({
      $or: [
        { FirstName: searchRegex },
        { LastName: searchRegex },
        { Email: searchRegex },
        { PlayerId: searchRegex },
      ],
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlayer) {
      return res.status(404).json({ status: "error", message: "Player not found" });
    }

    res.status(200).json({ status: "success", data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(id);

    if (!deletedPlayer) {
      return res.status(404).json({ status: "error", message: "Player not found" });
    }

    res.status(200).json({ status: "success", message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
