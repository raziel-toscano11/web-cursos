import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['video', 'image', 'document'],
        required: true
    },
    url: {
        type: String, required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

export default resourceSchema;