const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// add route endpoints
app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);

const connection = mongoose.connection;

app.listen(port, () => {
    console.log((`Listening on port ${port}...`));
});

