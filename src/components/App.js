import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./Navbar";
import ExerciseList from "./ExerciseList";
import CreateUser from "./CreateUser";
import CreateExercise from "./CreateExercise";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />

                <Route path={"/"} exact component={ExerciseList} />
                <Route path={"/create"} exact component={CreateExercise} />
                <Route path={"/user"} exact component={CreateUser} />
            </div>
        </Router>
    );
};

export default App;