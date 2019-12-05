const schema = require("./dto/asset");

function hasValidId(req, res, next) {
  if (!req.body.id) {
    return next("Must have valid ID");
  }
  next();
}

async function isValidAsset(req, res, next) {
  try {
    req.asset = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next({
      validationErrors: error.details.map(
        validationError => validationError.message
      )
    });
  }
}

module.exports = (router, repository) => {
  async function getAsset(req, res, next) {
    try {
      const { id } = req.params;
      const asset = await repository.fetch(id);
      res.json(asset);
    } catch (error) {
      next(`Failed to find asset: ${error}`);
    }
  }

  async function createAsset(req, res, next) {
    try {
      const id = await repository.insert(req.body);
      res.json({ id });
    } catch (error) {
      next(`Failed to import asset: ${error}`);
    }
  }

  async function updateAsset(req, res, next) {
    try {
      const { id, make, model, serial_number } = req.asset;
      await repository.update(id, { make, model, serial_number });
      res.send();
    } catch (error) {
      next(`Failed to amend asset: ${error}`);
    }
  }

  async function deleteAsset(req, res, next) {
    try {
      const { id } = req.params;
      await repository.remove(id);
      res.send();
    } catch (error) {
      next(`Failed to delete asset: ${error}`);
    }
  }

  router.get("/:id", getAsset);
  router.post("/", isValidAsset, createAsset);
  router.put("/", hasValidId, isValidAsset, updateAsset);
  router.delete("/:id", deleteAsset);

  return router;
};
