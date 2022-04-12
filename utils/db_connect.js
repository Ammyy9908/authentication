const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const is_connected = await mongoose.connect(
      "mongodb+srv://aldrinShinuThomas:shinu003@thomas.l9oni.mongodb.net/authentication"
    );
    return is_connected;
  } catch (err) {
    return false;
  }
};

module.exports = connect_db;
