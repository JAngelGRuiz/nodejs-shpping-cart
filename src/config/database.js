const mongoose = require("mongoose");

async function connectDb() {
  return new Promise((res, rej) => {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        res();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = connectDb;
