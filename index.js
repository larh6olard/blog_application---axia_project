import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();

//  Create mongoose connection
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected with Mongoose!"))
  .catch((err) => console.error("❌ Connection error:", err.message));

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose server connected");
});
mongoose.connection.on("error", (err) => {
  console.log("❌ Mongoose connection error:", err);
});

// Middleware added to allow app to use json
app.use(express.json());
// Middleware for cookie
app.use(cookieParser());


// Listening port to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port http://localhost:${PORT}`);
});
