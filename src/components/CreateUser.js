import React, {useState, useEffect} from "react";
import {createUser, findUsers} from "../services/api";
import User from "./User";

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        findUsers().then(data => setUsers([...data]));
    }, [username]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!String(username).trim().toString()) {
            return;
        }

        // post this user to the backend
        createUser(username)
            .then(() => setUsername(''))
            .catch(err => setErrorMessage(`Failed to create the user ${username}`))
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorMessage('');
                    }}
                    placeholder="Username"
                    className="form-control"
                    required
                />
            </form>

            {
                errorMessage ? <p>{errorMessage}</p> : null
            }

            {
                users.map(user => <User key={user.username} user={user} />)
            }
        </div>
    );
};

export default CreateUser;