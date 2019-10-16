const createAssetRepository = require('./repository');
const assetRegister = require("./models/asset-register");
const assetRepository = createAssetRepository(assetRegister);

// insert the new record, and when we are done, destroy connection and get the inserted record
assetRepository.insert({ serialNumber: "1234", make: "dell", model: "Z50" });
// assetRepository.fetch(7).then(record => console.log(JSON.stringify(record)));
// assetRepository.update(7, {serial_number: "MATTFITZ1234"});
// assetRepository.remove(11).then(record => console.log(JSON.stringify(record)));


