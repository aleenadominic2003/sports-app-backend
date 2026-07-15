const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    PlayerId: { type: String, required: true, unique: true },
    FirstName: String,
    LastName: String,
    Dob: String,
    Gender: String,
    ContactNumber: String,
    Email: String,
    EmergencyContactName: String,
    SelectedPrimarySport: String,
    SkillLevel: String,
    MembershipJoiningDate: String,
    MedicalClearanceStatus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Players", playerSchema);
