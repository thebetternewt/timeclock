const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose.model(
  'User',
  new Schema(
    {
      netId: {
        type: String,
        required: true,
        unique: true
      },
      idNumber: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      admin: {
        type: Boolean
      },
      active: {
        type: Boolean,
        default: true
      },
      departments: {
        type: Array,
        default: []
      }
    },
    {
      timestamps: true
    }
  )
);
