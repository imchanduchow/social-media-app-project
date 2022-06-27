// 1. importing mongoose
const mongoose = require("mongoose");

const User = require('./user');

// 2. creating schema for post entity
const postSchema = new mongoose.Schema({
  user_id: { type: String, required: true},
  content: { type: String, required: true}
});

// 3. creating model of post schema
const Post = mongoose.model("Post", postSchema);

// 4. writing CRUD operations on post model
// i) C - CREATE post
async function newPost(username, content) {
  const user = await User.getUser(username);
  if(!user) throw Error('Please register to continue');

  const newPost = await Post.create({
    user_id: username,
    content: content
  });

  return newPost;
}

// ii) R - READ post
async function viewPost(pid) {
    return await Post.findOne({ "_id": pid});
}

// iii) U - UPDATE post
async function updatePost(pid, newcontent) {
  const post = await Post.updateOne({"_id": pid}, {$set: { content: newcontent}});
  return post;
}

// iv) D - DELETE post
async function deletePost(pid) {
  await Post.deleteOne({"_id": pid});
};

// 5. export functions
module.exports = { 
    newPost, viewPost, updatePost, deletePost 
};