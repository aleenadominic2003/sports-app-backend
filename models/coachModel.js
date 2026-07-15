const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    CoachId: { type: String, required: true, unique: true },
    FullName: String,
    EmailProfile: String,
    PhoneNumber: String,
    SpecializationSport: String,
    CertificationsHeld: String,
    YearsOfActiveExperience: String,
    MonthlyContractSalary: String,
    PreferredCoachingShift: String,
    AssignedTrainingGround: String,
    DateOfHiring: String,
    EmploymentStatus: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coaches", coachSchema);
