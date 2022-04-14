const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api/thoughts'));
app.use(require('./routes/api/users'));
app.use(require('./routes/index'));
app.use(require('./routes/api/index'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

