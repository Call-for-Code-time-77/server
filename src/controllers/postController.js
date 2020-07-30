const { request, response } = require("express");

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.view = async (request, response) => {
  try {
    const post = await Post.findById(request.params._id);
    return response.json(post);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.add = async (request, response) => {
  try {
    request.body.author = request.user._id;
    const post = new Post(request.body);
    await post.save();
  } catch (error) {
    return response.json(error.message);
  }
};
exports.edit = async (request, response) => {
  try {
    const post = await Post.findOneAndUpdate(request.params._id, request.body, {
      new: true,
      runValidators: true
    });
    return response.json(post);
  } catch (error) {
    return response.json(error.message);
  }
};
