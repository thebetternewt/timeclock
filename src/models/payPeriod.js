const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = mongoose.model(
  'PayPeriod',
  new Schema(
    {
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      payPeriodId: {
        type: Number,
        required: true,
      },
      fiscalYear: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
