const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  department: String,
  position: String,
  salary: Number
});
module.exports = mongoose.model('Employee', EmployeeSchema);
