const { Schema, model } = require('mongoose')

const emailSchema = new Schema({
    type: String,
    unique: true,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Input a valid Email'],
},
)

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: emailSchema,
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                default: () => new Types.objectId()
            },
        ],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User; 