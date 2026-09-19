import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx', 'text'],
    required: true,
  },
  s3Url: {
    type: String,
    default: null,
  },
  rawText: {
    type: String,
    required: true,
  },
  parsedData: {
    skills: [String],
    experience: [String],
    education: [String],
    certifications: [String],
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resume', resumeSchema);
