import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

async function findUsers() {
    return instance.get('/users').then(data => data.data);
}

async function createUser(username) {
    return instance.post('/users', {username}).then(data => data.data);
}

async function findExercises() {
    return instance.get('/exercises').then(data => data.data);
}

async function createExercise({ username, description, duration }) {
    const payload = {
        username,
        description,
        duration,
        date: new Date(),
    };

    return instance.post('/exercises', payload).then(data => data.data);
}

export {
    findUsers,
    createUser,
    findExercises,
    createExercise,
};

