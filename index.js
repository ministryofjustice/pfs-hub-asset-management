const Article = require("./models/article");

const getInsertedArticle = async id => {
  console.log("\nNow get the article from the db\n");
  const article = await Article.where("id", id).fetch();
  return article;
};

updateInsertedArticle = async (id, update) => {
  try {
    const result = await getInsertedArticle(id);
    if (result) {
        result.set(update).save();
        console.log('DONE!');
    }
  } catch (e) {
    console.error(`Failed to save record: ${e.message}`);
  }
};

const deleteInsertedArticle = async id => {
  console.log("\nNow delete the article from the db\n");
  const article = await Article.where("id", id).destroy();
  return article;
};

var insertArticle = async ({ serialNumber }) => {
  // create a new entry in articles database
  const saved = await new Article({
    model: "pro",
    make: "mac",
    serial_number: serialNumber
  }).save();
  console.log(saved);
  const insertedId = saved.attributes.id;

  return insertedId;
};

// insert the article, and when we are done, destroy connection and get the inserted article
// insertArticle({ serialNumber: "MATTFIZ333" }).then(() =>
//   bookshelf.knex.destroy()
// );
// getInsertedArticle(2).then(article => console.log(JSON.stringify(article)));
// deleteInsertedArticle(1).then(article => console.log(JSON.stringify(article)));
updateInsertedArticle(2, {serial_number: "LUCASISAWESOME12345"});
