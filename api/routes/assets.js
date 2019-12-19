const createAssetSchema = require("./validation/create-asset");
const amendAssetSchema = require("./validation/amend-asset");

function hasValidId(req, res, next) {
  if (!req.params.id) {
    return next("Must have valid ID");
  }
  next();
}

async function isValidNewAsset(req, res, next) {
  try {
    req.asset = await createAssetSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next({
      validationErrors: error.details.map(
        validationError => validationError.message
      )
    });
  }
}

async function isValidAmendedAsset(req, res, next) {
  try {
    req.asset = await amendAssetSchema.validateAsync(req.body);
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
      const { id } = req.params;
      const { make, model, serial_number, asset_number, asset_status, build, nomis_id } = req.asset;
      await repository.update(id, { make, model, serial_number, asset_number, asset_status, build, nomis_id });
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
  router.post("/", isValidNewAsset, createAsset);
  router.put("/:id", hasValidId, isValidAmendedAsset, updateAsset);
  router.delete("/:id", deleteAsset);

  return router;
};
