const express = require("express");
const app = express();
const connection = require("./connection_DB/mongoose_connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config;

//aarko body parser haleko
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for body parser
app.use(bodyParser.json());

//middleware for cors
app.use(cors());

//cloudinary config
cloudinary.config({
  cloud_name: "pankajkoirala",
  api_key: 891382289963618,
  api_secret: "3pKrB-1JvjrDFNKUNpMURXUtVJ0",
});

// //signup
const SignupRouter = require("./router/login");
app.use("/api", SignupRouter);

// router order
const propertyRouter = require("./router/property");
app.use("/api", propertyRouter);

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

// routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

// how to we start lession to the port
app.listen(8000, () => {
  console.log(`server running at 8000`);
});
