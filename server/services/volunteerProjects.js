const mongoose = require("mongoose");

const Opportunity = mongoose.model("opportunity");

const createOpportunity = async ({
  company,
  duration,
  jobTitle,
  area,
  tags,
  description,
  image,
  type,
  amount
}) => {
  try {
    const existingOpportunity = await Opportunity.findOne({ jobTitle: jobTitle.trim() });

    const newOpportunity = new Opportunity({
      company,
      duration,
      area,
      tags,
      jobTitle,
      description,
      image,
      type,
      amount
    });

    if (existingOpportunity) {
      throw new Error(`An opportunity with the title "${jobTitle}" already exists.`);
    }

    const savedOpportunity = await newOpportunity.save();
    return savedOpportunity;
  } catch (error) {
    throw error;
  }
};

const getOpportunity = async (id) => {
  try {
    const opportunity = await Opportunity.findById(id);
    return opportunity;
  } catch (error) {
    throw error;
  }
};

const getFilteredOpportunities = async (limit, offset) => {
  try {
    const opportunities = await Opportunity.find().skip(offset).limit(limit);
    const totalCount = opportunities.length;
    return { opportunities, totalCount };
  } catch (error) {
    throw error;
  }
};

const getAllOpportunities = async () => {
  try {
    const opportunities = await Opportunity.find();

    const totalCount = await Opportunity.countDocuments();
    return { opportunities, totalCount };
  } catch (error) {
    throw error;
  }
};

const deleteOpportunity = async (id) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(id);
    return opportunity;
  } catch (error) {
    throw error;
  }
};

const updateOpportunity = async ({
  id,
  company,
  duration,
  jobTitle,
  area,
  tags,
  description,
  image,
}) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id,
      {
        company,
        duration,
        jobTitle,
        area,
        tags,
        description,
        image,
      },
      { new: true }
    );
    return updatedOpportunity;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunities,
  getFilteredOpportunities,
  getOpportunity,
  deleteOpportunity,
  updateOpportunity,
};
