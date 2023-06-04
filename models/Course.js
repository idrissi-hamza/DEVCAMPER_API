const mongoose = require('mongoose');
const slugify = require('slugify');

const CourseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },

  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks'],
  },

  tuition: {
    type: Number,
    required: [true, 'Please add tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum required skill'],
    enum: ['beginner', 'intermediate', 'advance'],
  },

  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
