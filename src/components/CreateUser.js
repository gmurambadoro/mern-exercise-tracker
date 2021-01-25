import React, {useState, useEffect} from "react";
import http from "../services/http";
import User from "./User";

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        http.get('/users').then(data => {
            setUsers([...data.data]);
        });
    }, [username]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!String(username).trim().toString()) {
            return;
        }

        // post this user to the backend
        http.post('/users', {username}).then(response => {
            const user = response.data;

            console.log(user);

            setUsername(''); // clear username
        }).catch(err => {
            console.log(err);

            alert('Error: Failed to create user');
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form-control"
                    required
                />
            </form>

            {
                users.map(user => <User key={user.username} user={user} />)
            }
        </div>
    );
};

export default CreateUser;