const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const createAssetRepository = require("./api/repository");
const createAssetsRouter = require("./api/routes/assets");
const AssetModel = require("./models/asset-register");
const helpers = require("./helpers");

const port = 8080;
const { logger } = helpers;

const assetRepository = createAssetRepository(AssetModel, helpers);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", (req, res) => res.json({ status: "OK" }));
app.use("/asset", createAssetsRouter(express.Router(), assetRepository));

app.use((err, req, res, next) => {
  res.json(err);
});

app.listen(port, () => {
  logger.info(`server listening on ${port}`);
});

// insert the new record, and when we are done, destroy connection and get the inserted record
// assetRepository.insert({ serialNumber: "349568486098254098290", make: "HP", model: "65770" });S
// assetRepository.fetch(7).then(record => console.log(JSON.stringify(record)));
// assetRepository.update(7, {serial_number: "MATTFITZ1234"});
// assetRepository.remove(11).then(record => console.log(JSON.stringify(record)));
