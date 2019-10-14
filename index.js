const assetRegister = require("./models/asset-register");

const getInsertedRecord = async id => {
  console.log("\nNow retrieve the record from the db\n");
  const record = await assetRegister.where("id", id).fetch();
  return record;
};

updateInsertedRecord = async (id, update) => {
  try {
    const result = await getInsertedRecord(id);
    if (result) {
        result.set(update).save();
        console.log('Record updated!');
    }
  } catch (e) {
    console.error(`Failed to save record: ${e.message}`);
  }
};

const deleteInsertedRecord = async id => {
  console.log("\nDelete the record from the db\n");
  const record = await assetRegister.where("id", id).destroy();
  return record;
};

var insertRecord = async ({ serialNumber }) => {
  // create a new entry in asset register database
  const saved = await new assetRegister({
    model: "pro",
    make: "mac",
    serial_number: serialNumber
  }).save();
  console.log(saved);
  const insertedId = saved.attributes.id;

  return insertedId;
};

// insert the new record, and when we are done, destroy connection and get the inserted record
insertRecord({ serialNumber: "leejeffery" });
// getInsertedRecord(7).then(record => console.log(JSON.stringify(record)));
// deleteInsertedRecord(2).then(record => console.log(JSON.stringify(record)));
// updateInsertedRecord(2, {serial_number: "LUCASISAMAZING12345"});
