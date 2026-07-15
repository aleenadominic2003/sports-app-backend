const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    TeamId: { type: String, required: true, unique: true },
    OfficialTeamName: String,
    AssociatedSportCategory: String,
    AssignedHeadCoachId: String,
    TeamCaptainName: String,
    MaximumSquadSizeLimit: String,
    HomeVenueStadiumName: String,
    PrimaryKitJerseyColor: String,
    SponsorshipBrandPartner: String,
    CurrentTournamentDivision: String,
    CreationFormationDate: String,
    AnnualOperatingBudget: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teams", teamSchema);
