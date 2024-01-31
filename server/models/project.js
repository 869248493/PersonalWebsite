const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  project_name: String, // served as primary key for images, a bit hard coded for now
  project_description: String,
  project_url: String,
  screenshot_uri: String,
});
module.exports = mongoose.model("project", ProjectSchema);
