module.exports = function assetRepository(assetRegister) {

  const fetch = async id => {
    console.log("\nNow retrieve the record from the db\n");
    const record = await assetRegister.where("id", id).fetch();
    return record;
  };

  const update = async (id, update) => {
    try {
      const result = await fetch(id);
      if (result) {
        result.set(update).save();
        console.log("Record updated!");
      }
    } catch (e) {
      console.error(`Failed to save record: ${e.message}`);
    }
  };

  const remove = async id => {
    const record = await assetRegister.where("id", id).destroy();
    console.log(`Deleted record ${id} from the database\n`);
    return (record);
  };

  const insert = async ({ model, make, serialNumber }) => {
    // create a new entry in asset register database
    const saved = await new assetRegister({
      model: model,
      make: make,
      serial_number: serialNumber
    }).save();
    console.log(saved);
    const insertedId = saved.attributes.id;

    return insertedId;
  };  

  return {
      fetch,
      update,
      remove,
      insert
  }
};
