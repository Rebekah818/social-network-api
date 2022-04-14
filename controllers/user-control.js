const { Users } = require('../models');

const usersControl = {
    createUser({ body }, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));

    },
    getAllUsers(req, res) {
        Users.find({})
            .populate({ path: 'thoughts', select: '-_v' })
            .populate({ path: 'friends', select: '-_v' })
            .select('-_v')
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-_v' })
            .populate({ path: 'friends', select: '-_v' })
            .select('-_v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(400).json({ message: 'No users with this specific Id' })
                    return;
                }
                res.json(dbUsersData)

            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No User with this particular ID!' });
                    return;
                }
                res.json(dbUsersData)
            })
            .catch(err => res.json(err));
        },
        deleteUsers({params}, res) {
            Users.findOneAndDelete({_id: params.id})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
        },
    
        // Delete a current user by ID
        addFriend({params}, res) {
            Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
            .populate({path: 'friends', select: ('-__v')})
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
            res.json(dbUsersData);
            })
            .catch(err => res.json(err));
        },
    
        // Delete a current Friend
        deleteFriend({ params }, res) {
            Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
        }
    
    };

module.exports = usersControl;