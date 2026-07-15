const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()
app.use(cors())
app.use(express.json())

// Player Database Connection
const playerDB=mongoose.createConnection("mongodb://aleena:aleena1234@ac-etp0lvq-shard-00-00.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-01.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-02.rb4mymb.mongodb.net:27017/sportsdb?ssl=true&replicaSet=atlas-mfk3xx-shard-0&authSource=admin&appName=Cluster0")

playerDB.on("connected",()=>{
    console.log("Player DB Connected")
})

// Coach Database Connection
const coachDB=mongoose.createConnection("mongodb://aleena:aleena1234@ac-etp0lvq-shard-00-00.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-01.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-02.rb4mymb.mongodb.net:27017/sportsdb?ssl=true&replicaSet=atlas-mfk3xx-shard-0&authSource=admin&appName=Cluster0")

coachDB.on("connected",()=>{
    console.log("Coach DB Connected")
})

// Team Database Connection
const teamDB=mongoose.createConnection("mongodb://aleena:aleena1234@ac-etp0lvq-shard-00-00.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-01.rb4mymb.mongodb.net:27017,ac-etp0lvq-shard-00-02.rb4mymb.mongodb.net:27017/sportsdb?ssl=true&replicaSet=atlas-mfk3xx-shard-0&authSource=admin&appName=Cluster0")

teamDB.on("connected",()=>{
    console.log("Team DB Connected")
})


//================ PLAYER MODEL ================

const Player=playerDB.model("Players",new mongoose.Schema(
{
    PlayerId:String,
    FirstName:String,
    LastName:String,
    Dob:String,
    Gender:String,
    ContactNumber:String,
    Email:String,
    EmergencyContactName:String,
    SelectedPrimarySport:String,
    SkillLevel:String,
    MembershipJoiningDate:String,
    MedicalClearanceStatus:String
}
))

app.get("/test",(request,response)=>{
    response.send("Hello")     //if this api called pass msg hello


})

app.post("/add-player",async(req,res)=>{
    await Player.create(req.body)
    res.json({"status":"success"})
})

app.post("/view-player",async(req,res)=>{
    const players=await Player.find()
    res.json(players)
})
//================ COACH MODEL ================

const Coach=coachDB.model("Coaches",new mongoose.Schema(
{
    CoachId:String,
    FullName:String,
    EmailProfile:String,
    PhoneNumber:String,
    SpecializationSport:String,
    CertificationsHeld:String,
    YearsOfActiveExperience:String,
    MonthlyContractSalary:String,
    PreferredCoachingShift:String,
    AssignedTrainingGround:String,
    DateOfHiring:String,
    EmploymentStatus:String
}
))



app.post("/add-coach",async(req,res)=>{
    await Coach.create(req.body)
    res.json({"status":"success"})
})

app.post("/view-coach",async(req,res)=>{
    const coaches=await Coach.find()
    res.json(coaches)
})

//================ TEAM MODEL ================

const Team=teamDB.model("Teams",new mongoose.Schema(
{
    TeamId:String,
    OfficialTeamName:String,
    AssociatedSportCategory:String,
    AssignedHeadCoachId:String,
    TeamCaptainName:String,
    MaximumSquadSizeLimit:String,
    HomeVenueStadiumName:String,
    PrimaryKitJerseyColor:String,
    SponsorshipBrandPartner:String,
    CurrentTournamentDivision:String,
    CreationFormationDate:String,
    AnnualOperatingBudget:String
}
))



app.post("/add-team",async(req,res)=>{
    await Team.create(req.body)
    res.json({"status":"success"})
})

app.post("/view-team",async(req,res)=>{
    const teams=await Team.find()
    res.json(teams)
})

app.listen(4000,()=>{
    console.log("Server Started")
})