// 1. importing the libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in post model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/create', async (req, res) => {
    try {
      const post = await Post.newPost(req.body.username, req.body.content);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/viewpost', async (req, res) => {
    try {
      const post = await Post.viewPost(req.body.id);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.pid, req.body.newcontent);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.pid);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;