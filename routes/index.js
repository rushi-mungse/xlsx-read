const routes = require("express").Router();
var XLSX = require("xlsx");
var path = require("path");

routes.post("/data", (req, res) => {
  const { mark } = req.body;

  var filePath = path.resolve(__dirname, "test.xlsx");
  var workbook = XLSX.readFile(filePath);

  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  let data = [];
  xlData.forEach((el) => {
    if (el.CUT_OFF <= mark) {
      data.push({
        "Institute Name": el.Institute_Name,
        "Cut Off": el.CUT_OFF,
      });
    }
  });

  res.json(data);
});

module.exports = routes;
