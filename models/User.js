const { Schema, model } = require('mongoose');

// Email validation function
//  Take the email value provided in the model
//  Test it against the regex to determine if it's valid
const isValidEmail = function(email) {
    // The RegEx below was taken from the Full Stack docs, Week 17 Challenge README
    let emailRegEx = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    return emailRegEx.test(email);
}

// Define the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: [ isValidEmail, 'Please enter a valid email address' ],   // Use email validation function defined above
        },
        // thoughts array will hold ObjectId values related to Thought documents
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        // friends array will hold ObjectId values related to other User documents
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true, // Include virtuals in JSON strings
        },
    }
);

// Create a friendCount virtual
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model using the schema defined above
const User = model('user', userSchema);

module.exports = User;