const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// Add methods for database interaction
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.statics.create = function ({ email, password, name }) {
  return this.create({ email, password, name });
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
