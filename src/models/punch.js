const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'Punch',
  new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      departmentId: {
        type: String,
        required: true,
      },
      clockInMsTime: {
        type: Number,
        required: true,
      },
      clockOutMsTime: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  )
);
