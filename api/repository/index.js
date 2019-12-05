module.exports = function (assetRegister, helpers) {
  const { logger } = helpers;  

  const fetch = async id => {
    logger.info("\nNow retrieve the record from the db\n");
    const record = await assetRegister.where("id", id).fetch();
    return record;
  };

  const update = async (id, update) => {    
      const record = await fetch(id);
      record.set(update).save();
      logger.info("Record updated!");
  };

  const remove = async id => {
    const record = await assetRegister.where("id", id).destroy();
    logger.info(`Deleted record ${id} from the database\n`);
    return record;
  };

  const insert = async ({ model, make, serial_number }) => {
    // create a new entry in asset register database
    const saved = await new assetRegister({
      model,
      make,
      serial_number
    }).save();
    logger.info(saved);
    const insertedId = saved.attributes.id;

    return insertedId;
  };

  return {
    fetch,
    update,
    remove,
    insert
  };
};
