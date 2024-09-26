const mongoose = require("mongoose");
const { Schema } = mongoose;
const { passwordHasher } = require("../utils/security-ground");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: 'true' },
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'banned'], required: true, default: 'active' },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  user.password = passwordHasher(user.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
