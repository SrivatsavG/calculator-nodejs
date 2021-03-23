const Calculation = require("../models/calculation");

exports.showCalculator = async (req, res, next) => {
  var calculations = [];
  try {
    calculations = await (await Calculation.find()).reverse();
    res.render("home.ejs", {
      calculations: calculations,
      result: "",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postCalculator = async (req, res, next) => {
  let equation = req.body.equation;
  let result = "";
  let calculations = [];

  console.log("EQUATION IS ", equation);

  try {
    let result = eval(equation);
    console.log("RESULT IS", result);
    if (result === undefined) {
      calculations = await (await Calculation.find()).reverse();
      res.render("home.ejs", {
        calculations: calculations,
        result: equation,
        error: "Invalid equation",
      });
    } else {
      const calc = new Calculation({
        equation: equation + "=" + result,
      });
      const calcResult = await calc.save();
      calculations = await (await Calculation.find()).reverse();
      res.render("home.ejs", {
        calculations: calculations,
        result: result
      });
    }
  } catch (err) {
    const error = new Error(err);
    console.log(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
