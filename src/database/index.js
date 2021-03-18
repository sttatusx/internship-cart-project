import mongoose from "mongoose";

// Configs
const name = "basalam-cart";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function initDB() {
  try {
    await mongoose.connect(process.env.MONGO_PATH + name + "?retryWrites=true", options);
    console.log("[DATABASE] conected to database.");
  } catch (err) {
    console.error("[DATABASE] Error: ", err.message);
  }
}
