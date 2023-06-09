const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the review'],
    trim: true,
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add some text for the review'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating bwetween 1 and 10'],
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

//static method to get avg of rating an save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  console.log('claculating avg'.blue);
  const objArr = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: '$bootcamp', averageRating: { $avg: '$rating' } } },
  ]);
  // console.log(objArr);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: objArr[0].averageRating,
    });
  } catch (err) {
    console.log(err);
  }
};


//Call getAverageRating after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp);
});

//Call getAverageRating before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp);
});


module.exports = mongoose.model('review', ReviewSchema);
