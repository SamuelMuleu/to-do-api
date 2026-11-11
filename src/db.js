const mongoose = require("mongoose");

// Reuses the connection between invocations (important on serverless platforms)
let connecting = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI não definida. Copie .env.example para .env e preencha.");
  }
  if (!connecting) {
    connecting = mongoose
      .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
      .catch((error) => {
        connecting = null;
        throw error;
      });
  }
  await connecting;
  return mongoose.connection;
}

module.exports = { connectDB };
