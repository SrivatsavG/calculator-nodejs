var bodyParser = require("body-parser"),
  express = require("express"),
  mongoose = require("mongoose"),
  compression = require("compression"),
  app = express();

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // TO SERVE FILES STATICALLY
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(compression());

const Calculation = require("./models/calculation");

//DB
//const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fkjnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const MONGODB_URI = `mongodb+srv://mongoUser:Q4UYdZptO8UIXzku@cluster0.fkjnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//-----------ROUTES--------------
const homeRoutes = require("./routes/home");

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/", homeRoutes);

app.use(async (error, req, res, next) => {
  console.log(error);
  let equation = req.body.equation;
  calculations = await (await Calculation.find()).reverse();
  res.render("home.ejs", {
    calculations: calculations,
    result: equation,
    error: "Something went wrong",
  });
});

//-------------LISTEN---------------
mongoose
  .connect(MONGODB_URI,{useUnifiedTopology: true,useNewUrlParser: true})
  .then((result) => {
    console.log("==============SERVER HAS STARTED===========");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log("==============MONGOOSE ERROR=============");
    console.log(err);
  });
