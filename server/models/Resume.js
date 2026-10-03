import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  targetRole: {
    type: String,
    default: 'General Software Engineer',
  },
  isStudentMode: {
    type: Boolean,
    default: false,
  },
  originalFile: {
    filename: String,
    fileType: String,
    fileSize: Number,
    fileBuffer: { type: String, select: false },
  },
  originalText: {
    type: String,
    required: true,
  },
  sections: {
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },
    summary: String,
    education: [
      {
        degree: String,
        institution: String,
        location: String,
        year: String,
        gpa: String,
        coursework: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        location: String,
        dates: String,
        highlights: [String],
      },
    ],
    skills: {
      technical: [String],
      soft: [String],
      tools: [String],
      frameworks: [String],
      languages: [String],
    },
    projects: [
      {
        title: String,
        techStack: [String],
        description: String,
        highlights: [String],
        link: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],
    achievements: [String],
    hackathons: [String],
  },
  atsScore: {
    type: Number,
    default: 0,
  },
  suggestionsCount: {
    type: Number,
    default: 0,
  },
  version: {
    type: Number,
    default: 1,
  },
  parentResumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
