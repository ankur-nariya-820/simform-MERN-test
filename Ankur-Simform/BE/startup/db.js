const constants = require("../appConstants");

module.exports = function () {
  const connectMongo = () => {
    const mongoose = require("mongoose");
    return new Promise((resolve, reject) => {
      try {
        mongoose.connect(constants.dbUrl, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
        });
        mongoose.connection.on("connected", () => {
          console.info("DB Connected");
        });
        mongoose.connection.on("error", err =>
          console.error("DB connection error", Constant.errors.mongooseErrorMsg, err)
        );
      } catch (ex) {
        console.error("DB connection error", Constant.errors.mongooseErrorMsg, ex)
      }
    });
  };

  connectMongo().then(data => {
    console.log(data);
  });
};