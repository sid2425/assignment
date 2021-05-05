const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const coords = {
  latitude: 17.4301,
  longitude: 78.5416,
  radius: 1000,
};
app.use(express.json());
let outputArr = [];
function getDetails(URL) {
  fetch(URL)
    .then((res) => res.json())
    .then((result) => {
      const resultArr = result.features;
      if (resultArr.length > 0) {
        resultArr.forEach((element) => {
          console.log(
            `Name of Place:${element.properties.name}\nStreet:${element.properties.street}\nLongitude:${element.properties.lon}\nLattitude:${element.properties.lat}`
          );
          console.log("\n");
          outputArr.push({
            name: element.properties.name,
            street: element.properties.street,
            long: element.properties.lon,
            lat: element.properties.lat,
          });
        });
      } else {
        console.log("No restaurants found nearby");
      }
    })
    .catch((error) => console.log(error));
}
app.get("/", (req, res) => {
  const URL = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${coords.longitude},${coords.latitude},${coords.radius}&bias=proximity:${coords.longitude},${coords.latitude}&limit=14&apiKey=e6270933d9ff4c30b6a4ec580df16d78`;
  getDetails(URL);
  res.send('<h1>Hello</h1>');
});
app.listen(3000);
