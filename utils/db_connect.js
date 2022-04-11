const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const is_connected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/authentication"
    );
    return is_connected;
  } catch (err) {
    return false;
  }
};

module.exports = connect_db;
