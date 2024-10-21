import mongoose from 'mongoose';
import topicSchema from './topic.model.js';

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {
        type: String
    },
    topics: [topicSchema]
  });
  
  export default chapterSchema;