const mongoose = require("mongoose");

const Contact = mongoose.model("contact");

const createContact = async ({ name, email, title, message }) => {
  const newContact = new Contact({
    name,
    email,
    title,
    message,
  });

  try {
    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    throw error;
  }
};

const getAllFeedbacks = async () => {
  try {
    const feedbacks = await Contact.find();
    return feedbacks;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createContact,
  getAllFeedbacks,
};
