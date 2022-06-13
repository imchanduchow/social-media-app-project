// 1. importing mongoose
const mongoose = require("mongoose");

// 2. creating schema for user entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  email: {type: String, required: true},
  password: { type: String, required: true},
  following: [String]
})

// 3. creating model of user schema
const User = mongoose.model("User", userSchema);

// 4. writing CRUD operations on user model
// i) C - CREATE user
async function register(username, email, password) {
  const user = await getUser(username);
  if(user) throw Error('Please try for a new Username');

  const newUser = await User.create({
    username: username,
    email: email,
    password: password
  });

  return newUser;
}

// ii) R - READ user
async function login(username, password) {
  const user = await getUser(username);
  if(!user) throw Error('User not found');
  if(user.password != password) throw Error('Wrong Password');

  return user;
}

// iii) U - UPDATE user
async function updatePassword(newusername, password) {
  const user = await User.updateOne({"_id": newusername}, {$set: { password: password}});
  return user;
}

// iv) D - DELETE user
async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};

// utility function
async function getUser(username) {
  return await User.findOne({ "username": username});
}

// 5. export functions
module.exports = { 
  register, login, updatePassword, deleteUser, getUser
};