const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide the name of the company'],
  },
  position: {
    type: String,
    required: [true, 'PLease provide the vacant position for the job'],
    trim: true,
  },
  candidates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     required: [true, 'Please provide the Point feild'],
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: [true, 'Please provide the coordinates of the place'],
  //   },
  // },
  employer: String,
  expiry: {
    type: Number,
    required: [true, 'Please provide the expiration date'],
  },
  description: {
    type: String,
    required: [true, 'Plese provide the job description'],
    trim: true,
  },
  locationName: {
    type: String,
    required: [true, 'Please provide the location'],
  },
});

jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'candidates',
    select: 'name email resume',
  });
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
