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
  image: {
    type: String,
    required: false,
  },
  area: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    enum: ["volunteering", "donation"],
    required: true,
    default: "volunteering",
  }, 
  amount: {
    type: Number,
    default: 1,
  },
});

const Opportunity = mongoose.model("opportunity", OpportunitySchema);

module.exports = Opportunity;
