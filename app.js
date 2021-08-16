const express = require("express");
const app = express();
const connection = require("./connection_DB/mongoose_connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//middleware for cors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// CLOUDINARY_URL=cloudinary://287518613669312:UIBzMEuHO-gaEvdXSPKwVp2qLAU@dwzrf56tv

//cloudinary config
cloudinary.config({
  cloud_name: "grapheneinc",
  api_key: "287518613669312",
  api_secret: "UIBzMEuHO-gaEvdXSPKwVp2qLAU",
});

// //signup
const SignupRouter = require("./router/login");
app.use("/api", SignupRouter);

// router order
const propertyRouter = require("./router/property");
app.use("/api", propertyRouter);

// FMC info
const FmcRouter = require("./router/FMC");
app.use("/api", FmcRouter);
// router tenant
const TenantRouter = require("./router/tanent");
app.use("/api", TenantRouter);

// router lease
const LeaseRouter = require("./router/lease");
app.use("/api", LeaseRouter);

// router broker
const BrokerRouter = require("./router/broker");
app.use("/api", BrokerRouter);

// maintanance broker
const MaintananceCompanyRouter = require("./router/maintanance_Company");
app.use("/api", MaintananceCompanyRouter);

// management company
const ManagementCompanyRouter = require("./router/management_company");
app.use("/api", ManagementCompanyRouter);

// employee
const EmployeeRouter = require("./router/employee");
app.use("/api", EmployeeRouter);

// cheque
const ChequeRouter = require("./router/cheque");
app.use("/api", ChequeRouter);

// Developement company
const DevelopementCompanyRouter = require("./router/Developer_company");
app.use("/api", DevelopementCompanyRouter);

// mantainance ticket company
const MaintananceTicketRouter = require("./router/maintananceTicket");
app.use("/api", MaintananceTicketRouter);

// expense company
const ExpenseRouter = require("./router/expense");
app.use("/api", ExpenseRouter);

// owner
const OwnerRouter = require("./router/owner");
app.use("/api", OwnerRouter);

// invoice
const invoiceRouter = require("./router/invoice");
app.use("/api", invoiceRouter);

// Cheque info
const chequeInfoRouter = require("./router/chequeInfo");
app.use("/api", chequeInfoRouter);


// routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

// how to we start lession to the port
app.listen(process.env.PORT, () => {
  console.log(`server running at 8000`);
});
