const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  Image: {
    type: String,
    required: false,
  },
});

const Opportunity = mongoose.model("opportunity", OpportunitySchema);

module.exports = Opportunity;
