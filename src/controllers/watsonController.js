const mongoose = require("mongoose");
const Watson = mongoose.model("Watson");

const apiIBM = require("../watson/api");

exports.view = async (request, response) => {
  try {
    const watson = await Watson.findById(request.params.id).exec();
    return response.status(200).json(watson);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.list = async (request, response) => {
  try {
    const watson = await Watson.find({ author: request.user._id }).exec();
    return response.status(200).json(watson);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.add = async (request, response) => {
  try {
    const post = request.post._id;
    const { title, body } = request.post;
    const author = request.user._id;
    await apiIBM.api(title, body, async data => {
      const watson = new Watson({ data, post, author });
      await watson.save();
      return response.status(201).json([data, post]);
    });
  } catch (error) {
    return response.json(error.message);
  }
};
