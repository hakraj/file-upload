const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  resource_type: {
    type: String,
    enum: ["image", "video"],
    default: "image ",
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;