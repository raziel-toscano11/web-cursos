import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'], 
        default: 'student' 
    },
    profile: {
        bio: String,
        profile_picture: String
    },
    courses_bought: [
        {
          course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
          purchase_date: { type: Date, default: Date.now }
        }
      ],
      courses_created: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
      ]
}, {
    timestamps: true
}
);

export default mongoose.model('User', userSchema);