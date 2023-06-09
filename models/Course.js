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
    enum: ['beginner', 'intermediate', 'advanced'],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

//static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
  console.log('claculating avg'.blue);
  const objArr = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId,
      },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);
  // console.log(objArr);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: objArr[0] ? Math.ceil(objArr[0].averageCost / 10) * 10 : 0,
    });
  } catch (err) {
    console.log(err);
  }
};

//Call getAverageCOst after save
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp);
  next();
});

//Call getAverageCOst before remove
CourseSchema.pre('deleteOne', { document: true, query: false }, function () {
  this.constructor.getAverageCost(this.bootcamp);
});

//Call getAverageCOst  update
CourseSchema.post('updateOne', { document: true, query: false }, function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
