// required packages
const { Schema, model } = require('mongoose');
const moment = require('moment');

//reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
    type: String,
    required: true,
},
    createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
    toJSON: {
    // virtuals: true,
    // getters: true
},
    id: false
});

//thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            // virtuals: true,
            // getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//create thought model 
const Thoughts = model('Thought', thoughtSchema);

//export model
module.exports = Thoughts;

