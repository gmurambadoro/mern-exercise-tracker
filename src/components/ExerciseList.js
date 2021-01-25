import React, {useEffect, useState} from "react";
import {findExercises, deleteExercise} from "../services/api";
import {Link} from "react-router-dom";

const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        findExercises().then(data => setExercises([...data]));
    }, [exercises]);

    const handleDelete = (id) => {
        deleteExercise(id).then(exercise => {
            const newExercises = exercises.filter(e => e._id !== exercise._id);

            setExercises([...newExercises]);
        });
    };

    const renderExercise = (exercise, index) => {
        const { date, username, description, duration } = exercise;

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{date}</td>
                <td>{username}</td>
                <td>{description}</td>
                <td>{duration}</td>
                <td>
                    <a href="/" onClick={(e) => {
                        e.preventDefault();

                        handleDelete(exercise._id);
                    }}>
                        Delete
                    </a>
                </td>
            </tr>
        );
    };

    return (
        <div>
            <h1>Exercise List</h1>

            <div className="table-responsive">
                <table className="table table-condensed table-borderless">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        exercises.map((exercise, index) => renderExercise(exercise, index))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExerciseList;