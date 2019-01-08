const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = mongoose.model(
  'Department',
  new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      representativeId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
)
