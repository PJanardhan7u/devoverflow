import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return console.log("ALREADY CONNECTED");
  }

  isConnected = true;
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devsupport",
    });
    isConnected = true;

    console.log("MongoDB is connectedd");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
