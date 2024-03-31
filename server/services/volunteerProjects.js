const mongoose = require("mongoose");

const Opportunity = mongoose.model("opportunity");

const createOpportunity = async ({
  company,
  duration,
  jobTitle,
  description,
  Image,
}) => {
  const newOpportunity = new Opportunity({
    company,
    duration,
    jobTitle,
    description,
    Image,
  });

  try {
    const savedOpportunity = await newOpportunity.save();
    return savedOpportunity;
  } catch (error) {
    throw error;
  }
};

const getOpportunities = async () => {
  try {
    const opportunities = await Opportunity.find();
    return opportunities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
};
