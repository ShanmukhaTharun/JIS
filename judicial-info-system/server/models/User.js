import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: String,
  bio: String,
  id: { type: String, unique: true },
});

export default mongoose.model('User', UserSchema);
