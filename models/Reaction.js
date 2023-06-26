const { Schema, Types } = require('mongoose');
const { formatTimestamp } = require('../utils/helpers');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
            get: formatTimestamp,
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

module.exports = reactionSchema;