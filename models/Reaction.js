const { Schema, Types } = require('mongoose');
const { formatTimestamp } = require('../utils/helpers');

// Define the reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),    // Create an ID value of type ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: new Date(),
            get: formatTimestamp,   // Use getter defined in other file
        },
    },
    {
        toJSON: {
            getters: true   // Include getters in JSON strings
        },
    }
);

// Don't define a model, export the schema as it was created to be used in the Thought model
module.exports = reactionSchema;