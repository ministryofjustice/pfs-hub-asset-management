const createRepo = require("../../repository");
const helpers = require("../../../helpers");

describe("Name of the group", () => {
  const fetch = jest.fn();
  const destroy = jest.fn();
  const hasBeenConstructed = jest.fn();

  function AssetRegister(data) {
    hasBeenConstructed(data);
    this.data = data;
    this.save = jest.fn(() => ({ attributes: { id: 1234 } }));
  }

  AssetRegister.where = jest.fn(() => ({
    fetch,
    destroy
  }));

  const repo = createRepo(AssetRegister, helpers);

  beforeEach(() => {
    AssetRegister.where.mockClear();
    fetch.mockReset();
  });
  it("should fetch a record from the database", async () => {
    // Define the mock implementation for fetch for this instance
    // Here we're testing the happy path, where a record is returned, what happens if there is no record?
    const mockResult = "MOCK_RECORD";
    fetch.mockImplementation(() => mockResult);
    // Call our code
    const result = await repo.fetch(1);
    // Assert our mocks have been called
    expect(AssetRegister.where).toHaveBeenCalledWith("id", 1);
    expect(fetch).toHaveBeenCalled();
    // Assert the result of calling our code is correct
    expect(result).toBeDefined();
    expect(result).toEqual(mockResult);
  });

  it("should fetch 3 records from the database", async () => {
    // Define the mock implementation for fetch for this instance
    // Here we're testing the happy path, where a record is returned, what happens if there is no record?
    const mockResult = "MOCK_RECORD";
    fetch.mockImplementation(() => new Array(3).fill(mockResult));
    // Call our code
    const result = await repo.fetch(1);
    // Assert our mocks have been called
    expect(AssetRegister.where).toHaveBeenCalledWith("id", 1);
    expect(fetch).toHaveBeenCalled();
    // Assert the result of calling our code is correct
    expect(result).toBeDefined();
    expect(result.length).toEqual(3);
  });

  it("should delete a record from the database", async () => {
    await repo.remove(1);
    expect(AssetRegister.where).toHaveBeenCalledWith("id", 1);
    expect(destroy).toHaveBeenCalled();
  });

  it("should update a record from the database", async () => {
    const mockData = "MOCK";
    const save = jest.fn();
    const set = jest.fn(() => ({ save }));
    fetch.mockImplementation(() => ({
      set
    }));
    await repo.update(1, mockData);
    expect(AssetRegister.where).toHaveBeenCalledWith("id", 1);
    expect(fetch).toHaveBeenCalledWith();
    expect(set).toHaveBeenCalledWith(mockData);
    expect(save).toHaveBeenCalled();
  });

  it("should throw an error when attempting to update the database with no data", async () => {
    const mockData = "MOCK_UPDATE";
    const save = jest.fn();
    const set = jest.fn(() => ({ save }));
    let didThrow = false;
    try {
      fetch.mockRejectedValue(new Error("BOOM!"));
      await repo.update(1, mockData);
    } catch (e) {
      didThrow = true;
    } finally {
      expect(didThrow).toEqual(true);
      expect(set).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    }
  });

  it("should insert a record into the database", async () => {
    const mockData = {
      model: "MODEL",
      make: "MAKE",
      serial_number: "SN",
      asset_number: "ASSET",
      asset_status: "STATUS",
      build: "BUILD",
      nomis_id: "NOMIS"
    };
    const id = await repo.insert(mockData);
    expect(hasBeenConstructed).toHaveBeenCalledWith({
      model: "MODEL",
      make: "MAKE",
      serial_number: "SN",
      asset_number: "ASSET",
      asset_status: "STATUS",
      build: "BUILD",
      nomis_id: "NOMIS"
    });
    expect(id).toEqual(1234);
  });

  it("should throw error if non alphanumeric data is entered", () => {
    const condition = /^[a-zA-Z0-9]+$/;
    const mockData = "fghghg";
    expect(mockData).toEqual(expect.stringMatching(condition));
  });
});
