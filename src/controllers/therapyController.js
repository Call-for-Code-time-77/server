const mongoose = require("mongoose");
const { request, response } = require("express");
const Therapy = mongoose.model("Therapy");
exports.view = async (request, response) => {
  try {
    const therapy = await Therapy.findById(request.params.id).exec();
    if (!therapy) {
      return response.status(404).json(["Not found"]);
    }
    return response.status(200).json(therapy);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.list = async (request, response) => {
  try {
    const therapies = await Therapy.find({
      psychologist: request.user._id
    }).exec();
    return response.status(200).json(therapies);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.add = async (request, response) => {
  try {
    const psychologist = request.body.id;
    const patient = request.user._id;
    const therapy = new Therapy({ patient, psychologist });
    await therapy.save();
    return response.status(201).json(therapy);
  } catch (error) {
    return response.json(error.message);
  }
};

exports.patientList = async (request, response) => {
  try {
    const list = await Therapy.find({
      psychologist: request.user._id
    }).populate("patient");
    return response.status(200).json(list);
  } catch (error) {
    return response.json(error.message);
  }
};
