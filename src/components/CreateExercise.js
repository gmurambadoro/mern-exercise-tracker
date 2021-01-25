import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {findUsers, createExercise} from "../services/api";

const Exercise = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(1);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        findUsers().then(data => setUsers([...data]));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username);

        createExercise(username, description, duration, date).then(data => {
            console.log(data);

            // reset the state
            setUsername('');
            setDescription('');
            setDuration(1);
            setDate(new Date());
        }).catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                        <option value={null}>- Select -</option>
                        {users.map(user => <option key={user.username} value={user.username}>{user.username}</option> )}
                    </select>
                </div>

                <div className="form-group">
                    <DatePicker className="form-control" required selected={date} onChange={(d) => setDate(d)} />
                </div>

                <div className="form-group">
                    <input
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <input
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-success">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Exercise;