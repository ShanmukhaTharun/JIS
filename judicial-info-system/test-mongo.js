import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
console.log("URI set:", !!uri);
try {
  await mongoose.connect(uri);
  console.log("Connected OK");
  process.exit(0);
} catch (e) {
  console.error("Mongo connect error", e);
  process.exit(1);
}
