const express = require("express");
const fs = require("fs");

const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.post("/", jsonParser, function (req, res) {
  fs.readFile("okapi.csv", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data.length <= 0)
      fs.writeFile("okapi.csv", "type,sender,timestamp,admission,zooFame,zooName,currentMonth,currentTimeOfDay,currentSimTime,cash,donationsAllAnimals,educationDonations,totalDonations,speciesCount,guestCount,averageEducation,averageHappiness\n", (err) => {
        if (err) {
          console.error(err);
        }
      });
  });

  const reticulata = JSON.parse(req.body);
  const data = `${reticulata.type},${reticulata.sender},${reticulata.timestamp},${reticulata.admission},${reticulata.zooFame},${reticulata.zooName},${reticulata.currentMonth},${reticulata.currentTimeOfDay},${reticulata.currentSimTime},${reticulata.cash},${reticulata.donationsAllAnimals},${reticulata.educationDonations},${reticulata.totalDonations},${reticulata.speciesCount},${reticulata.guestCount},${reticulata.averageEducation},${reticulata.averageHappiness}\n`

  fs.writeFile("okapi.csv", data, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.send(`${new Date().toISOString()} - OkapiNode processed request`);
});

app.listen(process.argv[2], () => {
  console.log(`node server listening to port ${process.argv[2]}`);
});
