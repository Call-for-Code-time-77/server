const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.view = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id).exec();
    return response.status(200).json(post);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.list = async (request, response) => {
  try {
    const post = await Post.find({ author: request.user._id }).exec();
    return response.status(200).json(post);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.add = async (request, response, next) => {
  try {
    request.body.author = request.user._id;
    const post = new Post(request.body);
    await post.save();
    request.post = post;
    next();
    // return response.status(201).json(post);
  } catch (error) {
    return response.json(error.message);
  }
};
exports.edit = async (request, response) => {
  try {
    const post = await Post.findOneAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    });
    return response.status(200).json(post);
  } catch (error) {
    return response.json(error.message);
  }
};
