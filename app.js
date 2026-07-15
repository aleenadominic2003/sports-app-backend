require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const playerController = require("./controllers/playerController");
const coachController = require("./controllers/coachController");
const teamController = require("./controllers/teamController");

const app = express();

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  });

app.get("/test", (req, res) => {
  res.send("Hello");
});

// Player routes
app.post("/add-player", playerController.addPlayer);
app.post("/view-player", playerController.viewPlayers);
app.get("/search-player", playerController.searchPlayer);
app.put("/update-player/:id", playerController.updatePlayer);
app.delete("/delete-player/:id", playerController.deletePlayer);

// Coach routes
app.post("/add-coach", coachController.addCoach);
app.post("/view-coach", coachController.viewCoaches);
app.get("/search-coach", coachController.searchCoach);
app.put("/update-coach/:id", coachController.updateCoach);
app.delete("/delete-coach/:id", coachController.deleteCoach);

// Team routes
app.post("/add-team", teamController.addTeam);
app.post("/view-team", teamController.viewTeams);
app.get("/search-team", teamController.searchTeam);
app.put("/update-team/:id", teamController.updateTeam);
app.delete("/delete-team/:id", teamController.deleteTeam);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});