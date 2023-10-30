const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username:
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    createdAt: {
        date: {type: Date, default: Date.now },
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            match: /^.{1, 280}$/,
            default: 'what are your thoughts?'
        },
        createdAt: {
        date: {type: Date, default: Date.now },
        },
        username:
         {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;