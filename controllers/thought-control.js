const { User, Thought } = require('../models');

const thoughtControl = {
    // GET all thoughts
    getAllThoughts (req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: "_v"
        })
    }
}