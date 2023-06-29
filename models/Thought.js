const { Schema, model } = require('mongoose');
// Import reaction schema defined in other file
const reactionSchema = require('./Reaction');
const { formatTimestamp } = require('../utils/helpers');

// Define the thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: new Date(),
            get: formatTimestamp,   // Use getter defined in other file
        },
        username: {
            type: String,
            required: true,
        },
        // reactions array will hold subdocuments using the reaction schema that was imported
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            // Include virtuals and getters in JSON strings
            virtuals: true,
            getters: true,
        },
    }
);

// Create reactionCount virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create the Thought model using the schema defined above
const Thought = model('thought', thoughtSchema);

module.exports = Thought;