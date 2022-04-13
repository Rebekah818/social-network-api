// required packages
const { Schema, model } = require('mongoose');
const moment = require('moment');

// User Schema 
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: [validateEmail, 'Please fill in email address'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'
    ]
    },
    thought: [ 
        {
            type: Schema.Types.ObjectId,
            ref:'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},
    {
        toJSON: {
            // virtuals: true,
            getters: true,
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//create user model 
const User = model('User', userSchema);

//export model
module.exports = User;

