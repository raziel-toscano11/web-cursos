import mongoose from 'mongoose';
import resourceSchema from './resource.model.js';

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {
        type: String
    },
    resources: [resourceSchema]
});

export default topicSchema;